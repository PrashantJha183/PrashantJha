// Chatbot.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";
import ZayraAvatar from "../../assets/zayra.png";

const faqData = [
    {
        question: "hello",
        answer:
            "Hello! 👋 Zayra here. How can I help you today? Ask me about our services, pricing, delivery, or any project-related questions.",
    },
    {
        question: "hi",
        answer:
            "Hi! Zayra here. I can help you with web development, app development, design, pricing, delivery timelines, and more. Just ask!",
    },
    {
        question: "hey",
        answer:
            "Hey there! Zayra is ready to assist you. Ask me about services, timelines, working hours, terms, or privacy policies.",
    },
    {
        question: "web development",
        answer:
            "We provide full-stack web development using React, Next.js, Node.js, and modern technologies. Typical delivery time ranges from 3–12 weeks depending on project complexity.",
    },
    {
        question: "website development",
        answer:
            "Zayra here! We build responsive websites, e-commerce platforms, and portals. Delivery timelines depend on the scope, usually 2–12 weeks with revisions included.",
    },
    {
        question: "mobile app development",
        answer:
            "We build iOS and Android apps using Flutter and React Native. Small apps take 3–6 weeks, complex apps up to 3 months. Post-launch support is included.",
    },
    {
        question: "app development",
        answer:
            "Zayra confirms: We develop modern mobile apps with smooth UI/UX, scalable architecture, and timely delivery. We provide expected delivery date and ongoing support.",
    },
    {
        question: "ui/ux design",
        answer:
            "We craft intuitive UI/UX for web and mobile apps. Design timelines range from 1–3 weeks. Zayra ensures your interface is user-friendly and brand-aligned.",
    },
    {
        question: "graphic design",
        answer:
            "We create banners, brochures, social media graphics, and other visuals. Delivery takes 2–5 business days depending on revisions required.",
    },
    {
        question: "logo design",
        answer:
            "Zayra says: We create professional logos tailored to your brand identity. Delivery typically takes 3–7 days with 2–3 revisions included.",
    },
    {
        question: "website redesign",
        answer:
            "Yes! We redesign websites to improve usability, aesthetics, and performance. Small sites take 2–4 weeks, large sites 2–3 months.",
    },
    {
        question: "app redesign",
        answer:
            "We revamp mobile apps for better user experience and performance. Delivery time depends on complexity, usually 3–8 weeks.",
    },
    {
        question: "digital marketing",
        answer:
            "Zayra here! We provide SEO, social media marketing, and paid campaigns. Projects are planned based on duration, goals, and budget.",
    },
    {
        question: "seo",
        answer:
            "We optimize websites for search engines, improving ranking and visibility. SEO campaigns are continuous and tracked for progress.",
    },
    {
        question: "social media marketing",
        answer:
            "Zayra says: We manage social media platforms, create content, and run campaigns to boost engagement and conversions.",
    },
    {
        question: "pricing",
        answer:
            "Our pricing depends on project type, complexity, and timeline. Small projects start at reasonable rates, larger projects vary. Contact support@optixdigitalai.com for a detailed quote.",
    },

    {
        question: "prices",
        answer:
            "Our pricing depends on project type, complexity, and timeline. Small projects start at reasonable rates, larger projects vary. Contact support@optixdigitalai.com for a detailed quote.",
    },

    {
        question: "price",
        answer:
            "Our pricing depends on project type, complexity, and timeline. Small projects start at reasonable rates, larger projects vary. Contact support@optixdigitalai.com for a detailed quote.",
    },

    {
        question: "amounts",
        answer:
            "Our pricing depends on project type, complexity, and timeline. Small projects start at reasonable rates, larger projects vary. Contact support@optixdigitalai.com for a detailed quote.",
    },

    {
        question: "amount",
        answer:
            "Our pricing depends on project type, complexity, and timeline. Small projects start at reasonable rates, larger projects vary. Contact support@optixdigitalai.com for a detailed quote.",
    },

    {
        question: "costs",
        answer:
            "Our pricing depends on project type, complexity, and timeline. Small projects start at reasonable rates, larger projects vary. Contact support@optixdigitalai.com for a detailed quote.",
    },

    {
        question: "money",
        answer:
            "Our pricing depends on project type, complexity, and timeline. Small projects start at reasonable rates, larger projects vary. Contact support@optixdigitalai.com for a detailed quote.",
    },

    {
        question: "charge",
        answer:
            "Our pricing depends on project type, complexity, and timeline. Small projects start at reasonable rates, larger projects vary. Contact support@optixdigitalai.com for a detailed quote.",
    },

    {
        question: "charges",
        answer:
            "Our pricing depends on project type, complexity, and timeline. Small projects start at reasonable rates, larger projects vary. Contact support@optixdigitalai.com for a detailed quote.",
    },
    {
        question: "cost",
        answer:
            "Zayra confirms: Project cost varies based on scope, technology, and deliverables. We provide a detailed estimate after reviewing your requirements.",
    },
    {
        question: "quote",
        answer:
            "Request a quote via our contact form or email. We'll respond with estimated cost, delivery date, and project scope within 24–48 hours.",
    },

    {
        question: "quotes",
        answer:
            "Request a quote via our contact form or email. We'll respond with estimated cost, delivery date, and project scope within 24–48 hours.",
    },
    {
        question: "expected delivery",
        answer:
            "Delivery time depends on project size and complexity. We'll share the estimated timeline when you submit your project details.",
    },
    {
        question: "estimated delivery",
        answer:
            "Delivery time depends on project size and complexity. We'll share the estimated timeline when you submit your project details.",
    },
    {
        question: "duration",
        answer:
            "Delivery time depends on project size and complexity. We'll share the estimated timeline when you submit your project details.",
    },
    {
        question: "durations",
        answer:
            "Delivery time depends on project size and complexity. We'll share the estimated timeline when you submit your project details.",
    },
    {
        question: "time",
        answer:
            "Delivery time depends on project size and complexity. We'll share the estimated timeline when you submit your project details.",
    },
    {
        question: "delivery time",
        answer:
            "Delivery time depends on project size and complexity. We'll share the estimated timeline when you submit your project details.",
    },
    {
        question: "expected time",
        answer:
            "Delivery time depends on project size and complexity. We'll share the estimated timeline when you submit your project details.",
    },

    {
        question: "estimated timeline",
        answer:
            "Zayra here! We provide a detailed project timeline with milestones and expected delivery dates for each stage.",
    },

    {
        question: "expected timeline",
        answer:
            "Zayra here! We provide a detailed project timeline with milestones and expected delivery dates for each stage.",
    },

    {
        question: "timeline",
        answer:
            "Zayra here! We provide a detailed project timeline with milestones and expected delivery dates for each stage.",
    },
    {
        question: "working hours",
        answer:
            "Our working hours are Monday–Friday, 10 AM–7 PM IST. Messages outside these hours are answered the next business day.",
    },
    {
        question: "working days",
        answer:
            "We work Monday through Friday. Weekends are off, but we can accommodate urgent requests if needed.",
    },
    {
        question: "revision",
        answer:
            "Zayra says: We provide 2–3 rounds of revisions for designs or websites to ensure your satisfaction.",
    },
    {
        question: "support",
        answer:
            "Yes! We provide post-launch support, bug fixes, and maintenance. Contact support@optixdigitalai.com for assistance.",
    },
    {
        question: "maintenance",
        answer:
            "We offer ongoing website and app maintenance to ensure smooth operation, updates, and security.",
    },
    {
        question: "custom project",
        answer:
            "We handle custom projects tailored to your needs. Contact us for requirements, delivery date, and timeline.",
    },
    {
        question: "consultation",
        answer:
            "Zayra here! Schedule a free consultation to discuss project requirements, delivery, and expected costs.",
    },
    {
        question: "get started",
        answer:
            "Click 'Get in Touch' in the header or email support@optixdigitalai.com. We'll provide roadmap, timeline, and quotation.",
    },
    {
        question: "terms",
        answer:
            "Zayra says: You can view our Terms & Conditions on our website. It includes project terms, payment policies, and user responsibilities.",
    },
    {
        question: "terms and conditions",
        answer:
            "Our Terms & Conditions cover pricing, delivery, revisions, intellectual property, and project policies. Please read them before starting a project.",
    },
    {
        question: "privacy",
        answer:
            "Zayra confirms: Our Privacy Policy explains how we handle your data, including contact info and project details.",
    },
    {
        question: "privacy policy",
        answer:
            "We respect your privacy. Data collected is used only for project communication, delivery, and support. Read our Privacy Policy for details.",
    },
    {
        question: "contact",
        answer:
            "You can reach us via email support@optixdigitalai.com, phone +91 7420807072, or the 'Get in Touch' form.",
    },
    {
        question: "email",
        answer:
            "Zayra here! Email us at support@optixdigitalai.com for project inquiries, quotes, or support.",
    },
    {
        question: "phone",
        answer:
            "Call or WhatsApp us at +91 7420807072. Working hours: Monday–Friday, 10 AM–7 PM IST.",
    },
    {
        question: "address",
        answer:
            "Our office is at #1306, Ambrosia Galaxy, Pan Card Club Road, Baner, Pune, Maharashtra 411069. Visit by appointment only.",
    },
    {
        question: "logo revision",
        answer:
            "We provide 2–3 rounds of logo revisions. Each iteration is shared for your feedback to ensure final approval.",
    },
    {
        question: "website revision",
        answer:
            "Zayra here! Website revisions are included in the project plan. Small tweaks usually done within 24–48 hours.",
    },
    {
        question: "app revision",
        answer:
            "We provide revisions for mobile apps based on user feedback and testing. Each iteration is scheduled in the project timeline.",
    },
    {
        question: "delivery method",
        answer:
            "Projects are delivered digitally via email, cloud storage, or deployment to your server/app store as per agreement.",
    },
    {
        question: "payment terms",
        answer:
            "Payment is typically 50% upfront and 50% after delivery, unless agreed otherwise. Terms are explained in our Terms & Conditions.",
    },
    {
        question: "refund policy",
        answer:
            "Refunds are managed per project scope and Terms & Conditions. Contact support for specific queries.",
    },
    {
        question: "project updates",
        answer:
            "Zayra here! We provide regular updates via email or calls. You will know the project status, milestones, and any issues.",
    },
    {
        question: "technologies",
        answer:
            "We use React, Next.js, Node.js, Flutter, Figma, Adobe Suite, and more depending on project requirements.",
    },
    {
        question: "platforms",
        answer:
            "Web, iOS, Android, cross-platform solutions using Flutter and responsive web frameworks.",
    },
    {
        question: "social media graphics",
        answer:
            "Zayra says: We design posts, stories, banners, and advertisements. Typical delivery: 2–5 business days with revisions included.",
    },
    {
        question: "banner design",
        answer:
            "Banners are delivered in 2–4 days depending on complexity and client feedback.",
    },
    {
        question: "brochure design",
        answer:
            "Brochures take 3–7 days for initial drafts. Revisions included based on your feedback.",
    },
    {
        question: "startup package",
        answer:
            "We offer startup packages including web, logo, and basic marketing. Timeline: 2–6 weeks depending on services included.",
    },
    {
        question: "enterprise solutions",
        answer:
            "Enterprise web and mobile solutions are customized. Delivery 8–12 weeks typically. Consult us for details.",
    },
    {
        question: "support hours",
        answer:
            "Support is available Monday–Friday, 10 AM–7 PM IST. Queries received after hours are addressed next working day.",
    },
    {
        question: "project proposal",
        answer:
            "Zayra can provide a detailed proposal including scope, timeline, cost, revisions, and expected delivery date.",
    },
    {
        question: "project scope",
        answer:
            "We define the scope clearly before starting. It includes deliverables, timelines, revisions, and technologies to be used.",
    },
    {
        question: "project milestones",
        answer:
            "Milestones are shared for each project stage, including design, development, review, testing, and delivery.",
    },
    {
        question: "workflow",
        answer:
            "Our workflow includes consultation, requirement gathering, design, development, testing, delivery, and post-launch support.",
    },
    {
        question: "project management",
        answer:
            "We use professional project management practices with regular updates, milestone tracking, and clear communication.",
    },
    {
        question: "communication",
        answer:
            "Zayra ensures transparent communication via email, calls, and project management tools.",
    },
    {
        question: "timeline extension",
        answer:
            "If the project requires extra time, we notify you in advance and provide updated expected delivery dates.",
    },
    {
        question: "urgent project",
        answer:
            "Zayra can accommodate urgent projects. Delivery time depends on scope and availability, and extra charges may apply.",
    },
    {
        question: "free consultation",
        answer:
            "We offer free consultation to discuss your project, expected delivery, pricing, and solutions before starting.",
    },
    {
        question: "project initiation",
        answer:
            "After agreement and initial payment, we start the project immediately and share the timeline and milestones.",
    },
    {
        question: "project tracking",
        answer:
            "Zayra ensures you can track project progress via updates, milestone reports, and meetings as needed.",
    },
    {
        question: "feedback process",
        answer:
            "We incorporate client feedback at every stage for designs, websites, and apps to ensure satisfaction.",
    },
    {
        question: "revision policy",
        answer:
            "2–3 revisions are included per project stage. Additional revisions may be quoted separately.",
    },
    {
        question: "delivery confirmation",
        answer:
            "Once delivered, we confirm with the client via email and ensure all files and access are correctly provided.",
    },
    {
        question: "post-launch support",
        answer:
            "We provide ongoing support, bug fixes, and updates post-launch. Support duration depends on project scope.",
    },
    {
        question: "contact hours",
        answer:
            "You can contact us Monday–Friday, 10 AM–7 PM IST for all project or support-related queries.",
    },
    {
        question: "pricing packages",
        answer:
            "We offer standard and custom pricing packages based on services. Contact Zayra for detailed breakdown.",
    },
    {
        question: "discounts",
        answer:
            "Occasionally, we provide discounts for startups, bulk projects, or referrals. Contact us for current offers.",
    },
    {
        question: "project consultation",
        answer:
            "Free consultation available to discuss project requirements, expected delivery, pricing, and support.",
    },
    {
        question: "agreement",
        answer:
            "All projects are governed by a mutual agreement, covering scope, payment, delivery, revisions, and IP rights.",
    },
    {
        question: "intellectual property",
        answer:
            "Clients own all intellectual property of delivered work after payment. IP clauses are in Terms & Conditions.",
    },
    {
        question: "nda",
        answer:
            "We can sign an NDA to ensure confidentiality for sensitive projects before starting.",
    },
    {
        question: "billing",
        answer:
            "Invoices are sent per milestone or per payment terms agreed in the project agreement.",
    },
    {
        question: "payment methods",
        answer:
            "We accept bank transfer, UPI, and other online payment methods as agreed per project.",
    },
    {
        question: "refund",
        answer:
            "Refunds are handled according to Terms & Conditions and project scope. Contact support for clarification.",
    },
    {
        question: "project status",
        answer:
            "Zayra provides updates about current project status, milestones achieved, and next steps.",
    },
    {
        question: "client portal",
        answer:
            "We can provide a project tracking portal for clients to view progress, deliverables, and communicate directly.",
    },
    {
        question: "project handover",
        answer:
            "After final delivery, all files, credentials, and documentation are handed over digitally.",
    },
    {
        question: "documentation",
        answer:
            "We provide detailed documentation for websites, apps, and designs to assist clients post-delivery.",
    },
    {
        question: "training",
        answer:
            "Training for using your website or app can be provided on request during or after delivery.",
    },
    {
        question: "technical support",
        answer:
            "Technical support is provided post-launch. Contact support@optixdigitalai.com for any issues.",
    },
    {
        question: "project review",
        answer:
            "We conduct review sessions for designs, apps, or websites to ensure quality and meet client expectations.",
    },

    {
        question: "services",
        answer:
            "Zayra here! We provide a wide range of services including Web Development, Mobile App Development, UI/UX Design, Graphic & Logo Design, Website & Mobile Redesign, and Digital Consulting services,etc.",
    },
    {
        question: "service",
        answer:
            "Zayra confirms: Our services include Web Development, App Development, UI/UX Design, Graphic Designing, Logo Creation, Website & App Redesign, and Digital Strategy Consulting, etc.",
    },
    {
        question: "services offered",
        answer:
            "We offer a variety of services to help businesses grow digitally: Web Development, App Development, UI/UX Design, Logo & Graphic Design, Website & App Redesign, Digital Marketing, and Consulting, etc.",
    },
    {
        question: "service offered",
        answer:
            "Zayra says: Our services include full-stack Web Development, Mobile App Development, UI/UX Design, Logo & Graphic Design, Website & App Redesign, and Digital Consulting, etc.",
    },
    {
        question: "type of services",
        answer:
            "Zayra here! We provide multiple types of services: Web & Mobile Development, UI/UX Design, Logo & Graphic Design, Redesign Projects, Digital Marketing, and Business Consulting, etc.",
    },

    {
        question: "types of services",
        answer:
            "Our services range from Web Development, Mobile App Development, UI/UX Design, Graphic & Logo Design, Website & Mobile Redesign, to Digital Strategy and Consulting services, etc.",
    },

    {
        question: "types of works",
        answer:
            "Our services range from Web Development, Mobile App Development, UI/UX Design, Graphic & Logo Design, Website & Mobile Redesign, to Digital Strategy and Consulting services, etc.",
    },

    {
        question: "works",
        answer:
            "Our services range from Web Development, Mobile App Development, UI/UX Design, Graphic & Logo Design, Website & Mobile Redesign, to Digital Strategy and Consulting services, etc.",
    },

    {
        question: "work",
        answer:
            "Our services range from Web Development, Mobile App Development, UI/UX Design, Graphic & Logo Design, Website & Mobile Redesign, to Digital Strategy and Consulting services, etc.",
    },

    {
        question: "works",
        answer:
            "Our services range from Web Development, Mobile App Development, UI/UX Design, Graphic & Logo Design, Website & Mobile Redesign, to Digital Strategy and Consulting services, etc.",
    },

    {
        question: "what services do you offer",
        answer:
            "We offer Web Development, Mobile App Development, UI/UX Design, Logo & Graphic Design, Website & App Redesign, Digital Marketing, and Consulting services tailored to your business needs.",
    },
    {
        question: "what service do you provide",
        answer:
            "Zayra says: We provide Web Development, App Development, UI/UX Design, Graphic & Logo Design, Website & App Redesign, and Digital Consulting services.",
    },
    {
        question: "list of services",
        answer:
            "Our services include: 1) Web Development, 2) Mobile App Development, 3) UI/UX Design, 4) Graphic & Logo Design, 5) Website & Mobile Redesign, 6) Digital Marketing, 7) Digital Consulting.",
    },
    {
        question: "all services",
        answer:
            "Zayra confirms: We offer all essential digital services for businesses including Web & App Development, Design, Logo & Graphic Design, Redesign, Marketing, and Consulting services.",
    },
    {
        question: "full service list",
        answer:
            "Our full service list includes Web Development, Mobile App Development, UI/UX Design, Graphic & Logo Design, Website & App Redesign, Digital Marketing, and Consulting services.",
    },
    {
        question: "service list",
        answer:
            "Zayra here! You can explore our services: Web Development, App Development, UI/UX Design, Graphic & Logo Design, Website & App Redesign, Digital Marketing, and Consulting.",
    },
    {
        question: "service packages",
        answer:
            "We offer service packages tailored to different business needs, combining Web Development, App Development, Design, Marketing, and Consulting. Contact us for details.",
    },
    {
        question: "which services do you offer",
        answer:
            "Zayra says: We offer Web Development, App Development, UI/UX Design, Logo & Graphic Design, Website & Mobile Redesign, Digital Marketing, and Consulting services for businesses.",
    },
    {
        question: "digital services",
        answer:
            "Our digital services include Website & App Development, UI/UX Design, Graphic & Logo Design, Redesign Projects, Digital Marketing, and Consulting for business growth.",
    },
    {
        question: "creative services",
        answer:
            "We provide creative services such as UI/UX Design, Graphic & Logo Design, Website & App Redesign, and branding solutions for businesses.",
    },
    {
        question: "consulting services",
        answer:
            "Zayra here! Our consulting services help businesses plan and execute digital strategies, marketing campaigns, and technology solutions for growth.",
    },
    {
        question: "design services",
        answer:
            "We offer design services including Logo Design, Graphic Design, UI/UX Design for web and mobile applications, and marketing materials.",
    },
];
const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null);
    const chatRef = useRef(null);
    const clickLock = useRef(false); // Prevent race condition

    const toggleChat = () => {
        setIsOpen((prev) => !prev);

        // Lock click for a short time to avoid immediate re-trigger
        clickLock.current = true;
        setTimeout(() => (clickLock.current = false), 200);
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg = { type: "user", text: inputValue };
        setMessages((prev) => [...prev, userMsg]);

        const faq = faqData.find((item) =>
            inputValue.toLowerCase().includes(item.question.toLowerCase())
        );

        const botMsg = faq
            ? { type: "bot", text: faq.answer }
            : {
                type: "bot",
                text: "Zayra here! Thank you for your question. Please reach out to support@optixdigitalai.com, and our team will get back to you promptly.",
            };

        setTimeout(() => {
            setMessages((prev) => [...prev, botMsg]);
        }, 500);

        setInputValue("");
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            // Ignore clicks during lock or on avatar button
            if (clickLock.current) return;

            if (
                chatRef.current &&
                !chatRef.current.contains(e.target) &&
                !e.target.closest(".zayra-avatar-btn")
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <>
            {/* Floating Zayra Avatar Button */}
            <motion.div
                onClick={toggleChat}
                className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-lg cursor-pointer overflow-hidden bg-yellow-400 zayra-avatar-btn"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
            >
                <motion.img
                    src={ZayraAvatar}
                    alt="Zayra"
                    className="w-full h-full object-cover"
                    animate={{
                        y: [0, -4, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chatbox"
                        ref={chatRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.25 }}
                        className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-yellow-400 text-[#5d00c3] px-4 py-3 font-bold flex items-center gap-2">
                            <img
                                src={ZayraAvatar}
                                alt="Zayra"
                                className="w-8 h-8 rounded-full object-cover border-2 border-white"
                            />
                            Chat with Zayra
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto max-h-96 md:max-h-[500px] scrollbar-none">
                            {messages.length === 0 && (
                                <p className="text-gray-500 text-sm">
                                    Hi! Zayra here. Ask me anything about our services, prices, or
                                    projects.
                                </p>
                            )}
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`p-2 rounded-md max-w-[90%] break-words flex items-start gap-2 ${msg.type === "user"
                                        ? "bg-yellow-400 self-end text-black"
                                        : "bg-gray-100 self-start text-gray-900"
                                        }`}
                                >
                                    {msg.type === "bot" && (
                                        <img
                                            src={ZayraAvatar}
                                            alt="Zayra"
                                            className="w-6 h-6 rounded-full object-cover mt-1 shrink-0"
                                        />
                                    )}
                                    {msg.text}
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="px-4 py-3 border-t border-gray-200 flex gap-2 items-center">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Type your message..."
                                className="flex-1 px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#5d00c3]"
                            />
                            <motion.button
                                onClick={handleSend}
                                className="bg-[#5d00c3] text-white px-3 py-2 rounded-md flex items-center justify-center"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiSend />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hide scrollbar */}
            <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </>
    );
};

export default Chatbot;