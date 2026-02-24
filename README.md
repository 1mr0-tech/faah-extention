```
██████╗  █████╗  █████╗ ██╗  ██╗    ██╗ ██╗
██╔════╝██╔══██╗██╔══██╗██║  ██║    ██║ ██║
█████╗  ███████║███████║███████║    ██║ ██║
██╔══╝  ██╔══██║██╔══██║██╔══██║    ╚═╝ ╚═╝
██║     ██║  ██║██║  ██║██║  ██║    ██╗ ██╗
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝ ╚═╝
```

**Get hit with the FAAH effect the moment your code breaks.** Hooks into VS Code's failure events — terminal exits, task failures, and diagnostic errors on save — so you never silently ship broken code.

---

## What it does

Faah listens for three types of failure:

| Trigger | What it catches |
|---|---|
| **Terminal exit** | Any command typed in the integrated terminal that exits with a non-zero code — `npm test`, `mvn test`, `jest`, `pytest`, `cargo test`, `tsc`, etc. |
| **Task failure** | VS Code tasks run via `tasks.json` or `Cmd+Shift+B` that exit with a non-zero code |
| **Diagnostic error on save** | TypeScript, ESLint, Pylance, or any language server that reports errors after you save a file |

A 2-second debounce prevents the sound from firing multiple times in quick succession.

---

## Installation

### From the VS Code Marketplace

1. Open VS Code
2. Go to the Extensions panel (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for **Faah**
4. Click **Install**

### From VSIX

```bash
code --install-extension faah-1.0.0.vsix
```

---

## Requirements

- **VS Code 1.93+** — required for the terminal trigger (shell integration)
- **macOS**: `afplay` — built in, no setup needed
- **Linux**: `mpg123` or `aplay` — install via your package manager (`apt install mpg123`)
- **Windows**: PowerShell with `System.Windows.Media.MediaPlayer` — available by default

### Shell integration (for terminal trigger)

VS Code enables shell integration automatically for `zsh`, `bash`, `fish`, and `PowerShell`. If the terminal trigger is not firing, confirm shell integration is active — you should see a small indicator at the left of each prompt line. If not, run:

`Cmd+Shift+P` → **Terminal: Configure Shell Integration**

---

## Commands

| Command | Description |
|---|---|
| `Faah: Enable` | Turn the sound on |
| `Faah: Disable` | Turn the sound off |
| `Faah: Show Logs` | Open the output panel to see what Faah is detecting in real time |

All commands are accessible via `Cmd+Shift+P` / `Ctrl+Shift+P`.

---

## License

MIT
