# Badge deployment notes

LUMEN's current deliverable is the browser emulator. The web build is **not**
installable on the physical badge: the Universe 2026 badge runs MicroPython
with Badgeware, whereas the emulator uses TypeScript, React, and Vite.

## Verified app format

The official 2026 app layout is a directory under `/system/apps/` containing
an `__init__.py` and optional assets. The menu discovers apps containing
`__init__.py` or `__init__.mpy`; a custom menu icon may be a 24×24 PNG.
Badgeware supplies `badge`, `screen`, `image`, `font`, `color`, shape and
geometry helpers, button constants, and the `run(update)` loop in app context.
Use official `badge/apps` examples as executable API references.

Persistent application data belongs in `/state` (the Badgeware `State` helper
is documented in the official repository). Do not write runtime progress into
the checked-in source tree or store Wi-Fi credentials in LUMEN content.

## Installation path

The documented workflow uses a connected badge and `mpremote` for REPL and
filesystem inspection. On the tested 2026 firmware `/system` is read-only in
normal REPL mode. For persistent installation, enter USB mass-storage mode,
copy the complete app directory into the mounted `apps/` directory, eject
cleanly, and reset. Confirm the installed firmware and available storage before
following device-specific instructions.

The current repository does not yet include a `badge/apps/lumen` app,
deployment script, or physical-device test. Implement those only after the
core contract and rendering have been ported and the target firmware is
available.

## References

- [Official 2026 app overview](https://github.com/badger/home#creating-a-2026-app)
- [Official USB/REPL and mass-storage workflow](https://github.com/badger/home/blob/main/hardware/USB_SERIAL.md)
- [Badgeware API documentation](https://badgewa.re/docs)
