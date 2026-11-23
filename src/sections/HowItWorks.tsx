import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import SectionHeading from '../components/SectionHeading';
import GrowthStage1 from '../components/GrowthStage1';
import GrowthStage2 from '../components/GrowthStage2';
import GrowthStage3 from '../components/GrowthStage3';

const stem = 'M55 0 C10 150 95 180 55 320 S15 490 55 640 S90 800 55 960';
const steps = [
  { stage: 'STEP 01 · PLANT THE SEED', title: 'Upload a leaf', text: 'Start with a clear photo of your plant leaf. This is the seed of the discovery journey.', note: ['Every journey', 'starts small.'], Icon: GrowthStage1 },
  { stage: 'STEP 02 · WATCH IT GROW', title: 'AI examines the leaf', text: 'Your photo is compared with the visual patterns of common leaf conditions, and the closest matches are returned.', note: ['A closer look', 'reveals more.'], Icon: GrowthStage2 },
  { stage: 'STEP 03 · LET IT BLOOM', title: 'Discover care guidance', text: 'See the most likely condition, how confident the result is, and clear suggestions for care and prevention.', note: ['Knowledge helps', 'care blossom.'], Icon: GrowthStage3 },
];

function GrowthRow({ stage, title, text, note, Icon }: (typeof steps)[number]) {
  const row = useRef<HTMLDivElement>(null);
  const active = useInView(row, { margin: '0px 0px -24% 0px', once: true });
  return (
    <div className={'growth-row' + (active ? ' active' : '')} ref={row}>
      <div className="growth-card"><div className="stage">{stage}</div><h3>{title}</h3><p>{text}</p></div>
      <div className="growth-node"><Icon /></div>
      <div className="side-note">{note[0]}<br />{note[1]}</div>
    </div>
  );
}

export default function HowItWorks() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ['start 65%', 'end 65%'] });
  const dashOffset = useTransform(scrollYProgress, [0, 1], [1, 0]);
  return (
    <section className="section growth-section" id="how">
      <div className="growth-heading reveal">
        <SectionHeading eyebrow="03 — Follow the growth">From a tiny seed<br />to <i>clearer answers.</i></SectionHeading>
        <p>Scroll down and watch the journey grow. Each new leaf is a step in understanding your plant.</p>
      </div>
      <div className="growth-layout" ref={track}>
        <div className="growth-track" aria-hidden="true">
          <svg preserveAspectRatio="none" viewBox="0 0 110 960">
            <path className="stem-base" d={stem} pathLength={1} />
            <motion.path className="stem-progress" d={stem} pathLength={1} style={{ strokeDashoffset: dashOffset }} />
          </svg>
        </div>
        {steps.map(step => <GrowthRow key={step.stage} {...step} />)}
      </div>
    </section>
  );
}
