import { useRef, useMemo, useEffect, useState } from "react";
import JoditEditor from "jodit-react";

const CODEBLOCK_ICON =
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><polyline points="8 9 5 12 8 15"></polyline><polyline points="16 9 19 12 16 15"></polyline></svg>';

const ERASER_ICON =
    '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path><path d="M22 21H7"></path><path d="m5 11 9 9"></path></svg>';

/* =====================
   CODE BOX (NOTION-STYLE)
   One button: turns the selected text / current paragraph into a
   light-grey <pre> code box. It can never touch the rest of the document.
===================== */
const BLOCK_TAGS = [
    "P", "H1", "H2", "H3", "H4", "H5", "H6",
    "BLOCKQUOTE", "PRE", "TD", "TH", "LI", "FIGCAPTION",
];

/* Nearest block ancestor of a node (or null) */
const nearestBlock = (editor, node) => {
    let el = node;
    if (el && el.nodeType === Node.TEXT_NODE) el = el.parentElement;
    while (el && el !== editor.editor && !BLOCK_TAGS.includes(el.tagName)) {
        el = el.parentElement;
    }
    return el && el !== editor.editor ? el : null;
};

/* Resolve a selection point to a block, even when the selection is
   anchored directly on the editor container (triple-click / select-all):
   fall back to the first/last block child instead of silently no-op'ing. */
const blockAtNode = (editor, node, preferLast) => {
    const block = nearestBlock(editor, node);
    if (block) return block;

    const children = Array.from(editor.editor.children).filter((el) =>
        BLOCK_TAGS.includes(el.tagName),
    );
    if (!children.length) return null;

    if (preferLast) {
        return children[children.length - 1];
    }
    return children[0];
};

/* All block elements from `start` to `end` (inclusive, document order) */
const collectBlocksBetween = (editor, start, end) => {
    if (!start || !end) return [];
    if (start === end) return [start];

    const blocks = [];
    const walker = editor.editor.ownerDocument.createTreeWalker(
        editor.editor,
        NodeFilter.SHOW_ELEMENT,
        {
            acceptNode: (node) =>
                BLOCK_TAGS.includes(node.tagName) && node !== editor.editor
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_SKIP,
        },
    );
    let collecting = false;
    while (walker.nextNode()) {
        const node = walker.currentNode;
        if (node === start) collecting = true;
        if (collecting) blocks.push(node);
        if (node === end) break;
    }
    if (!blocks.length) blocks.push(start);
    return blocks;
};

/* Box inside a list item / table cell, keeping the structure */
const boxInsideCellOrListItem = (editor, block) => {
    const pre = editor.createInside.element("pre");
    while (block.firstChild) pre.appendChild(block.firstChild);
    block.appendChild(pre);
    editor.s.setCursorIn(pre, false);
};

/* Toggle a <pre> box back to a normal paragraph */
const boxToParagraph = (editor, pre) => {
    const p = editor.createInside.element("p");
    while (pre.firstChild) p.appendChild(pre.firstChild);
    pre.replaceWith(p);
    editor.s.setCursorIn(p, false);
};

const removeIfEmpty = (node) => {
    if (node && !node.hasChildNodes()) node.remove();
};

/* Split a single block at a collapsed cursor:
   <p>before</p> + empty <pre> + <p>after</p> */
const splitBlockAtCursor = (editor, block, range) => {
    const doc = editor.editor.ownerDocument;

    const left = doc.createRange();
    left.setStart(block, 0);
    left.setEnd(range.startContainer, range.startOffset);
    const leftFrag = left.extractContents();

    const rightFrag = doc.createDocumentFragment();
    while (block.firstChild) rightFrag.appendChild(block.firstChild);

    const beforeP = editor.createInside.element("p");
    beforeP.appendChild(leftFrag);
    const afterP = editor.createInside.element("p");
    afterP.appendChild(rightFrag);

    const pre = editor.createInside.element("pre");
    pre.appendChild(editor.createInside.text("\u200b"));

    block.replaceWith(beforeP, pre, afterP);
    removeIfEmpty(beforeP);
    removeIfEmpty(afterP);
    editor.s.setCursorIn(pre, false);
};

/* Split a single block around a selection:
   <p>before</p> + <pre>selected text</pre> + <p>after</p> */
const splitBlockForSelection = (editor, block, range) => {
    const doc = editor.editor.ownerDocument;

    const right = doc.createRange();
    right.setStart(range.endContainer, range.endOffset);
    right.setEnd(block, block.childNodes.length);
    const rightFrag = right.extractContents();

    const left = doc.createRange();
    left.setStart(block, 0);
    left.setEnd(range.startContainer, range.startOffset);
    const leftFrag = left.extractContents();

    const selFrag = doc.createDocumentFragment();
    while (block.firstChild) selFrag.appendChild(block.firstChild);

    const beforeP = editor.createInside.element("p");
    beforeP.appendChild(leftFrag);
    const afterP = editor.createInside.element("p");
    afterP.appendChild(rightFrag);

    const pre = editor.createInside.element("pre");
    pre.appendChild(selFrag);

    block.replaceWith(beforeP, pre, afterP);
    removeIfEmpty(beforeP);
    removeIfEmpty(afterP);
    editor.s.setCursorIn(pre, false);
};

/* Selection spans multiple blocks → split the edges at the selection and
   merge ONLY the selected blocks into one <pre> box. */
const mergeSelectionIntoBox = (editor, startBlock, endBlock, range) => {
    const doc = editor.editor.ownerDocument;

    let afterP = null;
    let beforeP = null;

    /* the part of the LAST block after the selection stays a paragraph */
    const notAtEnd =
        range.endContainer !== endBlock ||
        range.endOffset < endBlock.childNodes.length;
    if (notAtEnd) {
        const right = doc.createRange();
        right.setStart(range.endContainer, range.endOffset);
        right.setEnd(endBlock, endBlock.childNodes.length);
        const rightFrag = right.extractContents();
        afterP = editor.createInside.element("p");
        afterP.appendChild(rightFrag);
    }

    /* the part of the FIRST block before the selection stays a paragraph */
    const notAtStart =
        range.startContainer !== startBlock || range.startOffset > 0;
    if (notAtStart) {
        const left = doc.createRange();
        left.setStart(startBlock, 0);
        left.setEnd(range.startContainer, range.startOffset);
        const leftFrag = left.extractContents();
        beforeP = editor.createInside.element("p");
        beforeP.appendChild(leftFrag);
    }

    const blocks = collectBlocksBetween(editor, startBlock, endBlock);
    const first = blocks[0];
    const parent = first.parentNode;

    const pre = editor.createInside.element("pre");
    blocks.forEach((block, idx) => {
        if (idx > 0) pre.appendChild(editor.createInside.text("\n"));
        while (block.firstChild) pre.appendChild(block.firstChild);
    });

    parent.insertBefore(pre, first);
    if (beforeP) parent.insertBefore(beforeP, pre);
    if (afterP) parent.insertBefore(afterP, pre.nextSibling);
    blocks.forEach((block) => block.remove());
    removeIfEmpty(beforeP);
    removeIfEmpty(afterP);
    editor.s.setCursorIn(pre, false);
};

const applyCodeBox = (editor) => {
    try {
        const sel = editor.s;
        const range = sel.range;

        /* No selection → split at the cursor into an empty box (or toggle) */
        if (sel.isCollapsed()) {
            const block = nearestBlock(editor, sel.current(false));

            if (!block) {
                /* Nothing to split (empty editor / cursor outside) →
                   insert a brand-new empty grey box at the cursor. */
                const pre = editor.createInside.element("pre");
                pre.appendChild(editor.createInside.text("\u200b"));
                sel.insertNode(pre, false, true);
                editor.s.setCursorIn(pre, false);
                editor.synchronizeValues();
                return;
            }

            if (block.tagName === "PRE") {
                boxToParagraph(editor, block);
            } else if (
                block.tagName === "LI" ||
                block.tagName === "TD" ||
                block.tagName === "TH"
            ) {
                boxInsideCellOrListItem(editor, block);
            } else {
                splitBlockAtCursor(editor, block, range);
            }
            editor.synchronizeValues();
            return;
        }

        /* Selection → only the selected text becomes the box */
        const start = blockAtNode(editor, range.startContainer, false);
        const end = blockAtNode(editor, range.endContainer, true);
        if (!start || !end) return;

        if (start === end) {
            if (start.tagName === "PRE") {
                boxToParagraph(editor, start);
            } else if (
                start.tagName === "LI" ||
                start.tagName === "TD" ||
                start.tagName === "TH"
            ) {
                boxInsideCellOrListItem(editor, start);
            } else {
                splitBlockForSelection(editor, start, range);
            }
            editor.synchronizeValues();
            return;
        }

        mergeSelectionIntoBox(editor, start, end, range);
        editor.synchronizeValues();
    } catch (err) {
        /* Surface the exact failure instead of failing silently */
        console.error("[codebox]", err);
        window.alert(
            "Code error: " +
                (err && err.message ? err.message : String(err)),
        );
    }
};

export default function RichTextEditor({ initialContent = "", onChange }) {
    const editorRef = useRef(null);
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    /* Capture the incoming content ONCE per mount so the editor's `value`
       stays stable. Feeding onChange output straight back into `value`
       makes jodit-react re-sync and wipe the editor (controlled-value loop). */
    const [seededContent] = useState(() => initialContent);

    const config = useMemo(() => {
        const token = localStorage.getItem("accessToken");

        return {
            readonly: false,
            placeholder: "Start writing your blog...",
            height: 480,
            toolbarAdaptive: false,
            buttons: [
                "bold", "italic", "underline", "strikethrough", "|",
                "clearformat", "|",
                "fontsize", "font", "brush", "|",
                "paragraph", "|",
                "ul", "ol", "indent", "outdent", "|",
                "align", "|",
                "link", "image", "video", "table", "hr", "|",
                "blockquote", "codebox", "|",
                "undo", "redo", "|",
                "fullsize", "preview",
            ],
            controls: {
                codebox: {
                    name: "codebox",
                    tooltip: "Code (grey box)",
                    icon: "codebox",
                    exec: applyCodeBox,
                },
                clearformat: {
                    name: "clearformat",
                    tooltip: "Clear formatting",
                    icon: "clearformat",
                    exec: (editor) => {
                        editor.execCommand("removeFormat");
                    },
                },
            },
            extraIcons: {
                codebox: CODEBLOCK_ICON,
                clearformat: ERASER_ICON,
            },
            /* Keep paragraph breaks when pasting so block styles only ever
               affect one paragraph (never a big pasted blob). */
            defaultActionOnPaste: "insert_clear_html",
            defaultActionOnPasteFromWord: "insert_clear_html",
            uploader: {
                url: `${import.meta.env.VITE_API_URL}/blogs/media`,
                method: "POST",
                format: "json",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                withCredentials: false,
                process: (resp) => resp,
                defaultHandlerSuccess: (resp) => {
                    const editor = editorRef.current;
                    if (!editor) return;
                    if (resp?.url) {
                        editor.s.insertImage(resp.url, null, null);
                    } else {
                        window.alert("Image upload failed");
                    }
                },
                defaultHandlerError: () => {
                    window.alert("Image upload failed");
                },
            },
        };
    }, []);

    /* Apply the seeded content once the editor is ready (covers the
       StrictMode double-mount where Jodit is destroyed and recreated,
       which can otherwise leave the editor blank). */
    useEffect(() => {
        const editor = editorRef.current;
        if (!editor) return;

        const apply = () => {
            if (editor.value !== seededContent) {
                editor.value = seededContent;
            }
        };

        if (editor.isReady) {
            apply();
        } else {
            editor.waitForReady().then(apply);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Memoized element: keeps `value` stable and avoids re-rendering Jodit
       on every keystroke (prevents cursor/focus loss). */
    const editorElement = useMemo(
        () => (
            <JoditEditor
                ref={editorRef}
                value={seededContent}
                config={config}
                onChange={(content) => onChangeRef.current(content)}
            />
        ),
        [config, seededContent],
    );

    return editorElement;
}
