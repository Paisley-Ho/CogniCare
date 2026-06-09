# CogniCare Mobile

CogniCare Mobile is an Expo SDK 56 app for patient and family cognitive health follow-up.

## Requirements

- Git
- Node.js `22.13.x` or newer in the Node 22 line
- npm, included with Node.js
- Expo Go, Android Studio emulator, iOS Simulator, or a browser

Expo SDK 56 uses React Native `0.85`, React `19.2.3`, and minimum Node.js `22.13.x`.

## First Run

1. From the repository root, enter this app directory.

   ```bash
   cd "CogniCare Mobile"
   ```

2. Install dependencies exactly from `package-lock.json`.

   ```bash
   npm ci
   ```

3. Start Expo.

   ```bash
   npx expo start
   ```

4. Choose a target from the terminal:

   - Press `a` for Android emulator.
   - Press `i` for iOS Simulator on macOS.
   - Press `w` for web.
   - Scan the QR code with Expo Go on a physical device.

## Scripts

```bash
npm run start
npm run android
npm run ios
npm run web
npm run lint
```

## Project Structure

- `src/app/`: Expo Router screens and layouts
- `src/components/`: reusable UI components
- `src/data/`: local and network data sources
- `src/repository/`: repository layer used by screens and hooks
- `src/hooks/`: feature hooks
- `assets/`: app icons and images

## Ignored Local Files

Do not commit these generated folders:

- `node_modules/`
- `.expo/`
- `dist/`

They are recreated by `npm ci`, `npx expo start`, or build/export commands.

## Troubleshooting

Clear Expo cache:

```bash
npx expo start -c
```

Check Expo dependency compatibility:

```bash
npx expo install --check
```

Run lint:

```bash
npm run lint
```

If install or startup fails, first confirm that the terminal is inside `CogniCare Mobile/` and that Node.js is `22.13.x` or newer in the Node 22 line.
