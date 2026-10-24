# Profile visual assets

- `hero.svg` and the six project cards are original, code-native SVG artwork. Regenerate them with `node scripts/build-profile-assets.mjs` (Node.js, no dependencies). Text, gradients, and geometry remain editable. The hero has a reduced-motion style for its subtle status pulse.
- `typing.svg` was generated with [DenverCoder1/readme-typing-svg](https://github.com/DenverCoder1/readme-typing-svg) (MIT). It uses original profile copy, a local dark background, and a system monospace font; the generated embedded font was removed. The SVG includes its animation and makes no network requests. Upstream license: `LICENSE.readme-typing-svg`.
- `footer.svg` was generated with [kyechan99/capsule-render](https://github.com/kyechan99/capsule-render) (MIT): `type=waving`, `section=footer`, `height=90`, gradient `0:9B7BFF,50:5368E8,100:7CE5CF`. Upstream license: `LICENSE.capsule-render`.
- `stack.svg` was generated with [tandpfun/skill-icons](https://github.com/tandpfun/skill-icons) (MIT), using `py,ts,react,nextjs,fastapi,pytorch,azure,aws,docker,terraform,postgres,git`, dark theme, twelve icons per line. Upstream license: `LICENSE.skill-icons`. Technology marks belong to their respective owners; no endorsement is implied.
- Navigation badges are served by [Shields](https://github.com/badges/shields). Ordinary text links remain available throughout the profile.
- Layout references: [awesome-github-profile-readme](https://github.com/abhisheknaiidu/awesome-github-profile-readme). No other person's biography, achievements, or project descriptions were copied.

All generated SVG assets are committed locally, contain no scripts or foreignObject elements, and need no credentials or scheduled workflows. Existing profile artwork and Git history are retained.

Project descriptions were checked against the public repositories. Career and community details were cross-checked with Saurav's portfolio and resume. CodeIN figures describe historical community milestones and its preserved contributor baseline, rather than live counters. SwaPilot is presented as a product direction with a pilot/demo repository; HealthAI is presented as educational research.
