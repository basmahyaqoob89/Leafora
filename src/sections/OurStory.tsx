import SectionHeading from "../components/SectionHeading";
export default function OurStory() {
  return (
    <section className="section about" id="about">
      <div className="about-art reveal">
        <img alt="Plants growing in warm sunlight" src="/images/story.jpg" />
        <div className="about-bubble">Small insights. Healthier plants.</div>
      </div>
      <div className="about-copy reveal">
        <SectionHeading eyebrow="01 — Our Story">
          Technology with
          <br />a <i>green heart.</i>
        </SectionHeading>
        <p>
          Plant care should feel curious, simple, and inspiring. Leafora
          combines image classification with AI-generated guidance to help you
          explore visible leaf conditions and better understand what your plants
          may need.
        </p>
        <div className="statline">
          <div>
            <strong>38</strong>
            <small>Plant health classes</small>
          </div>
          <div>
            <strong>3</strong>
            <small>Simple steps</small>
          </div>
          <div>
            <strong>AI</strong>
            <small>Care guidance</small>
          </div>
        </div>
      </div>
    </section>
  );
}
