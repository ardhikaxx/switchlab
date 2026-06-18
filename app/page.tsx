"use client";

import { motion } from "framer-motion";
import dynamic from 'next/dynamic';

const KeyboardModel = dynamic(() => import('../components/KeyboardModel'), { ssr: false });

export default function Home() {
  return (
    <>
      <nav className="nav">
        <div className="logo">
          <div className="logo-circle"></div>
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
      </nav>

      <section className="hero">
        <div className="hero-top-info">
          <div className="barcode"></div>
          <div className="hero-subtitle">Delivering Analog Precision</div>
        </div>

        <div className="hero-title-container">
          <h1 className="hero-title">SWITCH</h1>
          <div className="hero-title line-2">
            <span>LAB</span>
            <span>- 3</span>
          </div>
          <div className="hero-floating-3d">
            <KeyboardModel />
          </div>
        </div>

        <div className="hero-bottom-info">
          <a href="#" className="btn-pill">
            Explore Catalogue
            <span className="btn-icon">↗</span>
          </a>
          <div className="hero-small-text">
            Bring your analog embrace the journey today
          </div>
        </div>
      </section>

      <section className="section-two">
        <div className="section-header">
          <h2 className="section-title">Mechanics Meets<br/>Precision</h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '15px' }}>
            <div className="hero-small-text" style={{ textAlign: 'left', maxWidth: '150px' }}>
              Bring your typing embrace the journey today
            </div>
            <div className="btn-icon" style={{ border: '1px solid #fff', background: 'transparent', color: '#fff', width: '30px', height: '30px' }}>↗</div>
          </div>
        </div>

        <div className="bento-grid">
          {/* Big Box (Cyan) */}
          <motion.div 
            className="bento-box bg-primary box-span-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="icon-top-right">↗</div>
            <div style={{ height: '100px' }}></div> {/* Spacer for where an image would be */}
            <div>
              <p style={{ marginBottom: '5px', fontWeight: 'bold' }}>Exploring innovation through the lens</p>
              <h3>Switches</h3>
            </div>
          </motion.div>

          <div className="bento-box bg-outline box-span-4" style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '20px', padding: 0, border: 'none' }}>
            {/* Top right split box */}
            <motion.div className="bento-box bg-outline" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }} whileHover={{ y: -5 }}>
              <h3 style={{ fontSize: '1.2rem' }}>KEYCAPS</h3>
            </motion.div>
            <motion.div className="bento-box bg-outline" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }} whileHover={{ y: -5 }}>
              <div className="bento-pills" style={{ margin: 0 }}>
                <span className="pill">PBT</span>
                <span className="pill">ABS</span>
              </div>
              <p style={{ fontSize: '0.7rem' }}>Delighting you always</p>
            </motion.div>
          </div>

          <motion.div className="bento-box bg-outline box-span-4" whileHover={{ y: -5 }}>
            <div>
              <h3 style={{ fontSize: '1.8rem' }}>Discover<br/>Your<br/>Effective<br/>PCB Pro</h3>
            </div>
            <a href="#" className="btn-pill" style={{ width: 'max-content', marginTop: '20px', background: 'var(--text-color)', color: 'var(--secondary)' }}>
              Order Now <span className="btn-icon" style={{ background: 'var(--secondary)', color: 'var(--text-color)' }}>↗</span>
            </a>
          </motion.div>
        </div>
      </section>



      <footer style={{ padding: '40px 4vw', display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <div>Thank you for watching</div>
        <div>Design Inspired By Reference</div>
        <div>2026</div>
      </footer>
    </>
  );
}
