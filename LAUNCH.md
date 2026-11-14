# Emulator Launch Guide

Quick guide to run this app on the **Pixel_9** Android emulator.

## One-command launch (recommended)

From the project root in PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\launch-android.ps1
```

This script will:

1. Use SDK `V:\sdk` and AVD `V:\.android\avd\Pixel_9`
2. Start the emulator if it is not already running
3. Set Private DNS to `dns.google` (fixes common emulator DNS failures)
4. Map the project to `R:\` (avoids Windows path-length build errors)
5. Start Metro on port `8081`
6. Build/install/run the app

### Important: use the real SDK (`V:\sdk`)

If your terminal has `ANDROID_HOME=C:\BuildTools\sdk`, launch will fail because that folder has **no** `emulator.exe`.

Set permanently (then open a **new** terminal):

```powershell
setx ANDROID_HOME "V:\sdk"
setx ANDROID_SDK_ROOT "V:\sdk"
setx ANDROID_AVD_HOME "V:\.android\avd"
```

Or only for the current terminal:

```powershell
$env:ANDROID_HOME = "V:\sdk"
$env:ANDROID_SDK_ROOT = "V:\sdk"
$env:ANDROID_AVD_HOME = "V:\.android\avd"
$env:ANDROID_AVD_NAME = "Pixel_9"
$env:JAVA_HOME = "C:\Users\akunb\.jdks\jbr-17.0.14"
```

The launch script now auto-picks the first SDK that contains `emulator.exe` (prefers `V:\sdk` when env points to a broken SDK).

Or via npm:

```powershell
npm run launch:android
```

## Manual launch (step by step)

### 1) Set env vars (current terminal only)

```powershell
$env:ANDROID_HOME = "V:\sdk"
$env:ANDROID_SDK_ROOT = "V:\sdk"
$env:ANDROID_AVD_HOME = "V:\.android\avd"
$env:JAVA_HOME = "C:\Users\akunb\.jdks\jbr-17.0.14"
$env:Path = "V:\sdk\emulator;V:\sdk\platform-tools;$env:JAVA_HOME\bin;" + $env:Path
```

### 2) Start emulator

```powershell
emulator -avd Pixel_9 -gpu swiftshader_indirect -dns-server 8.8.8.8,1.1.1.1
```

Wait until `adb devices` shows `emulator-5554 device`.

### 3) Fix emulator DNS (if products fail to load)

```powershell
adb shell settings put global private_dns_mode hostname
adb shell settings put global private_dns_specifier dns.google
```

### 4) Use short path for builds

```powershell
subst R: "C:\Users\akunb\Downloads\consumer_products-utama"
cd R:\
```

### 5) Start Metro

```powershell
npm start
```

### 6) Run app (new terminal, still on `R:\`)

```powershell
$env:ANDROID_HOME = "V:\sdk"
$env:ANDROID_SDK_ROOT = "V:\sdk"
$env:JAVA_HOME = "C:\Users\akunb\.jdks\jbr-17.0.14"
$env:Path = "V:\sdk\platform-tools;$env:JAVA_HOME\bin;" + $env:Path
npx react-native run-android --active-arch-only --no-packager
```

## Login

- Demo account: `U` / `P`
- Or tap **Register** on the Login screen to create a new local user

## Common issues

| Problem | Fix |
|---------|-----|
| `Network request failed` on Products | Apply Private DNS steps above, then Retry |
| `Filename longer than 260 characters` | Always build from `R:\` via `subst` |
| Emulator not listed in `adb devices` | Wait for boot, or cold-start emulator again |
| Wrong SDK used | Ensure `ANDROID_HOME` / `ANDROID_SDK_ROOT` point to `V:\sdk` |

## Stop / clean

```powershell
adb emu kill
subst R: /d
```
