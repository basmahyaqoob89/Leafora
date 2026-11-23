import type { CSSProperties } from 'react';

const colors = ['#87b77d', '#a5c993', '#679d70', '#c1d7a5', '#91b68c'];
const leaves = Array.from({ length: 22 }, (_, i) => ({
  '--size': (15 + i * 17 % 28) + 'px',
  '--left': ((i * 43 + 7) % 100) + '%',
  '--opacity': .24 + (i % 5) * .13,
  '--duration': (10 + i * 7 % 13) + 's',
  '--delay': -(i * 11 % 23) + 's',
  '--color': colors[i % colors.length],
}) as CSSProperties);

export default function FallingLeaves() {
  return (
    <div className="leaf-layer" aria-hidden="true">
      {leaves.map((style, index) => (
        <span key={index} className="falling-leaf" style={style}>
          <svg viewBox="0 0 40 50">
            <path d="M20 47 C-5 32 1 10 35 2 C41 24 35 40 20 47 Z" />
            <path d="M20 47 Q23 24 35 2" stroke="#3e764a" strokeWidth="1.5" fill="none" opacity=".45" />
          </svg>
        </span>
      ))}
    </div>
  );
}
