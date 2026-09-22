# Portfolio Design Audit

## 1. What looked weak before

The previous portfolio had strong content and working interactions, but the design language did not feel unified. The hero mixed a heavy sans-serif name with an unrelated italic serif treatment, the core technologies resembled input fields, and the main call to action carried too much visual weight. Surface treatments, radii, spacing, and motion were also defined locally rather than through a coherent system. This made the page feel assembled from individually styled sections instead of designed as one experience.

The project grid gave all four projects similar visual weight even though Image-to-3D and DataVeil have much stronger public evidence. Education also existed as a full section despite working better as supporting context within the About story.

## 2. Typography changes

The site now uses one primary family, Geist Sans, and one functional accent family, Geist Mono. No decorative serif is used.

Typography tokens now cover the hero, H1, H2, H3, large body copy, body copy, labels, buttons, and small text. Responsive `clamp()` values are used for the name and major headings. The name uses one weight and rhythm, with color—not a second font—to distinguish “ASLAH.” It remains on one line where space allows and moves to two matching lines on narrow screens.

## 3. Color system

The palette was rebuilt around warm neutral backgrounds, clean elevated surfaces, deep charcoal text, and one violet accent. Green is reserved for availability and success states. The dark theme uses the same semantic variables instead of introducing a separate visual language.

The active tokens are:

- `--background`
- `--surface`
- `--surface-elevated`
- `--text-primary`
- `--text-secondary`
- `--accent`
- `--accent-soft`
- `--border`
- `--success`

The result is warmer and more personal than a corporate blue template while remaining technical and accessible.

## 4. Hero redesign

The hero was rebuilt around “ASIM ASLAH” as the primary visual anchor. The role, availability state, concise introduction, inline technology list, and actions now follow a deliberate reading order. The primary “View projects” action and secondary “About me” action are compact, tactile controls rather than oversized banners.

The portrait was simplified into an offset editorial frame with a restrained status badge and technical caption. A low-opacity dot field and radial accent provide depth without competing with the text. The portrait is removed from the smallest layout so the essential story and actions fit naturally within the first mobile viewport.

## 5. Sound improvements

Sound remains opt-in, user-triggered, and persisted in local storage. The original Web Audio implementation was retained and refined rather than replaced with third-party assets.

The new sounds use short 45–110 ms envelopes, a main oscillator, a quiet overtone, and a low-pass filter. Per-sound source gains now sit in the 0.35–0.46 range, followed by a 0.46 master gain for comfortable perceived loudness and headroom. Buttons use a soft pop, navigation uses a small tick, theme changes use a descending click, and the mascot uses a brighter success chirp. No sound communicates required information.

The toggle now uses an animated three-wave indicator when enabled and a muted speaker icon when disabled.

## 6. Animation system

Shared timing tokens replace generic transitions:

- `--ease-out` for fast deceleration
- `--ease-in-out` for controlled state changes
- `--ease-spring` for tactile buttons, tags, and mascot reactions

Motion is attached to an interaction: buttons lift and compress, arrows translate, project screenshots gain subtle depth, skill tags bounce slightly, navigation indicators travel, and Byte reacts on hover or click. Reduced-motion preferences disable non-essential animation.

## 7. Sections removed or merged

- Education was merged into About as compact academic context.
- Skills moved after About and were redesigned as horizontal capability rows.
- Image-to-3D and DataVeil became large alternating featured stories.
- Velora and AI Virtual Keyboard moved into a smaller “More experiments” group.
- The standalone Education section was removed.
- The primary page narrative is now Hero, Selected Work, Experience, About, Skills, Contact.

## 8. Mobile improvements

The mobile container uses 20 px side padding at 375–430 px. The name breaks cleanly into two consistent lines, the primary and secondary actions remain content-sized, the technology list stays compact, and the portrait is omitted to avoid an excessively tall hero. Featured work stacks into a single readable story, project screenshots resize without horizontal scrolling, skill groups collapse into label-plus-tag rows, and controls retain at least 44 px touch targets.

## 9. Remaining incomplete content

The visual hierarchy now reflects evidence quality, but content gaps remain:

- specific Realviz / Brickrat responsibilities, technologies, and outcomes;
- public Velora source, screenshots, scope, and deployment;
- AI Virtual Keyboard source, visual proof, model/library details, and measurements;
- stable public demo URLs for Image-to-3D and DataVeil;
- reproducible project metrics;
- a resume aligned with the current role, experience, projects, and skills.

See `PORTFOLIO_CONTENT_NEEDED.md` for the exact information requested and safe publication guidance.
