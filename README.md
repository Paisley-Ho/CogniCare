# CogniCare

CogniCare is a multi-platform cognitive health follow-up project. The current app is an Expo mobile app located in `CogniCare Mobile/`.

## Requirements

- Git
- Node.js `22.13.x` or newer in the Node 22 line
- npm, included with Node.js
- One of the following for previewing the app:
  - Expo Go on a physical Android or iOS device
  - Android Studio emulator
  - iOS Simulator on macOS
  - A desktop browser for the web preview

This project uses Expo SDK 56. Expo's SDK 56 documentation lists React Native `0.85`, React `19.2.3`, and minimum Node.js `22.13.x`.

## Run The Mobile App

1. Clone the repository.

   ```bash
   git clone <repository-url>
   cd CogniCare_Mobile
   ```

2. Enter the Expo app directory.

   ```bash
   cd "CogniCare Mobile"
   ```

3. Install dependencies from the lock file.

   ```bash
   npm ci
   ```

4. Start the Expo development server.

   ```bash
   npx expo start
   ```

5. Open the app from the Expo terminal menu.

   - Press `a` to open Android emulator.
   - Press `i` to open iOS Simulator on macOS.
   - Press `w` to open the web preview.
   - Scan the QR code with Expo Go to open on a physical device.

## Useful Commands

Run these commands from `CogniCare Mobile/`.

```bash
npm run start
npm run android
npm run ios
npm run web
npm run lint
```

## What Is Not Committed

The following folders are intentionally ignored and do not need to be uploaded to GitHub:

- `node_modules/`: installed dependencies, recreated by `npm ci`
- `.expo/`: local Expo cache and development state, recreated by Expo
- `dist/`: generated build output, recreated when building/exporting

## Troubleshooting

If dependencies install but Expo behaves strangely, clear the Expo cache:

```bash
npx expo start -c
```

If `npm ci` fails, make sure you are inside `CogniCare Mobile/` and using Node.js `22.13.x` or newer in the Node 22 line.

If a physical phone cannot connect to the development server, make sure the phone and computer are on the same network, or switch the Expo terminal connection mode to tunnel.
