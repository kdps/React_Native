# Sentry

Cannot remove sentry fucking shit

# Android

### React Native : Error: Duplicate resources - Android

```bash
rm -rf ./android/app/src/main/res/drawable-*

rm -rf ./android/app/src/main/res/raw
```

### Attempt to invoke virtual method 'android.graphics.drawable.Drawable android.graphics.drawable.Drawable$ConstantState.newDrawable(android.content.res.Resources)' on a null object reference

https://github.com/react-native-maps/react-native-maps/issues/2924

I found a solution. Not sure if it's a long term one, but this will let you guys work until a permanent solution is found.
Just clear your cash: npm start -- --reset-cache
And restart the project.
It worked for me.
FYI, I didn't eject my project yet.

### Native module RNC_AsyncSQLiteDBStorage tried to override AsyncStorageModule. Chekc the getPackages() method in MainApplication.java

Package.json

```Text
Async Storage has moved to new organization: https://github.com/react-native-async-storage/async-storage
```

```JSON
"@react-native-async-storage/async-storage": "^1.13.1",
"@react-native-community/async-storage": "1.11.0", <-- Remove it
```

### Native module ~~ tried to override ~~

https://stackoverflow.com/questions/41846452/how-to-set-canoverrideexistingmodule-true-in-react-native-for-android-apps/63438974#63438974

### annotation does not exist 

https://github.com/facebook/react-native-fbsdk/issues/567

npx jetify

# IOS

### Error for only archive

Target - Build Settings - Architectures - Build Active Architecture Only [Release] YES


### cocoapods could not find compatible versions for pod reactcommon/callinvoker
----

https://fantashit.com/rn-0-62-pod-repo-update-error/

I solved this issue (version 0.63) by changing the line in the Podfile from

pod 'ReactCommon/callinvoker', :path => "../node_modules/react-native/ReactCommon"

to

pod 'React-callinvoker', :path => "../node_modules/react-native/ReactCommon/callinvoker"



### 'React/RCTBridgeModule.h' file not found

https://stackoverflow.com/questions/65696412/react-native-ios-build-error-react-rctbridgemodule-h-file-not-found-with-react


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

Just realized that according to the docs, these functions only work when sending and receiving notifications via FCM, which is why you aren't seeing these work when sending them manually through APNS. This package will allow for leverage getInitialNotification and the other function: 

### SIGABRT RCTModalHostViewController
----

SIGABRT: -[MTLDebugBuffer newTextureWithDescriptor:offset:bytesPerRow:] > -[MTLDebugBuffer newTextureWithDescriptor:offset:bytesPerRow:]:326: failed assertion `resourceOptions (0x0) must match backing buffer resource options (0x20).'
 > : failed assertion `%s'
 
check componentWillUnmount event

### XCode 14 Image not showing
----

https://github.com/hsource/react-native/pull/2

### react-native-modal-datetime-picker
----

https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/474
