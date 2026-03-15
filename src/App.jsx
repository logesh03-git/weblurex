import { useRef, useEffect, useState } from "react";
import "./App.css";
import home from "./assets/home.jpg";
import about from "./assets/about.jpg";
import jagajothi from "./assets/jagajothi.jpeg";
import kt from "./assets/kt.jpeg";
import uniqeArts from "./assets/uniqeArts.jpeg";
import aa from "./assets/aa.jpeg";
import { FiMenu, FiX } from "react-icons/fi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "./assets/logo.svg";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
  const clientsRef = useRef(null);
  const contactRef = useRef(null);
  const homeRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    requirements: "",
    description: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const scrollerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth scroll to section
  const scrollTo = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Infinite horizontal scroll effect
  useEffect(() => {
    let animationId;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    function scrollStep() {
      if (!isHovered) {
        scroller.scrollLeft += 1.5; // Slightly faster for smoothness
        // When scrolled past the first half, reset
        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scrollStep);
    }
    animationId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSent(false);

    try {
      const response = await fetch("https://weblurex-backend.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSending(false);
        setSent(true);
        setForm({ name: "", email: "", requirements: "", description: "" });
        setTimeout(() => setSent(false), 5000); // Hide success after 5s
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Email send error:", error);
      setSending(false);
      alert("Failed to send. Try again later.");
    }
  };

  // Animation Variants
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <div className="weblurex-root">
      {/* NAVBAR */}
      <motion.nav
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="logo-text" onClick={() => scrollTo(homeRef)}>
          <img src={logo} alt="Weblurex Logo" />
          <p>Weblurex Technology</p>
        </div>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>

        <ul className="nav-links-desktop">
          <li><button onClick={() => scrollTo(homeRef)}>Home</button></li>
          <li><button onClick={() => scrollTo(servicesRef)}>Services</button></li>
          <li><button onClick={() => scrollTo(aboutRef)}>About Us</button></li>
          <li><button onClick={() => scrollTo(contactRef)}>Contact Us</button></li>
        </ul>

        {/* Mobile Menu using AnimatePresence */}
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              className="nav-links open"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <li>
                <button onClick={() => { scrollTo(homeRef); setMenuOpen(false); }}>Home</button>
              </li>
              <li>
                <button onClick={() => { scrollTo(servicesRef); setMenuOpen(false); }}>Services</button>
              </li>
              <li>
                <button onClick={() => { scrollTo(aboutRef); setMenuOpen(false); }}>About Us</button>
              </li>
              <li>
                <button onClick={() => { scrollTo(contactRef); setMenuOpen(false); }}>Contact Us</button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO SECTION */}
      <section ref={homeRef} className="section home-section">
        <motion.img
          src={home}
          alt="home banner"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.div
          id="home-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="section-title" variants={fadeUpVariant}>
            Empowering Your Digital Journey
          </motion.h1>
          <motion.p variants={fadeUpVariant}>
            We build creative, scalable, and impactful digital solutions—websites,
            apps, designs, marketing strategies, and personal portfolios that leave
            a lasting impression.
          </motion.p>
        </motion.div>
      </section>

      {/* SERVICES SECTION */}
      <motion.section
        ref={servicesRef}
        className="section services-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
      >
        <h2 className="section-title">Our Services</h2>
        <div
          className="services-scroller"
          ref={scrollerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {Array(10)
            .fill([
              { title: "UI/UX & Graphic Design", content: "We craft beautiful, user-centric designs that enhance usability and create seamless experiences—from logos and brochures to full UI kits and interfaces" },
              { title: "Web Development", content: "From landing pages to fully custom web apps, our development team ensures your digital presence is modern, fast, and optimized for performance." },
              { title: "Mobile App Development", content: "We build intuitive, cross-platform mobile applications using the latest technology for Android and iOS—tailored to your unique business goals." },
              { title: "Digital Marketing", content: "Boost your visibility with our full-suite digital marketing services, including SEO, social media campaigns, content marketing, and PPC ads." },
              { title: "Portfolio Building", content: "We help individuals and creatives showcase their work professionally—perfect for freelancers, students, designers, photographers, and developers." },
            ])
            .flat()
            .map((item, i) => (
              <div className="service-card" key={i}>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
              </div>
            ))}
        </div>
        <p className="scroller-hint">(Hover to pause scrolling)</p>
      </motion.section>

      {/* ABOUT US SECTION */}
      <motion.section
        ref={aboutRef}
        className="section about-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2 className="section-title" variants={fadeUpVariant}>About Us</motion.h2>
        <motion.img
          src={about}
          alt="about us banner"
          variants={fadeUpVariant}
        />
        <motion.p variants={fadeUpVariant}>
          <b>Innovating for Tomorrow, Delivering Today</b><br /><br />
          At <b>Weblurex Technology</b>, we are a passionate team of designers,
          developers, and marketers united by one mission: to turn ideas into digital
          realities. We believe in clean design, powerful functionality, and building lasting
          partnerships with clients. Whether you're a startup or a growing brand,
          we’re here to craft digital experiences that elevate your vision.
        </motion.p>
      </motion.section>

      {/* OUR CLIENTS SECTION */}
      <motion.section
        ref={clientsRef}
        className="section clients-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2 className="section-title" variants={fadeUpVariant}>Trusted By</motion.h2>
        <motion.p className="clients-description" variants={fadeUpVariant}>
          We are proud to collaborate with forward-thinking brands and visionary businesses. 
          Our commitment to excellence has helped these organizations transform their digital 
          presence and achieve remarkable growth.
        </motion.p>
        <div className="clients-grid">
          {[jagajothi, kt, uniqeArts, aa].map((clientLogo, index) => (
            <motion.div
              className="client-logo-wrapper"
              key={index}
              variants={fadeUpVariant}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(0, 61, 92, 0.12)",
                y: -5
              }}
              transition={{ duration: 0.3 }}
            >
              <img src={clientLogo} alt={`Client partner ${index + 1}`} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <motion.section
        ref={contactRef}
        className="section contact-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
      >
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-flex">
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            whileHover={{ boxShadow: "0 25px 60px rgba(0, 61, 92, 0.12)" }}
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="name">Name*</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Jhon"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email*</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@123.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="requirements">Requirements*</label>
            <input
              id="requirements"
              type="text"
              name="requirements"
              placeholder="Your requirements"
              value={form.requirements}
              onChange={handleChange}
              required
            />

            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              placeholder="Project description details..."
              value={form.description}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Submit"}
            </button>

            <AnimatePresence>
              {sent && (
                <motion.p
                  className="success-msg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  Thank you! Your message has been sent.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-col">
            <div className="footer-brand">Weblurex Technology</div>
            <p>Empowering digital journeys globally. Let's build something exceptional together.</p>
          </div>
          <div className="footer-col footer-contact">
            <p><strong>Gmail:</strong> <a href="mailto:weblurex@gmail.com">weblurex@gmail.com</a></p>
            <p><strong>Contact:</strong> 8825874814, 8248254841</p>
            <p><strong>Location:</strong> Vellore, Tamilnadu, India.</p>
          </div>
          <div className="footer-col footer-social">
            <a href="https://www.instagram.com/weblurex_technology?igsh=MWMwbWgycWd6bDA4NA==" target="_blank" rel="noopener noreferrer" className="footer-icon ig">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/weblurex-technology-34317a372/" target="_blank" rel="noopener noreferrer" className="footer-icon ig">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Weblurex Technology. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
