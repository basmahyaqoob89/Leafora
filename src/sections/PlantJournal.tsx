import SectionHeading from '../components/SectionHeading';

const entries = [
  { image: 'journal-healthy', alt: 'Healthy green plant', tag: 'The good signs', title: 'Healthy beginnings', text: "Color, texture, and growth patterns can offer clues about a plant's condition." },
  { image: 'journal-marks', alt: 'Sunlit leaves', tag: 'Look a little closer', title: 'Every mark matters', text: 'Spots and discoloration can be signs worth investigating—not a diagnosis by themselves.' },
  { image: 'journal-care', alt: 'Plant care and foliage', tag: 'Growing together', title: 'Care is a journey', text: 'Thoughtful observation, watering, and airflow can support healthy growth.' },
];

export default function PlantJournal() {
  return (
    <section className="section knowledge" id="journal">
      <div className="section-head reveal">
        <SectionHeading eyebrow="02 — The little green journal">Nature speaks in<br /><i>tiny details.</i></SectionHeading>
        <p>Get to know the signs your leaves might be sharing.</p>
      </div>
      <div className="knowledge-grid">
        {entries.map(({ image, alt, tag, title, text }) => (
          <article key={image} className="knowledge-card reveal">
            <img src={'/images/' + image + '.jpg'} alt={alt} loading="lazy" />
            <div className="cardcopy"><span className="tag">{tag}</span><h3>{title}</h3><p>{text}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
