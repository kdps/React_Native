# Bookmark

## Tutorial

###### [README](#2.0)

###### [Active Debug Menu without Device Shake](#2.1)

###### [Run in Production](#2.2)

###### [Make Bundle](#2.3)

###### [Commands](#2.4)

## Issues

## [Javascript]

## [Android]

###### [Keyboard auto hide / Keyboard closes immediately once opened in TextInput](#1.2)   

###### [BUG! exception in phase 'semantic analysis' in source unit '_BuildScript_' Unsupported class file major version 61](#1.3)   

###### ['RNTimePicker' could not be found](#1.4)   

###### [Unresolved reference `resolveView` (Vision-Camera)](#1.5)  

###### [Module was compiled with an incompatible version of Kotlin. The binary version of its metadata is 1.6.0, expected version is 1.4.0.](#1.6)  

###### [Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module](#1.7)  

###### [CMake Error: The following variables are used in this project, but they are set to NOTFOUND. FBJNI_LIB, FOLLY_JSON_LIB, JSI_LIB](#1.8)   

###### [Could not find me.relex:photodraweeview:1.1.3](#1.9)   

###### [Failed to construct transformer: Error: error:0308010C:digital envelope routines::unsupported React Native](#1.10)   

###### [Failed to notify project evaluation listener > org.gradle.api.file.ProjectLayout.fileProperty](#1.11)   

###### [React Native : Error: Duplicate resources - Android](#1.12)   

###### [Attempt to invoke virtual method 'android.graphics.drawable.Drawable android.graphics.drawable.Drawable$ConstantState.newDrawable(android.content.res.Resources)' on a null object reference](#1.13)   

###### [Native module RNC_AsyncSQLiteDBStorage tried to override AsyncStorageModule. Chekc the getPackages() method in MainApplication.java](#1.14)   

###### [Native module ~~ tried to override ~~](#1.15)   

###### [annotation does not exist](#1.16)   

## [IOS]

###### [GDTCORPlatform.m:87:43 A function declaration without a prototype is deprecated in all versions of C](#3.2)   

###### [Type 'ChartDataSet' does not conform to protocol 'RangeReplaceableCollection'](#3.3)      

###### [“React/RCTEventDispatcherProtocol.h“ file not found](#3.4)      

###### [Error for only archive](#3.5)      

###### [cocoapods could not find compatible versions for pod reactcommon/callinvoker](#3.6)      

###### [Yoga.cpp:2285:9 Use of bitwise '|' with boolean operands](#3.7)      

###### ['React/RCTBridgeModule.h' file not found](#3.8)      

###### [IOS 14 Firebase Crash](#3.9)      

###### [database is locked Possibly there are two concurrent builds running in the same filesystem location.](#3.10)      

###### [duplicate symbols for architecture arm64](#3.11)      

###### [Couldn't create workspace arena folder '~': Unable to write to info file '~'](#3.12)      

###### [SIGABRT RCTModalHostViewController](#3.13)      

###### [XCode 14 Image not showing](#3.14)       

###### [react-native-modal-datetime-picker](#3.15)       

###### [Stored properties cannot be marked potentially unavailable with '@available'](#3.16)   




&nbsp;
&nbsp;
&nbsp;



# Sentry

Cannot remove sentry fucking shit




&nbsp;
&nbsp;
&nbsp;



# Javascript <a id='0.1'></a>

### Support for the experimental syntax 'decorators-legacy' isn't currently enabled
---

```bash
yarn add @babel/plugin-proposal-decorators
```

append to .babelrc or babel.config.js

```javascript
{
    "plugins": [
        [
           require(‘@babel/plugin-proposal-decorators’).default,
           {
              legacy: true
           }
        ],
    ]
}
```

# Android <a id='1.1'></a>

### Keyboard auto hide / Keyboard closes immediately once opened in TextInput <a id='1.2'></a>

```xml
android:windowSoftInputMode="stateAlwaysHidden|adjustPan"
```

### BUG! exception in phase 'semantic analysis' in source unit '_BuildScript_' Unsupported class file major version 61 <a id='1.3'></a>

```bash
distributionUrl => gradle-7.6-all.zip
```

### 'RNTimePicker' could not be found <a id='1.4'></a>
----

remove fucking `react-native-modal-datetime-picker` package

### Unresolved reference `resolveView` (Vision-Camera) <a id='1.5'></a>
----

findCameraView

```java
private fun findCameraView(viewId: Int): CameraView {
    Log.d(TAG, "Finding view $viewId...")
    val ctx = reactApplicationContext
    var view: CameraView? = null

    try {
      var manager = UIManagerHelper.getUIManager(ctx, viewId)
      view = manager!!::class.members.firstOrNull{ it.name == "resolveView" }?.call(viewId) as CameraView?
    } catch(e: Exception) {
      //
    }

    if (view == null) {
      try {
        view = ctx?.currentActivity?.findViewById<CameraView>(viewId)
      } catch(e: Exception) {
        //
      }
    }

    Log.d(TAG,  if (view != null) "Found view $viewId!" else "Couldn't find view $viewId!")
    return view ?: throw ViewNotFoundError(viewId)
}
```

findCameraViewById

```java
fun findCameraViewById(viewId: Int): CameraView {
    Log.d(TAG, "Finding view $viewId...")
    val ctx = mContext?.get()
    var view: CameraView? = null

    try {
      var manager = UIManagerHelper.getUIManager(ctx, viewId)
      view = manager!!::class.members.firstOrNull{ it.name == "resolveView" }?.call(viewId) as CameraView?
    } catch(e: Exception) {
      //
    }

    if (view == null) {
      try {
        view = ctx?.currentActivity?.findViewById<CameraView>(viewId)
      } catch(e: Exception) {
        //
      }
    }

    Log.d(TAG,  if (view != null) "Found view $viewId!" else "Couldn't find view $viewId!")
    return view ?: throw ViewNotFoundError(viewId)
}
```

### Module was compiled with an incompatible version of Kotlin. The binary version of its metadata is 1.6.0, expected version is 1.4.0. <a id='1.6'></a>
----

Update your kotlin version 1.6.0+
```text
classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.6.0+"
```

### Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module <a id='1.7'></a>
----

gradle-wrapper.properties

```bash
org.gradle.jvmargs=--add-opens java.base/java.io=ALL-UNNAMED
```

### CMake Error: The following variables are used in this project, but they are set to NOTFOUND. FBJNI_LIB, FOLLY_JSON_LIB, JSI_LIB <a id='1.8'></a>
----

```bash
rm -rf node_modules
yarn install
cd android
./gradlew clean
./gradlew assembleDebug
```

### Could not find me.relex:photodraweeview:1.1.3 <a id='1.9'></a>
----

```bash
def REACT_NATIVE_VERSION = new File(['node', '--print',"JSON.parse(require('fs').readFileSync(require.resolve('react-native/package.json'), 'utf-8')).version"].execute(null, rootDir).text.trim())

configurations.all {
    resolutionStrategy {
        force "com.facebook.react:react-native:" + REACT_NATIVE_VERSION
        
        force 'me.relex:photodraweeview:2.1.0'
    }
}
```

### Failed to construct transformer: Error: error:0308010C:digital envelope routines::unsupported React Native <a id='1.10'></a>
----

```bash
set NODE_OPTIONS=--openssl-legacy-provider

nvm install 16.13.0

nvm alias default 16.13.0
```

### Failed to notify project evaluation listener > org.gradle.api.file.ProjectLayout.fileProperty <a id='1.11'></a>
----

Project Structure > Project > Change version to 4.2.2 

https://developer.android.com/studio/releases/gradle-plugin?hl=ko

### React Native : Error: Duplicate resources - Android <a id='1.12'></a>
----

```bash
rm -rf ./android/app/src/main/res/drawable-*

rm -rf ./android/app/src/main/res/raw
```

### Attempt to invoke virtual method 'android.graphics.drawable.Drawable android.graphics.drawable.Drawable$ConstantState.newDrawable(android.content.res.Resources)' on a null object reference <a id='1.13'></a>
----

https://github.com/react-native-maps/react-native-maps/issues/2924

```Text
I found a solution. Not sure if it's a long term one, but this will let you guys work until a permanent solution is found.
Just clear your cash: npm start -- --reset-cache
And restart the project.
It worked for me.
FYI, I didn't eject my project yet.
```

### Native module RNC_AsyncSQLiteDBStorage tried to override AsyncStorageModule. Chekc the getPackages() method in MainApplication.java <a id='1.14'></a>
----

Package.json

```Text
Async Storage has moved to new organization: https://github.com/react-native-async-storage/async-storage
```

```JSON
"@react-native-async-storage/async-storage": "^1.13.1",
"@react-native-community/async-storage": "1.11.0", <-- Remove it
```

### Native module ~~ tried to override ~~ <a id='1.15'></a>
----

https://stackoverflow.com/questions/41846452/how-to-set-canoverrideexistingmodule-true-in-react-native-for-android-apps/63438974#63438974

### annotation does not exist <a id='1.16'></a>
----

https://github.com/facebook/react-native-fbsdk/issues/567

npx jetify





&nbsp;
&nbsp;
&nbsp;





# IOS <a id='3.1'></a>

### GDTCORPlatform.m:87:43 A function declaration without a prototype is deprecated in all versions of C <a id='3.2'></a>

```c
GDTCORNetworkType GDTCORNetworkTypeMessage() {
```

to

```c
GDTCORNetworkType GDTCORNetworkTypeMessage(void) {
```

### Type 'ChartDataSet' does not conform to protocol 'RangeReplaceableCollection' <a id='3.3'></a>

Append to extension

```swift
public func replaceSubrange<C>(_ subrange: Swift.Range<Int>, with newElements: C) where C : Collection, ChartDataEntry == C.Element {
    entries.replaceSubrange(subrange, with: newElements)
    notifyDataSetChanged()
}
```

### “React/RCTEventDispatcherProtocol.h“ file not found <a id='3.4'></a>
----

```ObjectiveC
"React/RCTEventDispatcherProtocol.h" => "React/RCTEventDispatcher.h"
```

### Error for only archive <a id='3.5'></a>
----

Target - Build Settings - Architectures - Build Active Architecture Only [Release] YES

### cocoapods could not find compatible versions for pod reactcommon/callinvoker <a id='3.6'></a>
----

https://fantashit.com/rn-0-62-pod-repo-update-error/

```Text
I solved this issue (version 0.63) by changing the line in the Podfile from

pod 'ReactCommon/callinvoker', :path => "../node_modules/react-native/ReactCommon"

to

pod 'React-callinvoker', :path => "../node_modules/react-native/ReactCommon/callinvoker"
```

### Yoga.cpp:2285:9 Use of bitwise '|' with boolean operands <a id='3.7'></a>

```cpp
node->getLayout().hadOverflow() |
```

to

```cpp
node->getLayout().hadOverflow() ||
```

### 'React/RCTBridgeModule.h' file not found <a id='3.8'></a>
----

https://stackoverflow.com/questions/65696412/react-native-ios-build-error-react-rctbridgemodule-h-file-not-found-with-react

```Text
Check that I have React in my pods (pod 'React', :path => '../node_modules/react-native/'). If not, add it.

Uninstall reinstall pods (pod deintegrate && pod clean && pod install in the ios folder, I believe the pod deintegrate command needs to be downloaded and isn't available by default)

Go to scheme -> edit scheme -> build, delete the React(missing) using the 'minus' button. 

Click on 'add' or a 'plus' button. Find React (should be in the Pods category) and add it. 

Finally, make sure all boxes are ticked for React, and place it at the top of the list.
```

### IOS 14 Firebase Crash <a id='3.9'></a>
----

https://github.com/invertase/react-native-firebase/issues/3944

@heletrix thanks for sharing. I dispatch code in main thread instead and it's working for me

````Objective-C
// node_modules/react-native-firebase/ios/RNFirebase/notifications/RNFirebaseNotifications.m

RCT_EXPORT_METHOD(complete:(NSString*)handlerKey fetchResult:(UIBackgroundFetchResult)fetchResult) {
    if (handlerKey != nil) {
        void (^fetchCompletionHandler)(UIBackgroundFetchResult) = fetchCompletionHandlers[handlerKey];
        dispatch_async(dispatch_get_main_queue(), ^{
            if (fetchCompletionHandler != nil) {
                fetchCompletionHandlers[handlerKey] = nil;
                fetchCompletionHandler(fetchResult);
            } else {
                void(^completionHandler)(void) = completionHandlers[handlerKey];
                if (completionHandler != nil) {
                    completionHandlers[handlerKey] = nil;
                    completionHandler();
                }
            }
        });
    }
}
````

### database is locked Possibly there are two concurrent builds running in the same filesystem location. <a id='3.10'></a>
----

Clean bulid folder

### duplicate symbols for architecture arm64 <a id='3.11'></a>
----

pod deintegrate

pod install

### Couldn't create workspace arena folder '~': Unable to write to info file '~'. <a id='3.12'></a>
----

Disk space is not enought

### SIGABRT RCTModalHostViewController <a id='3.13'></a>
----

```Text
SIGABRT: -[MTLDebugBuffer newTextureWithDescriptor:offset:bytesPerRow:] > -[MTLDebugBuffer newTextureWithDescriptor:offset:bytesPerRow:]:326: failed assertion `resourceOptions (0x0) must match backing buffer resource options (0x20).'
 > : failed assertion `%s'
```

check componentWillUnmount event

### XCode 14 Image not showing <a id='3.14'></a>
----

https://github.com/hsource/react-native/pull/2

### react-native-modal-datetime-picker <a id='3.15'></a>
----

https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/474

### Stored properties cannot be marked potentially unavailable with '@available' <a id='3.15'></a>

https://github.com/crossplatformkorea/react-native-kakao-login/issues/326

remove below code

```swift
@available(iOS 13.0, *)
public lazy var presentationContextProvider: Any? = DefaultPresentationContextProvider()
```

```swift
public var presentationContextProvider: Any?

if #available(iOS 13.0, *) { self.presentationContextProvider = DefaultPresentationContextProvider() } else { self.presentationContextProvider = nil }
```





&nbsp;
&nbsp;
&nbsp;







# M1, M2 (ARM)

### Change Architecture to x86/64 

```bash
arch -x86_64 /bin/zsh
```





&nbsp;
&nbsp;
&nbsp;





### Firebase 
----

```Text
Just realized that according to the docs, these functions only work when sending and receiving notifications via FCM, which is why you aren't seeing these work when sending them manually through APNS. This package will allow for leverage getInitialNotification and the other function: 
```

















# React_Native <a id='2.0'></a>

!do not use react-native.

# Active Debug Menu without Device Shake <a id='2.1'></a>

```bash
adb shell input keyevent KEYCODE_MENU
```

# Run in Production <a id='2.2'></a>

```bash
npx react-native run-ios --configuration Release --device

react-native run-android --variant=release
```

# Make Bundle <a id='2.3'></a>

## IOS

OLD
```bash
react-native bundle --entry-file='index.js' --bundle-output='./ios/main.jsbundle' --dev=false --platform='ios'
```

NEW
```bash
react-native bundle --entry-file ./index.js --platform ios --bundle-output ios/main.jsbundle --assets-dest ios
```

## Android 

OLD
```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

```

NEW
```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

# Commands <a id='2.4'></a>

Run in Platform

```bash
npx react-native run-ios
npx react-native run-android
```

Run with legacy openssl (openssl-legacy-provider)

```bash
set NODE_OPTIONS=--openssl-legacy-provider && react-native run-ios
set NODE_OPTIONS=--openssl-legacy-provider && react-native run-android
```

Run in Device
```bash
npx react-native run-ios --simulator=\"iPhone 6s\"
```
