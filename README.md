# ROBOTIC LEARNING APP

This is a Next.js application that has been integrated with Capacitor to support mobile platforms (Android). Follow the instructions below to clone, set up, and run the app on both your local machine and mobile device.

## Table of Contents

- [Requirements](#requirements)
- [Clone the Project](#clone-the-project)
- [Setting Up for Development](#setting-up-for-development)
  - [Install Dependencies](#install-dependencies)
  - [Run the Next.js Web App](#run-the-nextjs-web-app)
  - [Run the Mobile App](#run-the-mobile-app)
- [Mobile App Setup](#mobile-app-setup)
  - [Android Setup](#android-setup)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Requirements

Before setting up the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20.x or later)
- [npm](https://www.npmjs.com/) for managing dependencies
- [Git](https://git-scm.com/) for version control
- [Capacitor CLI](https://capacitorjs.com/docs/getting-started) (for mobile app setup)
- [Android Studio](https://developer.android.com/studio) (for Android app development)

---

## Clone the Project

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/11RothMony/robotic-components.git
cd robotic-components
```

## Setting Up for Development

### Install Dependencies

Run the following command to install all dependencies:

```bash
npm install
```

### Run the Next.js Web App

To start the Next.js web application, run the following command:

```bash
npm run dev
```

This will start the development server at http://localhost:3000

### Run the Mobile App

1. Install Mobile Dependencies

Before running the mobile app, make sure you have build next app

```bash
npm run build
```

After run build, sync your build code to android

```bash
npx cap sync android
```

To run the app on an Android emulator or connected device, use:

```bash
npx cap open android
```

This will open the Android project in Android Studio. From there, you can build and run the app on an emulator or connected device.

## Troubleshooting

If you encounter any issues with dependencies, try deleting node_modules and running npm install again

For Android build issues, ensure your Android Studio environment is properly configured

Make sure to run npx cap sync after making changes to the web app

## License

This project is licensed under the MIT License - see the LICENSE file for details.
