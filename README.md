# quicknotes-app
# QuickNotes

QuickNotes is a lightweight browser-based note-taking app. You can add short
notes, tag them with a category (Personal, Work, or Study), search through
them as you type, and delete notes you no longer need. Everything is stored
in your browser's localStorage, so your notes survive a page refresh.

## Features

- Add notes up to 200 characters with a category
- Categories with distinct colour coding (Personal, Work, Study)
- Delete individual notes
- Live search across all notes (case-insensitive)
- Note count message that reads correctly for zero, one, and many notes
- Notes persist across page reloads via localStorage
- Responsive layout that stacks on mobile screens

## How to run locally

1. Clone the repository:
   `git clone https://github.com/eugineomondi/quicknotes-app
2. Open the folder in VS Code.
3. Right-click `index.html` and choose **Open with Live Server**.
4. The app opens in your browser at http://127.0.0.1:5500/

You can also just double-click `index.html` to open it directly.

## What I learned

- How to structure a small app with semantic HTML and keep the DOM clean.
- How to build UI from data with `createElement` and `textContent` instead of `innerHTML`.
- How to use `localStorage` with `JSON.stringify` and `JSON.parse` to persist state.
- How to use event delegation to handle clicks on dynamically created buttons.
- How Flexbox and media queries make a form usable on both desktop and mobile.