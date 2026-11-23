export default function GrowthStage3() {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 80">
      <path
        className="sprout-part"
        d="M40 72 V39"
        stroke="#44864b"
        strokeWidth="5"
      />
      <path
        className="sprout-part"
        d="M40 62 Q14 55 10 38 Q32 35 40 62"
        fill="#5caa67"
      />
      <path
        className="sprout-part"
        d="M40 55 Q68 49 72 31 Q47 30 40 55"
        fill="#7bbd7b"
      />
      <g className="sprout-part" fill="#f6e1a2">
        <ellipse cx="40" cy="19" rx="10" ry="17"></ellipse>
        <ellipse
          cx="40"
          cy="19"
          rx="10"
          ry="17"
          transform="rotate(72 40 28)"
        ></ellipse>
        <ellipse
          cx="40"
          cy="19"
          rx="10"
          ry="17"
          transform="rotate(-72 40 28)"
        ></ellipse>
      </g>
      <circle
        className="sprout-part"
        cx="40"
        cy="28"
        fill="#e5ad55"
        r="9"
      ></circle>
    </svg>
  );
}
