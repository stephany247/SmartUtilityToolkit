# Smart Utility Toolkit

A clean, scalable mobile utility app built with React Native and Expo. Currently ships with a fully functional **Unit Converter** and a **Task Manager** — architected from the ground up to grow into a complete toolkit.

---

## Features

### Unit Converter
- **7 categories** — Length, Weight, Currency, Temperature, Volume, Speed, Area
- **30+ units** with accurate, formula-driven conversion logic
- **Swap** inputs with a single tap
- **Quick reference cards** per category for common conversions
- **Drag-to-close** bottom sheet unit picker (Reanimated 3 + Gesture Handler)
- Real-time results as you type

### Task Manager
- Create, edit, and delete tasks
- Mark tasks as completed
- Filter by All / Active / Completed
- Clear all completed tasks at once
- **Fully offline** — tasks persist locally via AsyncStorage
- Survives app restarts and device reboots

---

## Tech Stack

| | |
|---|---|
| Framework | React Native + Expo |
| Language | TypeScript |
| Animations | `react-native-reanimated` v3 |
| Gestures | `react-native-gesture-handler` |
| Safe Area | `react-native-safe-area-context` |
| Navigation | `@react-navigation/bottom-tabs` |
| Local Storage | `@react-native-async-storage/async-storage` |

---

## Project Structure

```
SmartUtilityToolkit/
├── App.tsx                          # Root — navigation, providers
└── src/
    ├── screens/
    │   ├── ConverterScreen.tsx      # Unit converter
    │   └── TasksScreen.tsx          # Task manager
    ├── components/
    │   ├── CategoryPill.tsx         # Category selector pill
    │   ├── ConvertField.tsx         # Input card with unit selector
    │   ├── UnitPicker.tsx           # Drag-to-close bottom sheet
    │   ├── QuickRefs.tsx            # Reference conversion grid
    │   └── TaskItem.tsx             # Single task row (toggle/edit/delete)
    ├── utils/
    │   ├── conversions.ts           # Pure conversion engine, zero UI deps
    │   └── taskStorage.ts           # AsyncStorage load/save helpers
    └── theme/
        └── index.ts                 # Colors, typography, spacing tokens
```

### Architecture

**MVVM-lite** — screens own state, components are dumb, logic is pure.

`conversions.ts` contains the entire conversion engine as pure TypeScript functions with no React or UI dependencies. This means:
- Easy to unit test in isolation
- Safe to reuse across future screens (e.g. a currency converter)
- No side effects — `convert(value, fromUnit, toUnit, category)` always returns the same result for the same inputs
- `taskStorage.ts` — thin AsyncStorage wrapper; screens call `loadTasks()` on mount and `saveTasks()` on every state change
- All persistence is handled offline with no network dependency


---

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your device, or an iOS/Android simulator

### Installation

```bash
# Clone the repo
git clone https://github.com/stephany247/SmartUtilityToolkit.git
cd SmartUtilityToolkit

# Install dependencies
npm install

# Start the dev server
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

### Install dependencies manually (if needed)

```bash
npx expo install @react-native-async-storage/async-storage
npx expo install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-gesture-handler react-native-reanimated
```

---

## Building for Submission

### APK (Android)

```bash
# With EAS Build (recommended)
eas build --platform android --profile preview
```

This produces an `.apk` you can upload directly to [Appetize.io](https://appetize.io) for a shareable preview link.

### iOS Simulator Build

```bash
npx expo run:ios
```

---

## Adding More Tools

The app is structured to scale. To add a new tool:

1. Create `src/screens/YourToolScreen.tsx`
2. Install bottom tab navigation:
   ```bash
   npx expo install @react-navigation/native @react-navigation/bottom-tabs
   ```
3. Wrap screens in a tab navigator in `App.tsx`

Each tool lives in its own screen folder and stays fully isolated.

---
