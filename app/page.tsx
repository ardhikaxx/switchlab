"use client";

import { motion, useScroll, useSpring, Variants } from "framer-motion";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";

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

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <>
      <motion.div 
        className="custom-cursor"
        animate={{ x: mousePosition.x - 10, y: mousePosition.y - 10 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />

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

        <motion.div className="hero-title-container" initial="hidden" animate="visible" variants={staggerContainer}>
          <motion.h1 className="hero-title" variants={fadeInUp}>SWITCH</motion.h1>
          <motion.div className="hero-title line-2" variants={fadeInUp}>
            <span>LAB</span>
            <span>- 3</span>
          </motion.div>
          <div className="hero-floating-3d">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ width: '100%', height: '100%' }}
            >
              <KeyboardModel />
            </motion.div>
          </div>
        </motion.div>

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
            <div style={{ height: '100px' }}></div>
            <div>
              <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Exploring innovation through the lens</p>
              <h3>Switches</h3>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="bento-box bg-outline box-span-4" style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '20px', padding: 0, border: 'none' }}>
            <motion.div className="bento-box bg-outline" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }} whileHover={{ scale: 1.02 }}>
              <h3 style={{ fontSize: '1.2rem' }}>KEYCAPS</h3>
            </motion.div>
            <motion.div className="bento-box bg-outline" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }} whileHover={{ scale: 1.02 }}>
              <div className="bento-pills" style={{ margin: 0 }}>
                <span className="pill">PBT</span>
                <span className="pill">ABS</span>
              </div>
              <p style={{ fontSize: '0.7rem' }}>Delighting you always</p>
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

      <footer style={{ padding: '40px 4vw', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <div>Thank you for watching</div>
        <div>Design Inspired By Reference</div>
        <div>2026</div>
      </footer>
    </>
  );
}
