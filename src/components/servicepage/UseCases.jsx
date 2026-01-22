import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React, { useState, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";

/* ---------------------------------------------
   Lazy Image Component (code-split)
---------------------------------------------- */
const LazyImage = React.lazy(() =>
    Promise.resolve({
        default: function LazyImage({ src, alt }) {
            const [loaded, setLoaded] = useState(false);

            return (
                <div className="relative w-full overflow-hidden rounded-xl border border-gray-200">
                    {!loaded && (
                        <div className="absolute inset-0 animate-pulse bg-gray-200" />
                    )}

                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        onLoad={() => setLoaded(true)}
                        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"
                            }`}
                    />
                </div>
            );
        },
    }),
);

export default function UseCases() {
    const location = useLocation();

    /* ---------------------------------------------
         Scroll to project on hash change
      ---------------------------------------------- */
    useEffect(() => {
        if (location.hash) {
            const el = document.getElementById(location.hash.replace("#", ""));
            if (el) {
                el.scrollIntoView({ behavior: "auto", block: "start" });
            }
        }
    }, [location]);

    const projects = [
        {
            id: "grip-chain-packtech",
            title: "Grip Chain Packtech Limited",
            category: "CRM Platform",
            problem:
                "The organization needed a centralized digital platform to manage customer interactions, product listings, and business operations efficiently while supporting scalable feature growth without upfront overhead.",
            solution:
                "Developed a modular CRM and business management platform using the MERN stack with a pay-as-you-go model. Core features include an admin panel, product and order management, customer outreach via integrated mailing, and flexible payment solutions that can be activated as needed.",
            impact:
                "Enabled scalable business growth, reduced operational complexity, improved customer engagement, and allowed the client to activate advanced features only when required, optimizing cost and efficiency.",
            website: "https://gripchain.in",
            images: [
                "/gripChain1.png",
                "/gripChain2.png",
                "/gripChain3.png",
                "/gripChain4.png",
            ],
        },
        {
            id: "agratas-infotech",
            title: "Agratas Infotech Private Limited",
            category: "AI-Powered ERP Platform",
            problem:
                "The organization required a centralized, intelligent ERP system to manage complex business operations including inventory, finance, HR, and customer relationships, while enabling data-driven decision-making across departments.",
            solution:
                "Developed a web-based, AI-integrated ERP platform with modular architecture covering user management, inventory tracking, financial operations, CRM, HRMS, and customizable dashboards. AI-powered insights and advanced analytics were embedded to enhance operational efficiency and strategic planning.",
            impact:
                "Improved operational visibility, streamlined cross-department workflows, enabled data-informed decisions through AI insights, and provided a scalable ERP foundation capable of supporting enterprise-level growth.",
            website: "https://agratasinfotech.com",
            images: [
                "/agratasinfotech1.png",
                "/agratasinfotech2.png",
                "/agratasinfotech3.png",
                "/agratasinfotech4.png",
            ],
        },
        {
            id: "optixdigitalai",
            title: "OptixDigitalAI",
            category: "Creative Agency Website & CMS Platform",
            problem:
                "The agency required a high-impact digital presence that could clearly communicate its vision, showcase services and case studies, and manage content dynamically without constant developer dependency, while also improving global search visibility and handling infrastructure limitations in email and DNS management.",
            solution:
                "Designed and developed a modern, performance-optimized website with a custom CMS and admin panel, enabling seamless content management, service updates, and portfolio publishing. Implemented on-page and technical SEO strategies to strengthen visual presence across neighboring regions such as Nepal and Sri Lanka, extended reach into the Middle East and African markets, and expanded visibility in Western countries including the UK, France, and the USA. Additionally, handled complete email migration from Hostinger Mail to Zoho Mail, managed DNS configuration, and ensured stable, secure domain operations.",
            impact:
                "Established a strong global digital footprint across 30+ countries, improved organic search visibility and brand discoverability, streamlined content operations, enhanced user engagement through interactive experiences, and delivered a stable, well-managed infrastructure supporting long-term growth.",
            website: "https://optixdigitalai.com",
            images: ["/Optix1.png", "/Optix2.png", "/Optix3.png", "/Optix4.png"],
        },
        {
            id: "tvs-darbhanga",
            title: "TVS Darbhanga",
            category: "Automobile Dealership Website",
            problem:
                "The dealership required a fast, reliable digital presence to showcase vehicle models, services, and contact information. Existing assets included high-resolution images that negatively impacted load time, Core Web Vitals, and mobile performance.",
            solution:
                "Developed a lightweight, SEO-friendly dealership website with optimized client-side image delivery. Implemented lazy-loaded images, reduced metadata size, and integrated skeleton loaders to ensure smooth visual loading without server-side image processing. Components were tree-shaken and lazy-loaded to improve initial render speed and bundle efficiency.",
            impact:
                "Significantly improved page load performance, reduced perceived loading time on mobile devices, enhanced SEO readiness, and delivered a smooth customer browsing experience without requiring backend infrastructure.",
            website: "https://www.tvsdarbhanga.com",
            images: [
                "/tvs1.png",
                "/tvs2.png",
                "/tvs4.png",
                "/tvs7.png",
            ],
        },
        {
            id: "mahadeo-jewllers",
            title: "Mahadeo Sah Amarnath Prasad Jewellers",
            category: "Jewellery E-Commerce Platform",
            problem:
                "The client was operating on a legacy, template-based website with security vulnerabilities, poor performance, and no dynamic pricing mechanism. Manual gold price updates were error-prone, regional pricing was unsupported, and SEO visibility was limited. Additionally, DNS misconfigurations caused reliability and accessibility issues.",
            solution:
                "Rebuilt the platform as a modern MERN-stack application with a high-performance React + Vite frontend. Implemented RBAC and JWT-based authentication to securely manage gold pricing operations. Developed an automated gold price calculation system that dynamically updates jewellery prices based on live rates, supporting both India and Nepal regions. Optimized images client-side using lazy loading, metadata reduction, and skeleton loaders, while improving SEO structure and fixing critical DNS configuration issues.",
            impact:
                "Delivered a secure, scalable, and SEO-optimized jewellery platform with real-time pricing accuracy, faster load times, improved search visibility, and enhanced operational control for the client. The new system eliminated security risks, reduced manual effort, and provided a seamless experience across devices and regions.",
            website: "https://majonline.in",
            images: [
                "/maj1.png",
                "/maj2.png",
                "/maj3.png",
                "/maj4.png",
            ],
        },
        {
            id: "prashant-jha",
            title: "Prashant Jha – Developer Portfolio",
            category: "Personal Developer Portfolio",

            problem:
                "A single professional platform was required to showcase technical skills, project experience, and career progression while clearly communicating full stack development expertise to recruiters, clients, and collaborators.",

            solution:
                "A React.js-based portfolio website was designed and developed with a focus on clean UI, high performance, and scalability. The platform was implemented as a Progressive Web App (PWA) with offline support, enabling access to content without an active internet connection. Modular components, SEO-friendly content structure, and optimized frontend performance were used to ensure long-term maintainability and strong Core Web Vitals.",

            impact:
                "The portfolio establishes a strong professional identity, improves visibility among recruiters and clients, and provides a centralized, future-ready showcase of skills, experience, and real-world project impact with reliable offline accessibility.",

            website: "https://techsouqtechnologies.com/",

            images: [
                "/PJ1.png",
                "/PJ2.png",
                "/PJ3.png",
                "/PJ4.png"
            ]
        },

        {
            id: "techsouq",
            title: "TechSouq Technologies",
            category: "Digital Solutions & Web Technology Agency",
            problem:
                "The agency required a modern digital platform to represent its web and digital services, establish strong regional credibility in Gujarat, and attract clients through a fast, SEO-friendly, and scalable web presence.",
            solution:
                "Designed and developed a React.js-based website with a clean, performance-focused UI/UX. Implemented SEO-friendly content structure, optimized frontend performance, and modular components to showcase digital services effectively. The platform was built to support scalability, easy content updates, and future service expansion while maintaining high Core Web Vitals scores.",
            impact:
                "Strengthened TechSouq Technology’s digital presence as a Gujarat-based agency, improved search visibility, enhanced user engagement, and provided a reliable, future-ready foundation for delivering digital and web solutions to regional and global clients.",
            website: "https://techsouqtechnologies.com/",
            images: [
                "/tt1.png",
                "/tt2.png",
                "/tt3.png",
                "/tt4.png",
            ],
        },
        {
            id: "tre",
            title: "TRE Housing Publication",
            category: "EdTech Publishing & Exam Preparation Platform",
            problem:
                "Teacher exam aspirants required a centralized, reliable platform to access high-quality study materials, mock tests, previous year papers, and timely exam notifications. Existing resources were fragmented across multiple sources, making exam preparation inefficient and inconsistent.",
            solution:
                "Developed a comprehensive educational publishing platform combining digital and traditional content delivery. The system provides online access to magazines, press releases, courses, mock tests, previous year question papers, updated syllabi, and exam notifications. Multi-channel distribution ensures accessibility across both online and offline mediums, while support services assist users with bookings and related queries.",
            impact:
                "Created a one-stop solution for teacher exam aspirants, improved accessibility to structured learning resources, enhanced exam readiness through mock testing, and expanded reach across Bihar and other regions through scalable digital distribution.",
            website: "https://trehousingpublication.com",
            images: [
                "/tre1.png",
                "/tre2.png",
                "/tre3.png",
                "/tre4.png",
            ],
        },
    ];

    const blockVariants = {
        hidden: { opacity: 0, y: 28 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 85, damping: 22, bounce: 0 },
        },
    };

    return (
        <section className="py-20 bg-white new-font px-3 md:px-0" id="use-cases">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* ===== Section Heading ===== */}


                <div className="mb-14 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Real <span className="text-[#7DA0CA]">Projects</span> Measurable{" "}
                        <span className="text-[#7DA0CA]">Outcomes</span>
                    </h2>
                    <p className="mt-3 text-gray-600 text-base">
                        A selection of production-ready web, ERP, and business platforms
                        delivered for real clients with real operational impact.
                    </p>
                </div>

                <div className="space-y-20">
                    {projects.map((project, index) => (
                        <motion.article
                            id={project.id}
                            key={project.id}
                            variants={blockVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: false, amount: 0.35 }}
                            className="grid grid-cols-1 gap-10 items-center lg:grid-cols-2 scroll-mt-28"
                        >
                            <div className="grid grid-cols-2 gap-3">
                                <Suspense
                                    fallback={
                                        <div className="h-40 bg-gray-200 animate-pulse rounded-xl" />
                                    }
                                >
                                    {project.images.map((img, i) => (
                                        <LazyImage
                                            key={i}
                                            src={img}
                                            alt={`${project.title} ${i + 1}`}
                                        />
                                    ))}
                                </Suspense>
                            </div>

                            <div>
                                <span className="text-sm font-semibold text-[#052659]">
                                    {project.category}
                                </span>
                                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                    {project.title}
                                </h3>

                                <div className="mt-5 space-y-3 text-sm text-gray-600">
                                    <p>
                                        <strong>Problem:</strong> {project.problem}
                                    </p>
                                    <p>
                                        <strong>Solution:</strong> {project.solution}
                                    </p>
                                    <p>
                                        <strong>Impact:</strong> {project.impact}
                                    </p>
                                </div>

                                <a
                                    href={project.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#052659] text-[#C1E8FF] font-semibold rounded-lg hover:scale-105 transition"
                                >
                                    Visit Website <ArrowRight className="h-5 w-5" />
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}

