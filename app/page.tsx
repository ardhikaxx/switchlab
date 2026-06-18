"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame, Variants } from "framer-motion";
import dynamic from 'next/dynamic';
import { useState, useRef } from "react";

const KeyboardModel = dynamic(() => import('../components/KeyboardModel'), { ssr: false });

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

function TiltCard({ title, subtitle, num }: { title: string, subtitle: string, num: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="tilt-card"
    >
      <div className="tilt-bg-number" style={{ transform: "translateZ(20px)" }}>{num}</div>
      <div className="tilt-glow"></div>
      
      <div style={{ transform: "translateZ(60px)" }} className="tilt-content">
        <div className="tilt-header">
          <span className="tilt-badge">Feature {num}</span>
          <div className="tilt-icon">✦</div>
        </div>
        <div className="tilt-footer">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
    </motion.div>
  );
}

function VelocityScrollText({ children, baseVelocity = 100 }: { children: React.ReactNode, baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
  };

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="velocity-parallax">
      <motion.div className="velocity-scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

function FaqItem({ question, answer, index }: { question: string, answer: string, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="faq-item" 
      onClick={() => setIsOpen(!isOpen)}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="faq-question">
        <span>{question}</span>
        <motion.span animate={{ rotate: isOpen ? 45 : 0 }}>+</motion.span>
      </div>
      <motion.div 
        className="faq-answer"
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p style={{ paddingTop: '10px' }}>{answer}</p>
      </motion.div>
    </motion.div>
  );
}

function HorizontalScrollGallery() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  const cards = [
    { title: "AESTHETICS", bg: "01", desc: "Design that speaks volumes." },
    { title: "PERFORMANCE", bg: "02", desc: "Zero latency. Pure speed." },
    { title: "ERGONOMICS", bg: "03", desc: "Comfort for the long hours." },
    { title: "CUSTOM", bg: "04", desc: "Make it truly yours." }
  ];

  return (
    <section ref={targetRef} className="horizontal-scroll-section">
      <div className="horizontal-sticky-container">
        <motion.div style={{ x }} className="horizontal-track">
          {cards.map((card, i) => (
            <div key={i} className="horizontal-card">
              <div className="horizontal-card-bg">{card.bg}</div>
              <div className="horizontal-card-title">{card.title}</div>
              <p style={{ zIndex: 2, fontSize: '1.2rem', marginTop: '10px' }}>{card.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>

      <motion.div className="scroll-progress" style={{ scaleX }} />

      <motion.nav 
        className="nav"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        <div className="logo">
          <motion.div className="logo-circle" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}></motion.div>
          <span>SWITCH LAB</span>
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#offers">Offers</a>
        </div>
        <div className="nav-icons">
          <span></span><span></span><span></span><span></span>
        </div>
      </motion.nav>

      <section className="hero">
        <motion.div className="hero-top-info" initial="hidden" animate="visible" variants={fadeInUp}>
          <div className="barcode"></div>
          <div className="hero-subtitle">Delivering Analog Precision</div>
        </motion.div>

        <div className="hero-title-container">
          <motion.div className="hero-text-layer" initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 className="hero-title" variants={fadeInUp}>SWITCH</motion.h1>
            <motion.div className="hero-title line-2" variants={fadeInUp}>
              <span>LAB</span>
              <span>- 3</span>
            </motion.div>
          </motion.div>
          
          <div className="hero-3d-layer">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ width: '100%', height: '100%' }}
            >
              <KeyboardModel />
            </motion.div>
          </div>
        </div>

        <motion.div className="hero-bottom-info" initial="hidden" animate="visible" variants={fadeInUp}>
          <a href="#" className="btn-pill">
            Explore Catalogue
            <span className="btn-icon">↗</span>
          </a>
          <div className="hero-small-text">
            Bring your analog embrace the journey today
          </div>
        </motion.div>
      </section>

      {/* Infinite Marquee Animation */}
      <div className="marquee-container">
        <motion.div 
          className="marquee-track"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 10, repeat: Infinity }}
        >
          <span>MECHANICAL KEYBOARDS • TACTILE FEEDBACK • CUSTOM BUILDS • PREMIUM SWITCHES •</span>
          <span>MECHANICAL KEYBOARDS • TACTILE FEEDBACK • CUSTOM BUILDS • PREMIUM SWITCHES •</span>
        </motion.div>
      </div>

      <section className="section-two">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 className="section-title" variants={fadeInUp}>Mechanics Meets<br/>Precision</motion.h2>
          <motion.div variants={fadeInUp} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '15px' }}>
            <div className="hero-small-text" style={{ textAlign: 'left', maxWidth: '150px' }}>
              Bring your typing embrace the journey today
            </div>
            <motion.div className="btn-icon" whileHover={{ rotate: 45 }} style={{ border: '1px solid #fff', background: 'transparent', color: '#fff', width: '30px', height: '30px' }}>↗</motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="bento-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {/* Big Box (Cyan) */}
          <motion.div 
            className="bento-box bg-primary box-span-4"
            variants={fadeInUp}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="icon-top-right">↗</div>
            
            {/* Animated Floating Shapes */}
            <div style={{ position: 'relative', height: '150px', width: '100%', overflow: 'hidden' }}>
              <motion.div 
                className="floating-shape"
                style={{ width: '40px', height: '40px', borderRadius: '50%', right: '20%', top: '20%' }}
                animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="floating-shape"
                style={{ width: '30px', height: '30px', left: '20%', bottom: '20%' }}
                animate={{ y: [0, 30, 0], rotate: [-45, 45, -45] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div 
                className="floating-shape"
                style={{ width: '60px', height: '20px', borderRadius: '10px', right: '40%', bottom: '10%' }}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div>
              <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Exploring innovation through the lens</p>
              <h3>Switches</h3>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bento-box bg-outline box-span-4" style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '20px', padding: 0, border: 'none' }}>
            <motion.div 
              className="bento-box bg-outline" 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', overflow: 'hidden', position: 'relative' }} 
              whileHover={{ backgroundColor: "var(--primary)", color: "var(--secondary)" }}
              transition={{ duration: 0.3 }}
            >
              <h3 style={{ fontSize: '1.5rem', letterSpacing: '2px' }}>KEYCAPS</h3>
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                style={{ position: 'absolute', bottom: '10px', right: '20px', fontWeight: 'bold' }}
              >
                Explore ↗
              </motion.div>
            </motion.div>
            
            <motion.div className="bento-box bg-outline" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: '15px' }} whileHover={{ scale: 1.02 }}>
              <div className="keycaps-container">
                <div className="mech-key">PBT</div>
                <div className="mech-key">ABS</div>
              </div>
              <p style={{ fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Delighting you always</p>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bento-box bg-outline box-span-4" whileHover={{ y: -10, scale: 1.02 }}>
            <div>
              <h3 style={{ fontSize: '1.8rem' }}>Discover<br/>Your<br/>Effective<br/>PCB Pro</h3>
            </div>
            <motion.a href="#" whileHover={{ scale: 1.05 }} className="btn-pill" style={{ width: 'max-content', marginTop: '20px', background: 'var(--text-color)', color: 'var(--secondary)' }}>
              Order Now <span className="btn-icon" style={{ background: 'var(--secondary)', color: 'var(--text-color)' }}>↗</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <HorizontalScrollGallery />

      <section className="tilt-section">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <motion.h2 variants={fadeInUp} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', textTransform: 'uppercase', marginBottom: '20px' }}>
            Premium Components
          </motion.h2>
          <div className="tilt-grid">
            <TiltCard num="01" title="Aircraft Grade" subtitle="CNC Machined Aluminum Case" />
            <TiltCard num="02" title="Hot-Swappable" subtitle="Change switches on the fly" />
            <TiltCard num="03" title="Gasket Mount" subtitle="Flex and dampening for the perfect typing feel" />
          </div>
        </motion.div>
      </section>

      <section className="philosophy-section">
        <motion.div 
          className="philosophy-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {["WE", "BELIEVE", "IN", "THE", "TACTILE", "SOUL", "OF", "MACHINES."].map((word, i) => (
            <motion.span 
              key={i} 
              variants={fadeInUp}
              style={{ display: 'inline-block' }}
              whileHover={{ scale: 1.1, color: 'var(--primary)', rotate: (i % 2 === 0 ? 5 : -5) }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </section>

      <section className="stats-container">
        {[
          { num: "50+", label: "Premium Switches" },
          { num: "10K", label: "Builds Completed" },
          { num: "99%", label: "Tactile Satisfaction" }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            className="stat-item"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.2, type: "spring", stiffness: 100 }}
          >
            <motion.div 
              className="stat-number"
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
            >
              {stat.num}
            </motion.div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      <section className="soundwave-section">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div className="soundwave-title" variants={fadeInUp}>Hear the Thock</motion.div>
          <div className="bars-container">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="bar"
                animate={{ height: [20, 20 + ((i * 17) % 80), 20] }}
                transition={{
                  duration: 0.5 + ((i * 7) % 5) * 0.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: ((i * 11) % 5) * 0.1
                }}
              />
            ))}
          </div>
          <motion.div variants={fadeInUp} style={{ marginTop: '20px', fontWeight: 'bold' }}>Experience the ultimate sound profile.</motion.div>
        </motion.div>
      </section>

      <section className="faq-section">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.h2 className="faq-title" variants={fadeInUp}>Knowledge Base</motion.h2>
          
          {[
            { q: "What makes a mechanical keyboard better?", a: "Unlike membrane keyboards, mechanical keyboards use individual physical switches for every key, providing tactile feedback, precision, and a satisfying sound profile known as the 'thock'." },
            { q: "What is the difference between PBT and ABS?", a: "PBT keycaps are highly durable, textured, and resistant to shine over time. ABS keycaps are smoother and often used for double-shot transparent legends but can develop a shine with heavy use." },
            { q: "Do you ship internationally?", a: "Yes, we ship our premium custom keyboards and components to enthusiasts all around the globe with tracked, secure shipping." }
          ].map((faq, i) => (
            <FaqItem key={i} question={faq.q} answer={faq.a} index={i} />
          ))}

        </motion.div>
      </section>

      <section className="velocity-section">
        <VelocityScrollText baseVelocity={5}>SWITCH LAB • CUSTOM BUILDS • ZERO COMPROMISE •</VelocityScrollText>
        <VelocityScrollText baseVelocity={-5}>TACTILE • LINEAR • CLICKY • SILENT •</VelocityScrollText>
      </section>

      <footer style={{ padding: '40px 4vw', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <div>Thank you for watching</div>
        <div>Develop by <a href="https://www.instagram.com/ardhxkaa_/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'var(--primary)', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#fff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--primary)'}>ardhika</a></div>
        <div>2026</div>
      </footer>
    </>
  );
}
