# Yarn Stash Yardage Calculator

A fast, no-nonsense tool for knitters and crocheters to check if they have enough yarn for a project.

**Live at:** [vibedev-g5topycd.vercel.app](https://vibedev-g5topycd.vercel.app)

## What it does

Enter your yarn skeins (name, yards per skein, quantity) and a target project yardage. The app instantly tells you:

- **Green** — you have enough yarn
- **Yellow** — you're within 10% of enough
- **Red** — you need more yarn

Plus the exact yardage difference.

## Features

- Add multiple skein entries with inline editing
- Delete entries you no longer need
- Instant yardage totals and status
- No page reloads, no backend, no login
- Responsive — works on phone and desktop
- Accessible — status uses text + color, not color alone

## Stack

- HTML
- Tailwind CSS (CDN)
- Alpine.js (CDN)
- Vanilla JavaScript

No build process. No dependencies to install.

## Usage

1. Open `index.html` in a browser
2. Add your skeins (name, yards per skein, how many)
3. Enter the yardage your project requires
4. Read the result instantly

Edit or delete any skein as your stash changes.
