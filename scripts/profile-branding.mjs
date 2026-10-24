import { readFileSync, writeFileSync } from "node:fs";

const escape = (s) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
const wrap = (body, title, w, h) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${escape(title)}"><title>${escape(title)}</title>${body}</svg>\n`;
const frames = 73;
const vertices = [
  [0, -100, 0],
  [-85, 65, -85],
  [85, 65, -85],
  [85, 65, 85],
  [-85, 65, 85],
];
function project([x, y, z], frame) {
  const angle = (frame / (frames - 1)) * Math.PI * 2 + 0.35;
  const rx = x * Math.cos(angle) + z * Math.sin(angle);
  const rz = -x * Math.sin(angle) + z * Math.cos(angle);
  const tilt = -0.38;
  const ry = y * Math.cos(tilt) - rz * Math.sin(tilt);
  const depth = y * Math.sin(tilt) + rz * Math.cos(tilt);
  const scale = 470 / (470 + depth);
  return {
    x: 930 + rx * scale,
    y: 215 + ry * scale,
    z: depth,
    r: 9 * scale,
    opacity: 0.7 - depth / 500,
  };
}
const motion = vertices.map((v) =>
  Array.from({ length: frames }, (_, f) => project(v, f)),
);
const values = (index, key) =>
  motion[index].map((p) => p[key].toFixed(2)).join(";");
const animate = (attribute, sequence) =>
  `<animate attributeName="${attribute}" values="${sequence}" dur="24s" repeatCount="indefinite"/>`;
const scalar = (index, key) =>
  animate(key === "x" ? "cx" : key === "y" ? "cy" : key, values(index, key));
const pointList = (indices, frame) =>
  indices
    .map(
      (i) =>
        `${motion[i][frame].x.toFixed(2)},${motion[i][frame].y.toFixed(2)}`,
    )
    .join(" ");

export function writeBranding(dir) {
  let mesh = `<defs><radialGradient id="sphere" cx="30%" cy="25%"><stop stop-color="#f4fff9"/><stop offset=".3" stop-color="#91edcd"/><stop offset=".7" stop-color="#548f9b"/><stop offset="1" stop-color="#242c50"/></radialGradient><linearGradient id="glass" x2="1" y2="1"><stop stop-color="#b29aff" stop-opacity=".16"/><stop offset="1" stop-color="#77f3c0" stop-opacity=".025"/></linearGradient></defs>`;
  mesh += `<ellipse cx="930" cy="330" rx="112" ry="15" fill="#060a15" opacity=".6"/><circle cx="930" cy="215" r="147" fill="none" stroke="#98a7d4" stroke-opacity=".12"/><ellipse cx="930" cy="215" rx="170" ry="57" transform="rotate(-28 930 215)" fill="none" stroke="#81e2b6" stroke-opacity=".17" stroke-dasharray="2 9"/>`;
  for (const face of [
    [0, 1, 2],
    [0, 2, 3],
    [0, 3, 4],
    [0, 4, 1],
    [1, 2, 3, 4],
  ]) {
    mesh += `<polygon points="${pointList(face, 0)}" fill="url(#glass)">${animate("points", Array.from({ length: frames }, (_, f) => pointList(face, f)).join(";"))}</polygon>`;
  }
  for (let a = 0; a < 5; a++)
    for (let b = a + 1; b < 5; b++) {
      const p = motion[a][0],
        q = motion[b][0];
      mesh += `<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" stroke="url(#line)" stroke-width="1.3" opacity=".6">${animate("x1", values(a, "x"))}${animate("y1", values(a, "y"))}${animate("x2", values(b, "x"))}${animate("y2", values(b, "y"))}${animate("opacity", motion[a].map((p, f) => (0.5 - (p.z + motion[b][f].z) / 650).toFixed(2)).join(";"))}</line>`;
    }
  const labels = [
    ["AGENTS", 930, 91, 0],
    ["EVIDENCE", 741, 150, 1],
    ["EVALUATE", 1110, 174, 2],
    ["SHIP", 1043, 331, 3],
    ["HUMAN REVIEW", 779, 335, 4],
  ];
  for (const [, x, y, i] of labels) {
    const p = motion[i][0];
    mesh += `<line x1="${x}" y1="${y + 8}" x2="${p.x}" y2="${p.y}" stroke="#8c9cab" stroke-opacity=".28" stroke-width=".8" stroke-dasharray="2 4">${animate("x2", values(i, "x"))}${animate("y2", values(i, "y"))}</line>`;
  }
  for (let i = 0; i < 5; i++) {
    const p = motion[i][0];
    mesh += `<circle cx="${p.x}" cy="${p.y}" r="${p.r + 5}" fill="none" stroke="#81eec1" stroke-opacity=".19">${scalar(i, "x")}${scalar(i, "y")}${animate("r", motion[i].map((p) => (p.r + 5).toFixed(2)).join(";"))}</circle><circle cx="${p.x}" cy="${p.y}" r="${p.r}" fill="url(#sphere)" opacity="${p.opacity}">${scalar(i, "x")}${scalar(i, "y")}${scalar(i, "r")}${scalar(i, "opacity")}</circle>`;
  }
  mesh += `<g font-family="Arial,Helvetica,sans-serif" font-size="11" letter-spacing="1.5" fill="#d9dfef">${labels.map(([label, x, y]) => `<text x="${x}" y="${y}" text-anchor="middle">${label}</text>`).join("")}</g>`;
  const hero = `<defs><linearGradient id="line" x2="1" y2="1"><stop stop-color="#b49aff"/><stop offset="1" stop-color="#86efcf"/></linearGradient><radialGradient id="glow"><stop stop-color="#6653b6" stop-opacity=".3"/><stop offset="1" stop-color="#10121c" stop-opacity="0"/></radialGradient><pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#92e6bb" opacity=".12"/></pattern></defs><rect width="1200" height="400" rx="24" fill="#10121c"/><ellipse cx="920" cy="180" rx="490" ry="400" fill="url(#glow)"/><rect width="1200" height="400" rx="24" fill="url(#grid)"/><path d="M70 82H1130" stroke="#353347"/><g font-family="Arial,Helvetica,sans-serif"><text x="70" y="55" fill="#b5a1ed" font-size="13" letter-spacing="3">BUILDING THE SIGNAL</text><text x="1130" y="55" text-anchor="end" fill="#b0b4c5" font-size="13" letter-spacing="1.5">KOLKATA, INDIA / OPEN TO THE WORLD</text><text x="65" y="175" font-size="82" font-weight="700" letter-spacing="-4" fill="#f4f2ff">Saurav</text><text x="65" y="263" font-size="82" font-weight="700" letter-spacing="-4" fill="url(#line)">Mukherjee.</text><text x="70" y="310" font-size="18" fill="#c1c2d2">AI engineer. Product builder. Community builder.</text><circle cx="77" cy="354" r="5" fill="#86efcf"/><text x="94" y="359" font-size="14" fill="#c8ccdb">AI Engineer @ EY</text><text x="945" y="374" text-anchor="middle" fill="#a9a4bd" font-size="11" letter-spacing="1.8">IDEAS INTO SYSTEMS. SYSTEMS INTO IMPACT.</text></g>${mesh}`;
  const heroSvg = wrap(
    hero,
    "Saurav Mukherjee — rotating 3D network of evidence, agents, evaluation, human review, and delivery",
    1200,
    400,
  );
  writeFileSync(new URL("hero.svg", dir), heroSvg);
  writeFileSync(
    new URL("hero-static.svg", dir),
    heroSvg.replace(/<animate\b[^>]*\/>/g, ""),
  );
  writeFooter(dir);
  writeSocials(dir);
}

function writeFooter(dir) {
  const letters = {
    L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
    E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
    T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
    "'": ["00100", "00100", "01000", "00000", "00000", "00000", "00000"],
    S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
    B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
    U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
    I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
    D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  };
  let dots = "";
  for (const [c, char] of [..."LET'S BUILD"].entries())
    for (let y = 0; y < 7; y++)
      for (let x = 0; x < 5; x++) {
        const on = letters[char]?.[y]?.[x] === "1";
        const col = c * 6 + x;
        dots += `<circle cx="${64 + col * 8}" cy="${92 + y * 9}" r="${on ? 2.7 : 1.3}" fill="${on ? "#73f7a5" : "#244135"}" opacity="${on ? ".85" : ".6"}">${on ? `<animate attributeName="opacity" values=".55;1;.55" dur="8s" begin="${(col * 0.07).toFixed(2)}s" repeatCount="indefinite"/>` : ""}</circle>`;
      }
  const content = `<defs><radialGradient id="green"><stop stop-color="#15563f" stop-opacity=".35"/><stop offset="1" stop-color="#0d1519" stop-opacity="0"/></radialGradient><linearGradient id="rule"><stop stop-color="#6df3a0"/><stop offset=".5" stop-color="#78dfce"/><stop offset="1" stop-color="#b29aff"/></linearGradient></defs><rect x=".5" y=".5" width="1199" height="259" rx="20" fill="#0d1519" stroke="#2b3e3c"/><ellipse cx="330" cy="125" rx="350" ry="180" fill="url(#green)"/><path d="M40 1H1160" stroke="url(#rule)" stroke-width="2"/><path d="M635 42V215" stroke="#314640"/>${dots}<g font-family="Arial,Helvetica,sans-serif"><text x="64" y="53" font-size="11" letter-spacing="2" fill="#99b8ac">THE NEXT SIGNAL STARTS WITH A CONVERSATION</text><text x="64" y="191" font-size="12" letter-spacing="2.5" fill="#8bdcb3">AI. PRODUCTS. OPEN SOURCE.</text><text x="64" y="228" font-size="13" fill="#92a8a5">Saurav Mukherjee / Kolkata, India</text><text x="687" y="102" font-size="33" font-weight="700" letter-spacing="-1" fill="#effaf3">Bring the problem.</text><text x="687" y="145" font-size="29" letter-spacing="-1" fill="#9be6c1">Let's shape the system.</text><text x="687" y="201" font-size="15" fill="#a6b9b3">Connect using the links below.</text><text x="1115" y="215" font-size="34" fill="#8af6af">↗</text></g>`;
  const svg = wrap(
    content,
    "Let's build — animated green dot-matrix lettering and an invitation to collaborate",
    1200,
    260,
  );
  writeFileSync(new URL("footer.svg", dir), svg);
  writeFileSync(
    new URL("footer-static.svg", dir),
    svg.replace(/<animate\b[^>]*\/>/g, ""),
  );
}

function writeSocials(dir) {
  const icons = JSON.parse(
    readFileSync(new URL("social-icons.json", dir), "utf8"),
  );
  const socials = [
    ["portfolio", "Portfolio", "#a7f3d0"],
    ["linkedin", "LinkedIn", "#9bc5ff"],
    ["github", "GitHub", "#ded8ff"],
    ["gmail", "Email", "#f4b6c8"],
    ["instagram", "Instagram", "#f6a8d8"],
    ["x", "X / Twitter", "#e5e7eb"],
    ["youtube", "YouTube", "#ff8d91"],
    ["telegram", "Telegram", "#83d8ff"],
    ["discord", "Discord", "#b3b5ff"],
  ];
  for (const [id, label, color] of socials) {
    const content = `<rect x=".5" y=".5" width="131" height="39" rx="9" fill="#151a24" stroke="#354052"/><g transform="translate(13 10) scale(.8)" fill="${color}" color="${color}">${icons[id]}</g><text x="42" y="25" font-family="Arial,Helvetica,sans-serif" font-size="12" font-weight="600" fill="#e6eaf2">${label}</text>`;
    writeFileSync(
      new URL("social-" + id + ".svg", dir),
      wrap(content, label, 132, 40),
    );
  }
}
