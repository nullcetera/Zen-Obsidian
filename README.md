# Zen Mode

An [iA Writer](https://ia.net/writer)-inspired distraction-free reading plugin for [Obsidian](https://obsidian.md).

One keystroke hides every UI element, enters fullscreen, and floats your note inside a focused reading card — then Escape brings everything back.

---

## Features

- Collapses sidebars and hides all chrome (ribbon, tabs, status bar, header)
- Switches the active note to preview/reading mode
- Floating card with a blurred backdrop — light and dark themes
- Smooth entrance animation
- Configurable card width, font size, and sidebar restore behavior
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

### Manual

1. Go to the [latest release](https://github.com/nullcetera/Zen-Obsidian/releases/latest) and download `main.js`, `styles.css`, and `manifest.json`.
2. In your vault, create the folder `.obsidian/plugins/zen-mode/`.
3. Copy the three downloaded files into that folder.
4. In Obsidian → **Settings → Community plugins**, disable Safe Mode and enable **Zen Mode**.

### BRAT (beta testing)

If you use the [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin:

1. Open BRAT settings → **Add Beta Plugin**.
2. Paste `https://github.com/nullcetera/Zen-Obsidian`.
3. Enable **Zen Mode** in Community plugins.

---

## Usage

| Action | Shortcut |
|--------|----------|
| Toggle Zen Mode | `Cmd/Ctrl + Shift + Z` |
| Exit Zen Mode | `Escape` |

You can also run **Toggle Zen Mode** from the Command Palette (`Cmd/Ctrl + P`).

---

## Settings

Open **Settings → Zen Mode** to configure:

| Setting | Default | Description |
|---------|---------|-------------|
| Max card width | `1080` px | Maximum width of the floating reading card |
| Font size | `19` px | Body text size in the reading view |
| Restore sidebars on exit | `on` | Re-expand both sidebars when leaving Zen Mode |

---

## Development

```bash
git clone https://github.com/nullcetera/Zen-Obsidian.git
cd Zen-Obsidian
pnpm install
pnpm dev         # watch mode — rebuilds main.js on save
pnpm build       # production build (minified, no sourcemap)
pnpm lint        # ESLint
```

The compiled `main.js` is a build artifact and not tracked in git. Copy `main.js`, `styles.css`, and `manifest.json` into your vault's plugin folder to test locally.

---

## Compatibility

- Obsidian **1.4.0+**
- Desktop and mobile
