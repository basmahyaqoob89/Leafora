import type { ReactNode } from 'react';

export default function SectionHeading({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return <><div className="eyebrow">{eyebrow}</div><h2>{children}</h2></>;
}
