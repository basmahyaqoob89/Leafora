import FallingLeaves from "../components/FallingLeaves";
export default function HeroSection() {
  return (
    <section className="hero" id="home">
      <FallingLeaves />
      <div className="hero-copy">
        <div className="eyebrow">A new way to care for nature</div>
        <h1>
          Every leaf
          <br />
          has a <em>story.</em>
        </h1>
        <p>
          Listen to what your plants are telling you. Discover AI-powered leaf
          analysis and thoughtful guidance for a greener tomorrow.
        </p>
        <div className="hero-actions">
          <a className="btn" href="#features">
            Explore diagnosis <span aria-hidden="true">→</span>
          </a>
          <a className="textlink" href="#how">
            Watch the journey ↓
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-glow"></div>
        <div className="hero-orbit"></div>
        <div className="hero-orbit two"></div>
        <img
          alt="Lush green plant"
          className="hero-plant"
          src="/images/hero.jpg"
        />
        <div className="hero-sticker">
          Nature meets AI<strong>Grow with confidence</strong>
        </div>
      </div>
      <a className="scroll-cue" href="#about">
        SCROLL TO EXPLORE
      </a>
    </section>
  );
}
