# Consumer Products

A React Native shopping application for browsing products, managing a local cart, and completing checkout. Built with React Native CLI, React Navigation, SQLite, and secure credential storage.

| | |
|---|---|
| **Platform** | Android & iOS |
| **Framework** | React Native `0.88.1` / React `19.3.0` |
| **Language** | TypeScript / JavaScript (JSX) |
| **Node** | `>= 22.11.0` |
| **License** | MIT |

---

## Features

- **Authentication** — login + register (SQLite users), session via `react-native-keychain`
- **Product catalog** — 100+ unique products from [DummyJSON](https://dummyjson.com) + [Platzi Fake Store](https://api.escuelajs.co), rendered with `@shopify/flash-list`
- **Product detail** — view item information before adding to cart
- **Local cart** — cart data persisted with `react-native-sqlite-storage`
- **Checkout & success** — cart review and order confirmation screens
- **Profile** — placeholder profile screen
- **Shared state** — `AuthContext` and `CartContext` for auth and cart across screens

---

## Tech Stack

| Area | Libraries |
|------|-----------|
| UI | `react-native-paper`, `react-native-vector-icons` |
| Navigation | `@react-navigation/native`, `@react-navigation/stack` |
| Gestures / animation | `react-native-gesture-handler`, `react-native-reanimated`, `react-native-worklets`, `react-native-screens`, `react-native-safe-area-context` |
| Storage | `react-native-sqlite-storage`, `@react-native-async-storage/async-storage`, `react-native-keychain` |
| Networking | `axios`, `apisauce` |
| State | React Context (+ Redux packages available in dependencies) |
| Lists | `@shopify/flash-list` |
| Testing | Jest, `@testing-library/react-native` |
| Tooling | ESLint, Prettier, TypeScript |

---

## Project Structure

```text
.
├── App.tsx                 # App entry; mounts ShoppingApp
├── index.js                # React Native registry
├── app.json                # App display name
├── apps/
│   ├── ShoppingApp.jsx     # Root navigator + providers
│   ├── components/         # ProductItem, ProductDetail, CartFloatingView
│   ├── context/            # AuthContext, CartContext
│   ├── screens/            # Login, Home, Profile, Product, ProductDetail, Checkout, Success
│   └── service/            # SQLite database helpers and cart services
├── package.json
├── babel.config.js
├── metro.config.js
├── jest.config.js
└── tsconfig.json
```

### Screens

| Screen | Route name | Description |
|--------|------------|-------------|
| Login | `Login` | Credentials form; initializes the local database |
| Home | `Home` | Post-login home |
| Profile | `Profile` | User profile |
| Product | `Product` | Product list from Fake Store API |
| Product Detail | `ProductDetail` | Single product view |
| Cart / Checkout | `Cart` | Cart review and checkout |
| Success | `Success` | Order confirmation |

### Demo credentials

```text
Username: U
Password: P
```

You can also create a new account from the Login screen (**Register**). Users are stored locally in SQLite.

> Passwords are stored locally for demo purposes only — do not use this approach in production.

---

## Prerequisites

Complete the official [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) for your OS, including:

- Node.js `>= 22.11.0`
- JDK 17 (Android)
- Android Studio + SDK / emulator, **or** Xcode + CocoaPods (iOS, macOS only)
- Watchman (recommended on macOS)

---

## Emulator launch (Pixel_9)

Full guide: [LAUNCH.md](./LAUNCH.md)

One command:

```powershell
npm run launch:android
```

Or:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\launch-android.ps1
```

Demo login: `U` / `P` (or register a new user on the Login screen).

---

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. iOS pods (macOS only)

```bash
cd ios && pod install && cd ..
```

### 3. Start Metro

```bash
npm start
# or
yarn start
```

### 4. Run the app

In a second terminal:

```bash
# Android
npm run android

# iOS
npm run ios
```

You can also open the native projects in Android Studio or Xcode and run from there.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Metro bundler |
| `npm run android` | Build and launch on Android |
| `npm run ios` | Build and launch on iOS |
| `npm test` | Run Jest tests |
| `npm run lint` | Run ESLint |

---

## Development Notes

- Hot reload: press `R` twice on Android, or `Cmd + R` in the iOS Simulator. Open the developer menu with `Ctrl + M` (Windows/Linux) or `Cmd + M` (macOS).
- Product data is loaded from `https://fakestoreapi.com/products`.
- Cart/product rows are stored locally in SQLite (`products` table).
- Auth credentials are written to the device keychain on successful login.

---

## Troubleshooting

- Ensure environment setup matches the [React Native docs](https://reactnative.dev/docs/environment-setup).
- Clear Metro cache: `npx react-native start --reset-cache`
- Android build issues: clean with `cd android && ./gradlew clean`
- iOS build issues: reinstall pods (`cd ios && pod deintegrate && pod install`)
- See also: [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting)

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push the branch (`git push origin feature/your-feature`)
5. Open a pull request

---

## License

This project is licensed under the [MIT License](./LICENSE).
