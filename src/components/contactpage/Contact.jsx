import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import ErrorBoundary from "../base/ErrorBoundary";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiPhone,
  FiChevronDown,
} from "react-icons/fi";
import { debounce } from "lodash";

const Contact = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  // Ref for dropdown area
  const serviceRef = useRef(null);


  // Close dropdown when clicking outside (desktop + mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (serviceRef.current && !serviceRef.current.contains(event.target)) {
        setServiceOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const services = [

    "Consultation",
    "Frontend Development",
    "Backend Development",
    "Full Stack Developement",
    "Progressive Web App",
    "Website Redesign & Revamp",


    "SEO Optimization",
    "Other",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold: 0.3 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) observer.observe(currentSection);

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, [controls]);

  const validate = useCallback(() => {
    const newErrors = {};

    const nameTrimmed = formData.name.replace(/\s/g, "");
    const emailTrimmed = formData.email.trim();
    const phoneTrimmed = formData.phone.replace(/\s/g, "");
    const countryCodeTrimmed = formData.countryCode.trim();
    const messageTrimmed = formData.message.replace(/\s/g, "");
    const serviceTrimmed = formData.service.trim();

    if (!nameTrimmed) newErrors.name = "Name is required.";
    else if (nameTrimmed.length < 3)
      newErrors.name = "Name must be at least 3 characters.";
    else if (nameTrimmed.length > 50)
      newErrors.name = "Name cannot exceed 50 characters.";

    if (!emailTrimmed) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed))
      newErrors.email = "Enter a valid email address.";

    if (!phoneTrimmed) newErrors.phone = "Phone number is required.";
    else if (!/^\d+$/.test(phoneTrimmed))
      newErrors.phone = "Phone number must contain digits only.";
    else if (phoneTrimmed.length < 6 || phoneTrimmed.length > 15)
      newErrors.phone = "Phone number must be between 6 and 15 digits.";

    if (!countryCodeTrimmed)
      newErrors.countryCode = "Country code is required.";
    else if (!/^\+?\d{1,4}$/.test(countryCodeTrimmed))
      newErrors.countryCode = "Enter a valid country code (e.g., +91).";

    if (!serviceTrimmed) newErrors.service = "Please select a service.";

    if (!messageTrimmed) newErrors.message = "Message cannot be empty.";
    else if (messageTrimmed.length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    else if (messageTrimmed.length > 500)
      newErrors.message = "Message cannot exceed 500 characters.";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback(
    debounce((field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }, 10),
    []
  );

  useEffect(() => {
    validate();
  }, [formData, validate]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      countryCode: true,
      service: true,
      message: true,
    });

    if (!validate()) {
      setStatus("error");
      controls.start({
        x: [-10, 10, -10, 10, 0],
        transition: { duration: 0.4 },
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_LINK;

      // console.log("Submitting to:", FORMSPREE_URL);
      // console.log("Form Data:", formData);

      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });

      // console.log("Formspree Response Status:", response.status);

      const data = await response.json();
      console.log("Formspree Response Data:", data);

      if (response.ok) {
        setStatus("success");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 5000);
        console.log("Form submitted successfully.");
      } else {
        setStatus("error");
        console.error("Submission failed:", data);
      }
    } catch (error) {
      setStatus("error");
      console.error("Network error:", error);
    }
    finally {
      setIsSubmitting(false);
    }
  };

  const fadeVariant = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <ErrorBoundary>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed top-6 right-6 bg-green-500 new-font text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          Message sent successfully!
        </motion.div>
      )}

      <section
        ref={sectionRef}
        id="contact"
        className="bg-[#052659] new-font  text-[#C1E8FF]  min-h-[85vh] flex flex-col md:flex-row justify-center items-center px-6 md:px-20 py-24 rounded-b m-2 overflow-hidden relative"
      >
        <motion.div
          className="absolute top-10 left-10 w-40 h-40 rounded-full blur-3xl"
          animate={{ y: [0, -15, 0], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-48 h-48  rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="md:w-1/2 z-10 text-center md:text-left mb-10 md:mb-0"
          initial="hidden"
          animate={controls}
          variants={fadeVariant}
        >
          <h2 className="text-2xl md:text-5xl pt-4 md:pt-0 font-bold leading-tight mb-6">
            Let’s Build Something <br />
            <span className="">Extraordinary Together</span>
          </h2>
          <p className="text-gray-200 text-md max-w-lg mx-auto md:mx-0">
            Have a project in mind or just want to say hello? We’d love to
            collaborate and help bring your ideas to life.
          </p>
        </motion.div>

        <motion.div
          className="md:w-1/2 z-10 w-full max-w-lg md:mt-8"
          initial="hidden"
          animate={controls}
          variants={fadeVariant}
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
            noValidate
          >
            <div className="relative">
              <FiUser className="absolute left-4 top-4 text-gray-500" />
              <input
                type="text"
                autoComplete="off"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none ${touched.name && errors.name
                  ? "border-red-400"
                  : "border-gray-300 focus:border-[#052659]"
                  } transition-all`}
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="relative">
              <FiMail className="absolute left-4 top-4 text-gray-500" />
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none ${touched.email && errors.email
                  ? "border-red-400"
                  : "border-gray-300 focus:border-[#052659]"
                  } transition-all`}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative flex gap-3">
              {/* Country Code Input */}
              <div className="w-1/4 relative">
                <input
                  type="text"
                  name="countryCode"
                  autoComplete="off"
                  placeholder="+91"
                  value={formData.countryCode}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\+?\d{0,4}$/.test(value)) {
                      setFormData((prev) => ({ ...prev, countryCode: value }));
                    }
                  }}
                  onBlur={() => handleBlur("countryCode")}
                  className={`w-full text-center py-3 border-2 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none ${touched.countryCode && errors.countryCode
                    ? "border-red-400"
                    : "border-gray-300 focus:border-[#052659]"
                    } transition-all`}
                />
                {touched.countryCode && errors.countryCode && (
                  <p className="text-red-500 text-sm mt-1 text-center">
                    {errors.countryCode}
                  </p>
                )}
              </div>

              {/* Phone Number Input */}
              <div className="w-3/4 relative">
                <FiPhone className="absolute left-4 top-4 text-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  autoComplete="off"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    handleInputChange("phone", value);
                  }}
                  onBlur={() => handleBlur("phone")}
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none ${touched.phone && errors.phone
                    ? "border-red-400"
                    : "border-gray-300 focus:border-[#052659]"
                    } transition-all`}
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Service Dropdown */}
            <div className="relative" ref={serviceRef}>
              <button
                type="button"
                onClick={() => setServiceOpen((prev) => !prev)}
                onBlur={() => handleBlur("service")}
                className={`w-full text-left pl-4 pr-10 py-3 border-2 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none relative ${touched.service && errors.service
                  ? "border-red-400"
                  : "border-gray-300 focus:border-[#052659]"
                  } transition-all`}
              >
                {formData.service || "Select a Service"}
                <FiChevronDown
                  className={`absolute right-4 top-4 text-gray-500 transition-transform duration-300 ${serviceOpen ? "rotate-180" : "rotate-0"
                    }`}
                />
              </button>

              <AnimatePresence>
                {serviceOpen && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-0 right-0 max-h-48 bg-white border border-gray-200 rounded-md mt-1 overflow-y-auto shadow-lg z-20 scroll-smooth no-scrollbar"
                  >
                    {services.map((service) => (
                      <li
                        key={service}
                        onMouseDown={() => {
                          handleInputChange("service", service);
                          setServiceOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-[#f5f0ff] cursor-pointer text-gray-800"
                      >
                        {service}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              {touched.service && errors.service && (
                <p className="text-red-500 text-sm mt-1">{errors.service}</p>
              )}
            </div>

            {/* Hidden input to include selected service in FormData */}
            <input type="hidden" name="service" value={formData.service} />

            {/* Message textarea */}
            <div className="relative">
              <FiMessageSquare className="absolute left-4 top-4 text-gray-500" />
              <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                autoComplete="off"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                onBlur={() => handleBlur("message")}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-md text-gray-800 placeholder-gray-500 resize-none focus:outline-none ${touched.message && errors.message
                  ? "border-red-400"
                  : "border-gray-300 focus:border-[#052659]"
                  } transition-all`}
              />
              {touched.message && errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 flex justify-center items-center gap-2 text-lg font-semibold rounded-md transition-all duration-300 ${!isFormValid || isSubmitting
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#052659] text-white hover:bg-[#6a00e8]"
                }`}
              whileHover={isFormValid && !isSubmitting ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.97 }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <FiSend className="w-5 h-5" />
            </motion.button>

            {status === "error" && (
              <motion.p
                className="text-red-600 text-center font-semibold mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Please correct the errors above or try again later.
              </motion.p>
            )}
          </form>
        </motion.div>
      </section>
    </ErrorBoundary>
  );
};

export default Contact;