# M1, M2 (ARM)

### Change Architecture to x86/64

```bash
arch -x86_64 /bin/zsh
```

# Sentry

Cannot remove sentry fucking shit

# Javascript

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

# Android

### Keyboard auto hide / Keyboard closes immediately once opened in TextInput

```xml
android:windowSoftInputMode="stateAlwaysHidden|adjustPan"
```

### BUG! exception in phase 'semantic analysis' in source unit '_BuildScript_' Unsupported class file major version 61

```bash
distributionUrl => gradle-7.6-all.zip
```

### 'RNTimePicker' could not be found
----

remove fucking `react-native-modal-datetime-picker` package

### Unresolved reference `resolveView` (Vision-Camera)
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

### Module was compiled with an incompatible version of Kotlin. The binary version of its metadata is 1.6.0, expected version is 1.4.0.
----

Update your kotlin version 1.6.0+
```text
classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:1.6.0+"
```

### Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module 
----

gradle-wrapper.properties

```bash
org.gradle.jvmargs=--add-opens java.base/java.io=ALL-UNNAMED
```

### CMake Error: The following variables are used in this project, but they are set to NOTFOUND. FBJNI_LIB, FOLLY_JSON_LIB, JSI_LIB
----

```bash
rm -rf node_modules
yarn install
cd android
./gradlew clean
./gradlew assembleDebug
```

### Could not find me.relex:photodraweeview:1.1.3
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

### Failed to construct transformer: Error: error:0308010C:digital envelope routines::unsupported React Native
----

```bash
set NODE_OPTIONS=--openssl-legacy-provider

nvm install 16.13.0

nvm alias default 16.13.0
```

### Failed to notify project evaluation listener > org.gradle.api.file.ProjectLayout.fileProperty
----

Project Structure > Project > Change version to 4.2.2 

https://developer.android.com/studio/releases/gradle-plugin?hl=ko

### React Native : Error: Duplicate resources - Android
----

```bash
rm -rf ./android/app/src/main/res/drawable-*

rm -rf ./android/app/src/main/res/raw
```

### Attempt to invoke virtual method 'android.graphics.drawable.Drawable android.graphics.drawable.Drawable$ConstantState.newDrawable(android.content.res.Resources)' on a null object reference
----

https://github.com/react-native-maps/react-native-maps/issues/2924

```Text
I found a solution. Not sure if it's a long term one, but this will let you guys work until a permanent solution is found.
Just clear your cash: npm start -- --reset-cache
And restart the project.
It worked for me.
FYI, I didn't eject my project yet.
```

### Native module RNC_AsyncSQLiteDBStorage tried to override AsyncStorageModule. Chekc the getPackages() method in MainApplication.java
----

Package.json

```Text
Async Storage has moved to new organization: https://github.com/react-native-async-storage/async-storage
```

```JSON
"@react-native-async-storage/async-storage": "^1.13.1",
"@react-native-community/async-storage": "1.11.0", <-- Remove it
```

### Native module ~~ tried to override ~~
----

https://stackoverflow.com/questions/41846452/how-to-set-canoverrideexistingmodule-true-in-react-native-for-android-apps/63438974#63438974

### annotation does not exist 
----

https://github.com/facebook/react-native-fbsdk/issues/567

npx jetify

# IOS

### Type 'ChartDataSet' does not conform to protocol 'RangeReplaceableCollection'

Append to extension

```swift
public func replaceSubrange<C>(_ subrange: Swift.Range<Int>, with newElements: C) where C : Collection, ChartDataEntry == C.Element {
    entries.replaceSubrange(subrange, with: newElements)
    notifyDataSetChanged()
}
```

### “React/RCTEventDispatcherProtocol.h“ file not found
----

```ObjectiveC
"React/RCTEventDispatcherProtocol.h" => "React/RCTEventDispatcher.h"
```

### Error for only archive
----

Target - Build Settings - Architectures - Build Active Architecture Only [Release] YES

### cocoapods could not find compatible versions for pod reactcommon/callinvoker
----

https://fantashit.com/rn-0-62-pod-repo-update-error/

```Text
I solved this issue (version 0.63) by changing the line in the Podfile from

pod 'ReactCommon/callinvoker', :path => "../node_modules/react-native/ReactCommon"

to

pod 'React-callinvoker', :path => "../node_modules/react-native/ReactCommon/callinvoker"
```

### Yoga.cpp:2285:9 Use of bitwise '|' with boolean operands

```cpp
node->getLayout().hadOverflow() |
```

to

```cpp
node->getLayout().hadOverflow() ||
```

### 'React/RCTBridgeModule.h' file not found
----

https://stackoverflow.com/questions/65696412/react-native-ios-build-error-react-rctbridgemodule-h-file-not-found-with-react

```Text
Check that I have React in my pods (pod 'React', :path => '../node_modules/react-native/'). If not, add it.

Uninstall reinstall pods (pod deintegrate && pod clean && pod install in the ios folder, I believe the pod deintegrate command needs to be downloaded and isn't available by default)

Go to scheme -> edit scheme -> build, delete the React(missing) using the 'minus' button. 

Click on 'add' or a 'plus' button. Find React (should be in the Pods category) and add it. 

Finally, make sure all boxes are ticked for React, and place it at the top of the list.
```

### IOS 14 Firebase Crash
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

### database is locked Possibly there are two concurrent builds running in the same filesystem location.
----

Clean bulid folder

### duplicate symbols for architecture arm64
----

pod deintegrate

pod install

### Couldn't create workspace arena folder '~': Unable to write to info file '~'.
----

Disk space is not enought

### Firebase
----

```Text
Just realized that according to the docs, these functions only work when sending and receiving notifications via FCM, which is why you aren't seeing these work when sending them manually through APNS. This package will allow for leverage getInitialNotification and the other function: 
```

### SIGABRT RCTModalHostViewController
----

```Text
SIGABRT: -[MTLDebugBuffer newTextureWithDescriptor:offset:bytesPerRow:] > -[MTLDebugBuffer newTextureWithDescriptor:offset:bytesPerRow:]:326: failed assertion `resourceOptions (0x0) must match backing buffer resource options (0x20).'
 > : failed assertion `%s'
```

check componentWillUnmount event

### XCode 14 Image not showing
----

https://github.com/hsource/react-native/pull/2

### react-native-modal-datetime-picker
----

https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/474
