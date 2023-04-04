# React_Native

# Active Debug Menu without Shake

```bash
adb shell input keyevent KEYCODE_MENU
```

# Run in Production

```bash
npx react-native run-ios --configuration Release --device

react-native run-android --variant=release
```

# Make Bundle

IOS

OLD
```bash
react-native bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios'
```

NEW
```bash
react-native bundle --entry-file ./index.js --platform ios --bundle-output ios/main.jsbundle --assets-dest ios
```

Android 

OLD
```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

```

NEW
```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```
