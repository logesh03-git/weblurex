import { useRef, useEffect, useState } from "react";
import "./App.css";
import home from "./assets/home.jpg";
import about from "./assets/about.jpg";
import { FiMenu, FiX } from "react-icons/fi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "./assets/logo.svg";

function App() {
  const servicesRef = useRef(null);
  const aboutRef = useRef(null);
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
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  // Infinite horizontal scroll effect
  useEffect(() => {
    let animationId;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    function scrollStep() {
      if (!isHovered) {
        scroller.scrollLeft += 1;
        // When scrolled past the first set, reset to start for seamless loop
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

  // Handle form submit (EmailJS integration placeholder)
const handleSubmit = async (e) => {
  e.preventDefault();
  setSending(true);
  setSent(false);

  try {
    const response = await fetch("http://localhost:5000/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (response.ok) {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", requirements: "", description: "" });
    } else {
      throw new Error("Failed to send email");
    }
  } catch (error) {
    console.error("Email send error:", error);
    setSending(false);
    alert("Failed to send. Try again later.");
  }
};


  return (
    <div className="weblurex-root" style={{ fontFamily: "Roboto, sans-serif" }}>
      <nav className="navbar">
        <div className="logo-text" onClick={() => scrollTo(homeRef)}>
          <img src={logo} alt="Weblurex Logo" className="logo" />
          <p>Weblurex Technology</p>
        </div>
        
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
        <ul className="nav-links-desktop">
          <li>
            <button onClick={() => scrollTo(homeRef)}>Home</button>
          </li>
          <li>
            <button onClick={() => scrollTo(servicesRef)}>Services</button>
          </li>
          <li>
            <button onClick={() => scrollTo(aboutRef)}>About Us</button>
          </li>
          <li>
            <button onClick={() => scrollTo(contactRef)}>Contact Us</button>
          </li>
        </ul>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <button
              onClick={() => {
                scrollTo(homeRef);
                setMenuOpen(false);
              }}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollTo(servicesRef);
                setMenuOpen(false);
              }}
            >
              Services
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollTo(aboutRef);
                setMenuOpen(false);
              }}
            >
              About Us
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                scrollTo(contactRef);
                setMenuOpen(false);
              }}
            >
              Contact Us
            </button>
          </li>
        </ul>
      </nav>
      <section ref={homeRef} className="section home-section">
        <img src={home} alt="home banner" />
        <div id="home-content">
          <h1
            className="section-title"
            style={{ color: "#003D5C", textAlign: "left" }}
          >
            Empowering Your Digital Journey
          </h1>
          <p style={{ color: "#003D5C", textAlign: "left" }}>
            We build creative, scalable, and impactful digital
            solutions—websites, apps, designs, marketing strategies, and
            personal portfolios that leave a lasting impression.
          </p>
        </div>
      </section>
      <section
        ref={servicesRef}
        className="section services-section"
        style={{ background: "#fff" }}
      >
        <h2 className="section-title" style={{ color: "#003D5C" }}>
          Our Services
        </h2>
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
        <p className="scroller-hint" style={{ color: "#fff" }}>
          (Hover to pause scrolling)
        </p>
      </section>
      <section ref={aboutRef} className="section about-section">
        <h2 className="section-title">About Us</h2>
        <img src={about} alt="about us banner" />
        <p style={{ color: "#003D5C", textAlign: "left" }}>
          *Innovating for Tomorrow, Delivering Today* At *Weblurex Technology*,
          we are a passionate team of designers, developers, and marketers
          united by one mission: to turn ideas into digital realities. We
          believe in clean design, powerful functionality, and building lasting
          partnerships with clients. Whether you're a startup or a growing
          brand, we’re here to craft digital experiences that elevate your
          vision.
        </p>
      </section>
      <section ref={contactRef} className="section contact-section">
        <h2 className="section-title">Contact Us</h2>
        <div className="contact-flex">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name" className="section-title" >Name*</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Jhon"
              value={form.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="email" className="section-title">Email*</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@123.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="requirements" className="section-title" >Requirements*</label>
            <input
              id="requirements"
              type="text"
              name="requirements"
              placeholder="Your requirements"
              value={form.requirements}
              onChange={handleChange}
              required
            />
            <label htmlFor="description" className="section-title" >Description*</label>
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              required
            />
            <button className="section-title"  style={{ color: "#CCFFF4" }} type="submit" disabled={sending}>
              {sending ? "Sending..." : "Submit"}
            </button>
          </form>
          {/* You can add a right-side info or image here if needed */}
        </div>
        {sent && (
          <p className="success-msg">Thank you! Your message has been sent.</p>
        )}
      </section>
      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-col footer-brand">Weblurex Technology</div>
          <div className="footer-col footer-contact">
            <div>Gmail : <a href="mailto:weblurex@gmail.com">weblurex@gmail.com</a></div>
            <div>Contact number : 8825874814, 8248254841</div>
            <div>Location : Vellore, Tamilnadu, India.</div>
          </div>
          <div className="footer-col footer-social">
            <a href="https://www.instagram.com/weblurex_technology?igsh=MWMwbWgycWd6bDA4NA==" target="_blank" rel="noopener noreferrer" className="footer-icon ig">
              <FaInstagram size={28} />
            </a>
            <a href="https://www.linkedin.com/in/weblurex-technology-34317a372/" target="_blank" rel="noopener noreferrer" className="footer-icon ig">
              <FaLinkedinIn size={28} />
            </a>
          </div>
        </div>
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} Weblurex. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
