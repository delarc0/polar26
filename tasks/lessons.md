# Lessons Learned

## 2026-03-28: Navigation crash debugging

### The actual bug
**Root cause:** `ScrollTrigger.pin: true` in PhotoGrid reparents the DOM element into a wrapper div. When React unmounts during Next.js route navigation, it calls `removeChild` on the original parent, but GSAP already moved the node. This throws `NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node` and crashes the Next.js router.

**Fix:** Change `useEffect` to `useLayoutEffect` for any GSAP context that uses `pin: true`. `useLayoutEffect` cleanup runs synchronously before React's DOM cleanup, so `ctx.revert()` restores the DOM structure before React tries to remove elements.

### Rule: GSAP pin + React = useLayoutEffect
Any component using `ScrollTrigger` with `pin: true` MUST use `useLayoutEffect` (not `useEffect`) for setup and cleanup. The pin operation reparents DOM nodes, which conflicts with React's virtual DOM reconciliation during unmount.

### Mistakes made (in order)
1. **Guessed instead of reproducing.** Spent many iterations guessing causes (Lenis double-rAF, missing ScrollTrigger cleanup, middleware deprecation, CSP headers, cache staleness) without ever seeing the actual error message. Each guess led to a commit and push that didn't fix the problem.

2. **Treated symptoms, not root cause.** Added `autoRaf: false` to Lenis, added `ScrollTrigger.refresh()` on route change, migrated middleware to proxy, added error boundaries -- all reasonable improvements but none addressed the actual crash.

3. **Didn't use browser automation from the start.** The bug was trivially reproducible with Puppeteer. Running a headless browser and capturing `pageerror` events immediately revealed the exact error: `removeChild` failure. Should have done this FIRST.

4. **Over-relied on server-side checks.** Used `WebFetch` and `curl` to verify pages loaded, but those only test SSR. The bug was purely client-side during SPA navigation. Server-side rendering was never the issue.

5. **Accumulated unnecessary commits.** Pushed 5+ "fix" commits that didn't fix anything, polluting git history and wasting the user's time waiting for deploys.

### Process rules for next time
- **ALWAYS reproduce first.** Before proposing any fix for a client-side bug, use Puppeteer/Playwright to capture the actual error. `pageerror` event gives the exact exception.
- **GSAP + React unmount = danger zone.** Any GSAP operation that modifies DOM structure (pin, reparent, insertBefore) MUST use `useLayoutEffect` so cleanup happens before React's reconciliation.
- **One fix, one verify, then push.** Don't push speculative fixes. Reproduce locally, fix, verify locally, THEN push.
- **Don't chase multiple theories in parallel.** Pick the most likely cause, test it, and only move on if disproven. Going wide wastes time.

### Logo transparency fix (same session)
- ffmpeg `colorkey` filter is unreliable for removing white backgrounds from logos with complex colors/gradients
- Pillow luminance-to-alpha conversion (grayscale -> invert -> alpha channel) works much better for converting any-color logos to white-on-transparent

## 2026-09-14: Reduced-motion reveal audit

### The lesson: reproduce before believing a plausible mechanism
The bug report was mechanically sound and pointed at `hooks/useScrollReveal.ts`:
it hides with `gsap.set({opacity: 0})` and un-hides with a tween, and
`gsap.globalTimeline.pause()` under `prefers-reduced-motion` stops the tween.
The reasoning was right about the cause and wrong about the victim. A paused
global timeline swallows `gsap.set()` too, so the hook's targets never got
hidden in the first place. The hook was fine, accidentally.

What was actually broken: four components that hide with a bare `opacity-0`
Tailwind class in the markup, which no paused timeline can swallow. Plus a
pillar counter left showing a full-opacity white `00`, invisible to an
"is anything at opacity 0" search and only found by reading the code around it.

Puppeteer with `emulateMediaFeatures` found all of this in one pass, and a
normal-motion run of the same probe separated the real regressions from the
hover-revealed labels that are supposed to be hidden at rest.

### Rules
- **Run the probe in both states.** Hidden-under-reduced-motion means nothing
  on its own. Diff it against normal motion or you will chase hover states.
- **A global animation kill switch is a trap.** Silencing tweens does not undo
  the DOM they were going to change. Reduced motion belongs at each call site,
  which is responsible for leaving its element in the final, visible state.
- **Never hide content with a bare `opacity-0` and un-hide it in JS.** Use a
  start-state class that resolves to visible under reduced motion
  (`.reveal-init` in `globals.css`), so CSS alone keeps the content readable.
- **Check the end state, not just visibility.** An element the reveal was
  supposed to dim, resize or fill with text also needs its final value when the
  animation is skipped.
