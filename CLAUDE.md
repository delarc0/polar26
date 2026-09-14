@AGENTS.md

## Git & Deployment

- **Git identity**: Erik <erik@lab37.io> — ALWAYS use `-c user.name="Erik" -c user.email="erik@lab37.io"` when committing
- **Remote**: `git@github.com:delarc0/polar26.git` (branch: master). SSH, via `~/.ssh/id_ed25519` as GitHub user `patriknordstrm-tech`. HTTPS does not authenticate: there is no github.com credential in the keychain
- **Deployment**: Vercel auto-deploys from GitHub on push to master
- **Live URL**: https://polar26.com
- **GitHub description**: Includes stack, features, live URL, and "Built by Erik at LAB37"
