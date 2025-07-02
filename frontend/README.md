# NeuroCare Mobile App

A mobile application built with Expo and React Native to support neurodiversity in Cameroon. This app provides resources, community support, activities, and services for families of neurodiverse children.

## Features

- **Home Screen:** Overview of app features and recommended content
- **Learn Screen:** Educational resources about neurodiversity
- **Community Screen:** Connect with other families and share experiences
- **Activities Screen:** Guided exercises for child development
- **Services Screen:** Find specialists and support services

## Tech Stack

- **Expo:** Framework for React Native development
- **Expo Router:** File-based routing for Expo apps
- **TypeScript:** Type-safe JavaScript
- **React Native:** Cross-platform mobile development

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/neurocare-app.git
cd neurocare-app
```
2. Install dependencies:

```
npm install
# or
yarn install
```

3. Start the development server:

```
npx expo start
```

4. Run on a device or emulator:

    - Press i to run on iOS simulator
    - Press a to run on Android emulator
    - Scan the QR code with the Expo Go app on your device

### Project Structure

```
neurocare-app/
├── app/                  # Main app directory (Expo Router)
│   ├── _layout.tsx       # Root layout
│   ├── (tabs)/           # Tab navigation
│   │   ├── _layout.tsx   # Tab layout
│   │   ├── home.tsx      # Home screen
│   │   ├── learn.tsx     # Learn screen
│   │   ├── community.tsx # Community screen
│   │   ├── activities.tsx # Activities screen
│   │   └── services.tsx  # Services screen
├── components/           # Reusable components
│   └── AppHeader.tsx     # Custom header component
├── constants/            # App constants
│   └── Colors.ts         # Color theme definitions
├── assets/               # Images and fonts
├── app.json              # Expo configuration
└── package.json          # Dependencies
```

### Customization
#### Changing Colors

Edit the constants/Colors.ts file to customize the app's color scheme:

```
typescriptCopy// Example: Changing the primary color
const tintColorLight = '#your-color-here';
const tintColorDark = '#your-dark-color-here';
```

#### Adding New Screens

1. Create a new file in the app/ directory or in a subdirectory
2. Export a React component as the default export
3. Access it via the file path in the URL

### Building for Production

#### iOS App

```
eas build -p ios
```

#### Android App

```
eas build -p android
```

For more detailed instructions on building and publishing, refer to the Expo documentation.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments

- Icons by Feather Icons
- Interface design inspired by modern mobile health application
