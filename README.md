# Zen Mode

An [iA Writer](https://ia.net/writer)-inspired distraction-free reading plugin for [Obsidian](https://obsidian.md).

One keystroke hides every UI element, enters fullscreen, and floats your note inside a focused reading card — then Escape brings everything back.

---

## Features

- Collapses sidebars and hides all chrome (ribbon, tabs, status bar, header)
- Enters native fullscreen via Electron
- Switches the active note to preview/reading mode
- Floating card with a blurred backdrop — light and dark themes
- Smooth entrance animation
- Press **Escape** to exit at any time

---

## Screenshots

**Light mode**

```
┌─────────────────────────────────────────────────────────────┐
│  ░░░░░░░░░░░░░░ blurred off-white backdrop ░░░░░░░░░░░░░░░  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │   Your Note Title                                     │  │
│  │                                                       │  │
│  │   Body text in iA Writer Quattro, 19px / 1.9 lh.     │  │
│  │   Clean card on #FAFAF8 with a subtle teal border.   │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Dark mode**

```
┌─────────────────────────────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓ near-black glassmorphism backdrop ▓▓▓▓▓▓▓▓  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                                                       │  │
│  │   Your Note Title                                     │  │
│  │                                                       │  │
│  │   Text at rgba(255,255,255,0.82) on #1C1C1E card.    │  │
│  │   Deep shadow + hairline white rim.                  │  │
│  │                                                       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Installation

### Manual (recommended for now)

1. In your vault, open `.obsidian/plugins/` (create the folder if it doesn't exist).
2. Create a folder named `zen-mode`.
3. Copy `main.js` and `manifest.json` into it.
4. In Obsidian → **Settings → Community plugins**, disable Safe Mode and enable **Zen Mode**.

### BRAT (beta testing)

If you use the [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin:

1. Open BRAT settings → **Add Beta Plugin**.
2. Paste this repo's URL.
3. Enable the plugin in Community plugins.

---

## Usage

| Action | Shortcut |
|--------|----------|
| Toggle Zen Mode | `Cmd/Ctrl + Shift + Z` |
| Exit Zen Mode | `Escape` |

You can also run **Toggle Zen Mode** from the Command Palette (`Cmd/Ctrl + P`).

---

## Compatibility

- Obsidian **1.4.0+**
- Desktop only (requires Electron for fullscreen API)
