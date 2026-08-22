/**
 * Blueprint-style schematics, one per project.
 * These replace the previous raster-ish placeholder SVGs: they inherit theme
 * colour via currentColor, stay crisp at any size, and share one line language
 * (1.5px strokes, 4px dash for construction lines).
 */

const Frame = ({ children }: { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 400 240"
    role="presentation"
    aria-hidden
    className="h-full w-full text-[var(--accent)]"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      <pattern id="pa-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0H0v20" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="400" height="240" fill="url(#pa-grid)" />
    {children}
    {/* corner registration marks */}
    <g stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5">
      <path d="M14 26V14h12M374 14h12v12M386 214v12h-12M26 226H14v-12" />
    </g>
  </svg>
);

const Helmet = () => (
  <Frame>
    <g stroke="currentColor" strokeWidth="1.5">
      <path d="M120 148a80 62 0 0 1 160 0" strokeWidth="2" />
      <path d="M112 148h176a8 8 0 0 1 8 8v6H104v-6a8 8 0 0 1 8-8Z" strokeWidth="2" />
      <path d="M200 86v62M148 108l104 0" strokeOpacity="0.45" strokeDasharray="4 5" />
      <circle cx="200" cy="86" r="9" strokeWidth="2" />
      <circle cx="200" cy="86" r="3" fill="currentColor" stroke="none" />
      <path d="M182 70a26 26 0 0 1 36 0M172 58a42 42 0 0 1 56 0" strokeOpacity="0.5" />
      <circle cx="152" cy="132" r="6" />
      <circle cx="248" cy="132" r="6" />
      <path d="M56 202h62l10-12 14 24 12-28 14 34 12-18h164" strokeWidth="2" strokeOpacity="0.65" />
    </g>
  </Frame>
);

const Arm = () => (
  <Frame>
    <g stroke="currentColor" strokeWidth="1.5">
      <path d="M96 206h72M108 206v-14h48v14" strokeWidth="2" />
      <circle cx="132" cy="184" r="12" strokeWidth="2" />
      <path d="M132 184 208 120" strokeWidth="6" strokeOpacity="0.28" />
      <path d="M132 184 208 120" strokeWidth="2" />
      <circle cx="208" cy="120" r="10" strokeWidth="2" />
      <path d="M208 120 286 92" strokeWidth="6" strokeOpacity="0.28" />
      <path d="M208 120 286 92" strokeWidth="2" />
      <circle cx="286" cy="92" r="8" strokeWidth="2" />
      <path d="M286 92l24-14M310 78l10 10M310 78l12-4" strokeWidth="2" />
      <path d="M132 184a76 76 0 0 1 76-76" strokeOpacity="0.4" strokeDasharray="4 5" />
      <path d="M60 206h280" strokeOpacity="0.35" />
      <circle cx="132" cy="184" r="30" strokeOpacity="0.25" strokeDasharray="3 6" />
    </g>
  </Frame>
);

const Academy = () => (
  <Frame>
    <g stroke="currentColor" strokeWidth="1.5">
      <path d="M120 96 200 58l80 38-80 20-80-20Z" strokeWidth="2" />
      <path d="M200 116v26M148 106v28a52 52 0 0 0 104 0v-28" strokeOpacity="0.5" strokeDasharray="4 5" />
      <circle cx="200" cy="150" r="10" strokeWidth="2" />
      <g strokeWidth="2">
        <circle cx="126" cy="176" r="9" />
        <path d="M112 206a14 14 0 0 1 28 0" />
        <circle cx="200" cy="188" r="9" />
        <path d="M186 218a14 14 0 0 1 28 0" />
        <circle cx="274" cy="176" r="9" />
        <path d="M260 206a14 14 0 0 1 28 0" />
      </g>
      <path d="M200 160v18M194 156l-62 12M206 156l62 12" strokeOpacity="0.45" />
    </g>
  </Frame>
);

const LineBot = () => (
  <Frame>
    <g stroke="currentColor" strokeWidth="1.5">
      <path
        d="M40 200C96 200 96 128 152 128s56 64 112 64 40-88 96-88"
        strokeWidth="6"
        strokeOpacity="0.22"
      />
      <path
        d="M40 200C96 200 96 128 152 128s56 64 112 64 40-88 96-88"
        strokeWidth="1.5"
        strokeDasharray="5 7"
        strokeOpacity="0.6"
      />
      <rect x="164" y="86" width="88" height="62" rx="8" strokeWidth="2" />
      <circle cx="160" cy="102" r="10" strokeWidth="2" />
      <circle cx="256" cy="102" r="10" strokeWidth="2" />
      <circle cx="160" cy="134" r="10" strokeWidth="2" />
      <circle cx="256" cy="134" r="10" strokeWidth="2" />
      <path d="M186 148v14M208 148v14M230 148v14" strokeWidth="2" />
      <path d="M180 162h52" strokeWidth="2" strokeOpacity="0.5" />
      <rect x="186" y="102" width="44" height="26" rx="4" strokeOpacity="0.55" />
      <path d="M208 86V64M198 64h20" strokeOpacity="0.5" />
    </g>
  </Frame>
);

const Airplane = () => (
  <Frame>
    <g stroke="currentColor" strokeWidth="1.5">
      <path d="M198 52c8 0 12 10 12 26v96c0 16-4 26-12 26s-12-10-12-26V78c0-16 4-26 12-26Z" strokeWidth="2" />
      <path d="M186 108 62 132v18l124-14ZM210 108l124 24v18l-124-14Z" strokeWidth="2" />
      <path d="M188 186l-38 12v10l38-8ZM208 186l38 12v10l-38-8Z" strokeWidth="2" />
      <path d="M62 132 186 108M334 132 210 108" strokeOpacity="0.35" strokeDasharray="4 5" />
      <path d="M40 78h120" strokeOpacity="0.35" />
      <path d="M46 72c30-14 74-14 108 6-34 10-78 8-108-6Z" strokeOpacity="0.55" />
      <circle cx="198" cy="52" r="5" fill="currentColor" stroke="none" />
    </g>
  </Frame>
);

const Outreach = () => (
  <Frame>
    <g stroke="currentColor" strokeWidth="1.5">
      <circle cx="200" cy="120" r="26" strokeWidth="2" />
      <circle cx="200" cy="120" r="9" fill="currentColor" stroke="none" />
      <circle cx="200" cy="120" r="62" strokeOpacity="0.28" strokeDasharray="4 6" />
      <circle cx="200" cy="120" r="94" strokeOpacity="0.18" strokeDasharray="4 6" />
      <g strokeWidth="2">
        <circle cx="108" cy="120" r="13" />
        <circle cx="292" cy="120" r="13" />
        <circle cx="200" cy="42" r="13" />
        <circle cx="200" cy="198" r="13" />
        <circle cx="136" cy="184" r="10" />
        <circle cx="264" cy="56" r="10" />
      </g>
      <path
        d="M174 120h-53M226 120h53M200 94V55M200 146v39M182 138l-38 38M218 102l38-38"
        strokeOpacity="0.55"
      />
    </g>
  </Frame>
);

const registry: Record<string, () => React.JSX.Element> = {
  "smart-safety-helmet": Helmet,
  "5-dof-robotic-arm": Arm,
  "dhruva-academy": Academy,
  "line-following-bot": LineBot,
  "rc-airplane": Airplane,
  "robotics-outreach": Outreach,
};

export function ProjectArt({ id }: { id: string }) {
  const Art = registry[id] ?? Outreach;
  return <Art />;
}
