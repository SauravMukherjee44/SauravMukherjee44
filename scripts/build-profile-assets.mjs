import { writeBranding } from "./profile-branding.mjs";
import { writeFileSync } from "node:fs";
const dir = new URL("../assets/profile/", import.meta.url);
const svg = (body, title, width, height) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;
writeBranding(dir);
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
console.log(
  "Built 3D hero, dot-matrix footer, social icons, and six project cards.",
);
