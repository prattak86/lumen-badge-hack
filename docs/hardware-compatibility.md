# GitHub Universe 2026 badge compatibility

**Research checked:** 2026-10-28  
**Status:** Research is based on the official `badger/home` repository and
Badgeware documentation. Physical-device behavior and firmware API details
must still be checked against the exact badge/firmware used for deployment.

## Verified platform

The Universe 2026 badge is a custom derivative of Pimoroni Tufty 2350, not an
electrically identical stock Tufty board. The official badge repository
describes the following:

| Capability | Verified details | LUMEN implementation status |
|---|---|---|
| MCU/runtime | RP2350B board; official app model is MicroPython with Badgeware globals | Future Python app; browser engine is TypeScript |
| Display | 320×240 full-colour LCD; common logical surface 160×120, optional 320×240 `HIRES \| VSYNC` mode | Emulator screen uses 320:240 aspect ratio |
| Memory | 16 MB QSPI flash and 8 MB PSRAM | Not yet measured for app budget |
| Persistent data | `/state` writable data filesystem; observed about 1 MiB total. Badgeware provides `State.load()` / `State.save()` | Browser local storage; badge adapter not implemented |
| Physical buttons | Five front logical actions: Up, Down, Left, Right, Select | Mock logical button events |
| Capacitive controls | Eight channels surfaced as logical Up, Down, Left, Right, Select, Back, Menu, Home; use `badge.touched()`, `pressed()`, `held()`, and `released()` | Mock touch/button events |
| Motion/orientation | LSM6DS3TR-C accelerometer and gyroscope; `badge.imu()`, `badge.direction()`, `badge.upside_down()` documented in source examples | Mock shake, tilt, rotate events |
| Infrared | Two IR transmit LEDs and a demodulating IR receiver are present | Mock transmit/receive events; no LUMEN protocol |
| Wireless | RM2 wireless module; upstream Tufty specs list 2.4 GHz Wi-Fi and Bluetooth 5.2 | Mock connectivity changes; no badge networking code |
| Case lighting | Four independently controlled white case LEDs, GPIO0–3 in the board reference | Mock LED behavior; app API not verified for this badge |
| Ambient light | PT19-21C/L41/TR8 phototransistor connected to ADC3 | Not used |
| Expansion | External Qw/ST I²C connector on GPIO4/5 | Not used |
| CPU performance | RP2350 platform; Badgeware overview describes dual-core ARM Cortex-M33 at 200 MHz | 2026 badge clock/configuration not independently measured; avoid CPU budget claims |

### Rendering constraints

The official 2026 app examples use `screen.width` and `screen.height`; most
apps use a 160×120 logical surface. `badge.mode(HIRES | VSYNC)` selects
320×240. The LCD is colour and its physical interface is an 8-bit parallel
bus. The sources checked do not specify an application-visible LCD color-depth
contract, so LUMEN must use Badgeware's color/graphics APIs rather than assume
raw framebuffer format. A compact vector/pixel-art renderer is appropriate;
the browser SVG is not intended to be shipped as-is.

### Input API shape

Official 2026 examples use logical constants such as `BUTTON_UP`,
`BUTTON_SELECT`, `BUTTON_BACK`, `BUTTON_MENU`, and `BUTTON_HOME`. Prefer
orientation-aware `badge` APIs; do not bind application behavior directly to
the physical switch labels, GPIO numbers, or capacitive channel numbers.
Motion values are exposed as six integer-like values, but the inspected
hardware reference does not establish their units, scale, filter, or sampling
configuration. Treat them as relative values unless firmware documentation
confirms more.

### Unknowns and restrictions

- The badge schematic and current repository document hardware, but do not by
  themselves guarantee every peripheral's stable application-level API.
- BLE support is listed by the upstream Tufty platform; the 2026 badge-specific
  application API and connection/discovery semantics were not verified.
- The badge repository says its upstream simulator does not model the 2026
  custom accelerometer, IR, capacitive inputs, or firmware APIs exactly.
- Do not infer IR framing, BLE protocol, case LED calls, or Wi-Fi behavior from
  hardware presence alone. Keep each behind an adapter and mock until tested
  on the actual badge.
- The official `badge/apps` APIs and board definitions are more authoritative
  than stock Tufty pin maps. Do not reconfigure onboard LCD, PSRAM, flash,
  wireless, internal I²C, or interrupt GPIOs from an app.

## References

- [GitHub Universe badge repository](https://github.com/badger/home) — 2026
  badge overview, app examples, hardware reference, and deployment guide.
- [2026 hardware reference](https://github.com/badger/home/blob/main/hardware/README.md)
  — schematic transcription and GPIO/peripheral details.
- [USB serial and MicroPython REPL](https://github.com/badger/home/blob/main/hardware/USB_SERIAL.md)
  — observed runtime, persistent storage, USB modes, and app installation.
- [Badgeware documentation](https://badgewa.re/docs) — common MicroPython
  graphics and badge APIs.
- [Tufty 2350 upstream specifications](https://shop.pimoroni.com/products/tufty-2350)
  — platform lineage; not a substitute for the custom Universe board reference.
