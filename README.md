# BTC DCA Tracker

A mobile app to track your Bitcoin Dollar-Cost Averaging (DCA) purchases. Monitor P&L, ROI, and portfolio performance across multiple currencies with live BTC prices.

Built with **React Native + Expo**.

---

## Screenshots

| Home Dashboard | Add Purchase | Settings |
|---|---|---|
| ![Home](docs/screenshots/home.png) | ![Add](docs/screenshots/add.png) | ![Settings](docs/screenshots/settings.png) |

| Import CSV | Edit Purchase | DCA Chart |
|---|---|---|
| ![Import](docs/screenshots/import.png) | ![Edit](docs/screenshots/edit.png) | ![Chart](docs/screenshots/chart.png) |

> Screenshots taken on Android. Add yours to `docs/screenshots/`.

---

## Features

### Dashboard
- **P&L card** — total profit/loss in your display currency (green/red)
- **Stats cards** — total invested, total BTC, ROI %, average buy price
- **Multi-currency breakdown** — per-currency summary when purchases span multiple currencies
- **DCA chart** — visualize portfolio growth over time
- **BTC goal card** — track progress toward a BTC target
- **Purchase list** — sortable (newest/oldest), filterable (positive/negative P&L)
- Export all purchases to CSV
- Delete all data

### Add / Edit Purchase
- Date picker
- 11 supported currencies: CHF, USD, EUR, GBP, CAD, AUD, JPY, SEK, NOK, DKK, RUB
- Amount invested, buy price, fee, optional note
- Live BTC amount preview
- Input validation

### CSV Import
- **Standard format**: `boughtAt,amount,buyPrice,fee,currency,note`
- **Kraken export**: auto-detects BTC/* pairs and extracts currency
- Download example CSV template in-app

### Settings
- **Language**: French, English, German, Spanish, Russian
- **Display currency**: 11 options
- **BTC goal**: set and track a target BTC amount
- **DCA reminders**: daily / weekly / monthly push notifications (requires dev build, not Expo Go)

### Data & Privacy
- All data stored locally in **SQLite** — no account, no cloud sync
- Live BTC prices from [CoinGecko API](https://www.coingecko.com/) (fallback prices if offline)

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | React Native + Expo 54 |
| Navigation | Custom stack (App.tsx) |
| Database | expo-sqlite (SQLite, v2 schema) |
| Styling | NativeWind (Tailwind CSS) |
| Charts | react-native-gifted-charts |
| CSV parsing | papaparse |
| HTTP | axios |
| Notifications | expo-notifications |
| Internationalisation | Custom i18n (5 languages) |

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- Android Studio (for local Android builds) or Expo account (for EAS builds)

### Install & Run

```bash
git clone https://github.com/thomaslc66/btc-dca-tracker.git
cd btc-dca-tracker
npm install
npm start          # Expo Dev Server
npm run android    # Android emulator
npm run ios        # iOS simulator (macOS only)
```

---

## Build APK (Android)

Two approaches: **EAS Build** (cloud, recommended) or **Local prebuild** (requires Android Studio).

---

### Option 1 — EAS Build (Cloud) ✅ Recommended

No Android Studio needed. Builds run on Expo's servers.

#### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

#### 2. Login to Expo
```bash
eas login
```

#### 3. Configure EAS
```bash
eas build:configure
```
This creates `eas.json` in your project root. Edit it to add a `preview` profile for APK:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

#### 4. Build APK
```bash
eas build --platform android --profile preview
```

EAS will output a download link when the build completes (~10–15 min).

---

### Option 2 — Local Build (Android Studio)

Requires Android Studio with Android SDK installed.

#### 1. Prebuild native project
```bash
npx expo prebuild --platform android
```
This generates the `android/` folder.

#### 2. Build debug APK
```bash
cd android
./gradlew assembleDebug
```
APK output: `android/app/build/outputs/apk/debug/app-debug.apk`

#### 3. Build release APK
```bash
./gradlew assembleRelease
```
APK output: `android/app/build/outputs/apk/release/app-release.apk`

> **Note:** Release builds require a signing keystore. Generate one:
> ```bash
> keytool -genkey -v -keystore btc-dca-tracker.keystore -alias btc-dca-tracker -keyalg RSA -keysize 2048 -validity 10000
> ```
> Then configure it in `android/app/build.gradle` under `signingConfigs`.

---

## Project Structure

```
btc-dca-tracker/
├── App.tsx                   # Entry point + navigation
├── app.json                  # Expo config
├── src/
│   ├── screens/              # 5 screens
│   │   ├── HomeScreen.tsx
│   │   ├── AddPurchaseScreen.tsx
│   │   ├── EditPurchaseScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── ImporCsvcreen.tsx
│   ├── components/           # Reusable UI components
│   │   └── dashboard/        # Dashboard cards + chart
│   ├── db/                   # SQLite schema + queries
│   ├── services/             # CoinGecko API, exchange rates, notifications
│   ├── hooks/                # useDashboard (core data hook)
│   ├── contexts/             # Currency, BTC goal, i18n
│   ├── utils/                # CSV parsing, calculations, formatting
│   ├── types/                # TypeScript types
│   └── constants/            # Theme
├── assets/                   # Icons, splash screen
└── kraken_example.csv        # Example Kraken CSV for import
```

---

## Database Schema

### `purchases`
| Column | Type | Description |
|---|---|---|
| id | INTEGER PK | Auto-increment |
| boughtAt | TEXT | ISO date (YYYY-MM-DD) |
| amount | REAL | Amount invested in currency |
| buyPrice | REAL | BTC price at purchase |
| btcAmount | REAL | BTC received |
| fee | REAL | Transaction fee |
| currency | TEXT | e.g. CHF, USD |
| note | TEXT | Optional note |

### `settings`
Key-value store for app state (language, goal, reminder config).

---

## License

MIT
