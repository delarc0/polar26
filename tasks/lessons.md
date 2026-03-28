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
