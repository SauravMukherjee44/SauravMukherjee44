import { writeFileSync } from "node:fs";
const dir = new URL("../assets/profile/", import.meta.url);
const svg = (body, title, width, height) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;
const hero = `<defs>
<linearGradient id="line" x2="1" y2="1"><stop stop-color="#b49aff"/><stop offset="1" stop-color="#86efcf"/></linearGradient>
<radialGradient id="glow"><stop stop-color="#7c54c9" stop-opacity=".30"/><stop offset="1" stop-color="#10121c" stop-opacity="0"/></radialGradient>
<pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#a8b0d0" opacity=".13"/></pattern>
</defs>
<style>.signal{animation:pulse 5s ease-in-out infinite}@keyframes pulse{50%{opacity:.35}}@media(prefers-reduced-motion:reduce){.signal{animation:none}}</style>
<rect width="1200" height="400" rx="24" fill="#10121c"/>
<ellipse cx="920" cy="180" rx="490" ry="400" fill="url(#glow)"/>
<rect width="1200" height="400" rx="24" fill="url(#grid)"/>
<path d="M70 82H1130" stroke="#353347"/>
<g font-family="Arial,Helvetica,sans-serif">
<text x="70" y="55" fill="#b5a1ed" font-size="13" letter-spacing="3">BUILDING THE SIGNAL</text>
<text x="1130" y="55" text-anchor="end" fill="#b0b4c5" font-size="13" letter-spacing="1.5">KOLKATA, INDIA / OPEN TO THE WORLD</text>
<text x="65" y="175" font-size="82" font-weight="700" letter-spacing="-4" fill="#f4f2ff">Saurav</text>
<text x="65" y="263" font-size="82" font-weight="700" letter-spacing="-4" fill="url(#line)">Mukherjee.</text>
<text x="70" y="310" font-size="18" fill="#c1c2d2">AI engineer. Product builder. Community catalyst.</text>
<circle cx="77" cy="354" r="5" fill="#86efcf" class="signal"/>
<text x="94" y="359" font-size="14" fill="#c8ccdb">AI Engineer @ EY</text>
<g fill="none" stroke="url(#line)" stroke-width="1.5" opacity=".75">
<path d="M785 165L920 125L1070 185L950 280L785 165L800 300L950 280M920 125L950 280M1070 185L800 300"/>
<circle cx="930" cy="210" r="125" stroke-opacity=".15"/>
<circle cx="930" cy="210" r="155" stroke-dasharray="3 12" stroke-opacity=".25"/>
</g>
<g fill="#191c2b" stroke="#6e6496"><circle cx="785" cy="165" r="9"/><circle cx="920" cy="125" r="9"/><circle cx="1070" cy="185" r="9"/><circle cx="950" cy="280" r="9"/><circle cx="800" cy="300" r="9"/></g>
<circle cx="920" cy="125" r="4" fill="#a7f3d0" class="signal"/>
<g font-size="11" letter-spacing="1.6" fill="#ded6f7"><text x="720" y="144">EVIDENCE</text><text x="889" y="102">AGENTS</text><text x="1025" y="166">EVALUATE</text><text x="919" y="309">SHIP</text><text x="725" y="327">HUMAN REVIEW</text></g>
<text x="945" y="365" text-anchor="middle" fill="#a9a4bd" font-size="12" letter-spacing="2">IDEAS INTO SYSTEMS. SYSTEMS INTO IMPACT.</text>
</g>`;
writeFileSync(
  new URL("hero.svg", dir),
  svg(
    hero,
    "Saurav Mukherjee — AI engineer, product builder, community catalyst",
    1200,
    400,
  ),
);
const projects = [
  [
    "swapilot",
    "01",
    "SwaPilot",
    "ON-DEVICE INTELLIGENCE",
    "AI, business memory, and action.",
    "A product direction built around ownership.",
    "#b6a0ff",
    "PRODUCT & PILOT",
    "DEVICE → MEMORY → ACTION",
  ],
  [
    "opsweave",
    "02",
    "OpsWeave",
    "ENTERPRISE WORKFLOW COMPILER",
    "Scattered evidence. Structured workflows.",
    "Typed validation and human approval.",
    "#baf475",
    "FULL-STACK BUILD",
    "EVIDENCE → COMPILE → EXECUTE",
  ],
  [
    "healthai",
    "03",
    "HealthAI Agent Lab",
    "OPEN-MODEL RESEARCH",
    "Specialist models, local voice,",
    "and explicit safety boundaries.",
    "#efb6cb",
    "RESEARCH DEMO",
    "INTENT → SPECIALISTS → SAFETY",
  ],
  [
    "codein",
    "04",
    "CodeIN Community",
    "BUILDING TOGETHER SINCE 2021",
    "A developer community, useful tools,",
    "and a home for first contributions.",
    "#ffcd58",
    "COMMUNITY & TOOLKIT",
    "LEARN → CONTRIBUTE → GIVE BACK",
  ],
  [
    "signalforge",
    "05",
    "SignalForge",
    "REAL-TIME INCIDENT INTELLIGENCE",
    "Turn a noisy incident room",
    "into evidence and accountable action.",
    "#83d3f7",
    "VOICE & MULTI-AGENT",
    "VOICE → EVIDENCE → RESPONSE",
  ],
  [
    "verdatrace",
    "06",
    "VerdaTrace",
    "ENVIRONMENTAL INTELLIGENCE",
    "Source-cited obligations. Spatial evidence.",
    "Decisions that stay human-reviewed.",
    "#8de2c6",
    "EVIDENCE WORKSPACE",
    "SOURCES → OBLIGATIONS → REVIEW",
  ],
];
for (const [
  id,
  number,
  title,
  kicker,
  line1,
  line2,
  accent,
  status,
  flow,
] of projects) {
  const body = `<defs><linearGradient id="accent"><stop stop-color="${accent}"/><stop offset="1" stop-color="#1b2032"/></linearGradient></defs><rect x=".5" y=".5" width="559" height="249" rx="16" fill="#111520" stroke="#303548"/><path d="M20 1H540" stroke="url(#accent)" stroke-width="2"/><circle cx="525" cy="32" r="4" fill="${accent}"/><g font-family="Arial,Helvetica,sans-serif"><text x="28" y="36" font-size="11" letter-spacing="1.6" fill="${accent}">${number} / ${kicker.replaceAll("&", "&amp;")}</text><text x="27" y="94" font-size="35" font-weight="700" letter-spacing="-1" fill="#f0eff7">${title}</text><text x="28" y="129" font-size="17" fill="#bfc4d5">${line1}</text><text x="28" y="153" font-size="17" fill="#bfc4d5">${line2}</text><path d="M28 179H532" stroke="#303548"/><text x="28" y="206" font-size="10" letter-spacing="1" fill="${accent}">${flow}</text><text x="28" y="230" font-size="9" letter-spacing="1.4" fill="#929ab0">${status.replaceAll("&", "&amp;")}</text><text x="510" y="226" font-size="25" fill="${accent}">↗</text></g>`;
  writeFileSync(
    new URL(id + ".svg", dir),
    svg(body, title.replaceAll("&", "&amp;"), 560, 250),
  );
}
console.log("Built hero and six project cards.");
