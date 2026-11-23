export default function SpecimenChamber({
  image,
  caption,
}: {
  image?: string;
  caption: string;
}) {
  return (
    <div className="living-scene">
      <div className="living-scene-label">
        <span className="living-dot"></span> LEAFORA · SPECIMEN CHAMBER{" "}
        <span className="living-index">№ 001</span>
      </div>
      <div className="living-illustration" id="living-illustration">
        <div className="living-halo"></div>
        <div className="living-sun-dust" aria-hidden="true"></div>
        <span className="living-sparkle s1" aria-hidden="true">
          ✧
        </span>
        <span className="living-sparkle s2" aria-hidden="true">
          ✦
        </span>
        <span className="living-sparkle s3" aria-hidden="true">
          ✧
        </span>
        <span className="living-sparkle s4" aria-hidden="true">
          ✦
        </span>
        <div className="living-floor"></div>
        <div className="living-dome" id="living-dome">
          <div className="living-glass-sheen"></div>
          <div className="living-glass-edge"></div>
          <div className="living-glass-knob"></div>
        </div>
        <div className="living-interior">
          <div className="living-moss moss-one"></div>
          <div className="living-moss moss-two"></div>
          <div className="living-moss moss-three"></div>
          <div className="living-moss moss-four"></div>
          <div className="living-moss moss-five"></div>
          {image && (
            <div className="living-sample">
              <img alt="Selected leaf specimen" src={image} />
              <div className="living-sample-pin">SPECIMEN / 01</div>
            </div>
          )}
          <div className="living-empty-note" aria-hidden={Boolean(image)}>
            <span aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 20c0-8.5 6-14.5 16-16 .4 9.6-5.2 16-16 16Z" />
                <path d="M4.5 19.5C8 16 11.5 12.5 16 10" />
              </svg>
            </span>
            <small>
              YOUR SPECIMEN
              <br />
              GOES HERE<em>JPG · PNG · WEBP</em>
            </small>
          </div>
        </div>
        <div className="living-base">
          <div className="living-base-emblem" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 20c0-8.5 6-14.5 16-16 .4 9.6-5.2 16-16 16Z" />
              <path d="M4.5 19.5C8 16 11.5 12.5 16 10" />
            </svg>
          </div>
        </div>
        <div className="living-base-shadow"></div>
        <div aria-hidden="true" className="living-magnifier">
          <div className="living-magnifier-glass">
            <div className="living-magnifier-reflection"></div>
          </div>
          <div className="living-magnifier-handle"></div>
        </div>
        <div aria-hidden="true" className="living-microscope">
          <svg
            fill="none"
            viewBox="0 0 240 310"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="ivoryMetal" x1="0" x2="1" y1="0" y2="1">
                <stop stopColor="#fffefa"></stop>
                <stop offset=".52" stopColor="#dce4d5"></stop>
                <stop offset="1" stopColor="#aebfa9"></stop>
              </linearGradient>
            </defs>
            <ellipse
              cx="120"
              cy="293"
              fill="#b9c8b0"
              opacity=".3"
              rx="103"
              ry="11"
            ></ellipse>
            <path
              d="M62 271H184L209 286Q215 297 201 300H35Q20 296 30 286Z"
              fill="url(#ivoryMetal)"
              stroke="#9cad99"
              strokeWidth="3"
            />
            <path
              d="M149 252Q190 211 179 156Q170 111 139 101"
              stroke="#9eae99"
              strokeLinecap="round"
              strokeWidth="34"
            />
            <path
              d="M149 252Q190 211 179 156Q170 111 139 101"
              stroke="url(#ivoryMetal)"
              strokeLinecap="round"
              strokeWidth="25"
            />
            <g transform="rotate(-22 105 100)">
              <rect
                fill="url(#ivoryMetal)"
                height="131"
                rx="15"
                stroke="#a5b69e"
                strokeWidth="3"
                width="62"
                x="74"
                y="18"
              ></rect>
              <rect
                fill="#d8e1d2"
                height="17"
                rx="5"
                stroke="#a5b69e"
                strokeWidth="3"
                width="50"
                x="80"
                y="11"
              ></rect>
              <rect
                fill="#d6dfd0"
                height="23"
                rx="5"
                stroke="#a5b69e"
                strokeWidth="3"
                width="38"
                x="86"
                y="137"
              ></rect>
              <rect
                fill="#f7f9f1"
                height="28"
                rx="4"
                stroke="#a5b69e"
                strokeWidth="3"
                width="22"
                x="94"
                y="158"
              ></rect>
              <path d="M99 184H111" stroke="#729473" strokeWidth="4" />
            </g>
            <circle
              cx="166"
              cy="155"
              fill="url(#ivoryMetal)"
              r="24"
              stroke="#91a88f"
              strokeWidth="4"
            ></circle>
            <circle
              cx="166"
              cy="155"
              r="13"
              stroke="#a5b69e"
              strokeWidth="2"
            ></circle>
            <rect
              fill="#e8ede2"
              height="12"
              rx="5"
              stroke="#8ca68a"
              strokeWidth="3"
              width="105"
              x="62"
              y="216"
            ></rect>
            <path
              d="M88 229V258M145 229V258"
              stroke="#a1b49a"
              strokeWidth="7"
            />
            <circle
              cx="111"
              cy="256"
              fill="#fff9e7"
              r="15"
              stroke="#b4c6aa"
              strokeWidth="4"
            ></circle>
          </svg>
        </div>
        <div className="living-scan-beam"></div>
      </div>
      <div className="living-scene-caption">
        <span id="living-scene-caption">{caption}</span>
        <span className="living-flourish">botanical observation</span>
      </div>
    </div>
  );
}
