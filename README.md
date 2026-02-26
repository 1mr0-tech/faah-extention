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

| Event | Failure | Success |
|---|---|---|
| Build / test command in terminal | 💥 Faah | ⭐ Wow |
| VS Code task (`tasks.json`) | 💥 Faah | ⭐ Wow |
| `cd` into a non-existent folder | 💥 Faah | silence |
| Save a file with diagnostic errors | 💥 Faah | silence |

---

## Supported tools

### Build / test commands — Faah on failure, Wow on success

| Ecosystem | Commands |
|---|---|
| JavaScript / Node | `npm` `npx` `yarn` `pnpm` `bun` `bunx` `node` |
| Java / JVM | `mvn` `mvnw` `gradle` `gradlew` `java` `ant` |
| Python | `python` `python3` `pip` `pip3` `pytest` `tox` |
| Rust | `cargo` |
| Go | `go` |
| .NET | `dotnet` |
| Build tools | `make` `cmake` `ninja` |
| Ruby | `bundle` `rake` `rspec` |
| Docker | `docker` `docker-compose` `podman` |
| Cloud / Infra | `kubectl` `terraform` `ansible` |
| Test runners | `jest` `mocha` `vitest` `jasmine` |
| TypeScript | `tsc` `ts-node` |
| Swift / Xcode | `swift` `xcodebuild` |
| Elixir | `mix` |
| PHP | `composer` `phpunit` |

### Navigation commands — Faah on failure, silent on success

| Command | Example |
|---|---|
| `cd` | `cd nonexistent` → Faah, `cd existing` → silence |

All other shell commands (`ls`, `echo`, `mkdir`, `grep`, etc.) are ignored entirely.

---

## Installation

### From the VS Code Marketplace

1. Open VS Code
2. Go to the Extensions panel (`Cmd+Shift+X` / `Ctrl+Shift+X`)
3. Search for **Faah!**
4. Click **Install**

### From VSIX

```bash
code --install-extension faah-sound-1.3.0.vsix
```

---

## Requirements

- **VS Code 1.93+** — required for the terminal trigger (shell integration)
- **macOS**: `afplay` — built in, no setup needed
- **Linux**: `mpg123` or `aplay` — install via your package manager (`apt install mpg123`)
- **Windows**: PowerShell with `System.Windows.Media.MediaPlayer` — available by default

### Shell integration (for terminal trigger)

VS Code enables shell integration automatically for `zsh`, `bash`, `fish`, and `PowerShell`. You can confirm it's active by the small indicator at the left of each prompt line. If missing:

`Cmd+Shift+P` → **Terminal: Configure Shell Integration**

---

## Commands

| Command | Description |
|---|---|
| `Faah: Enable` | Turn sounds on |
| `Faah: Disable` | Turn sounds off |
| `Faah: Show Logs` | Open the output panel to see what Faah is detecting in real time |

All commands accessible via `Cmd+Shift+P` / `Ctrl+Shift+P`.

---

## License

MIT
