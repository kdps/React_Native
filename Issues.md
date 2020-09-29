#### IOS 14 Firebase Crash

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

#### database is locked Possibly there are two concurrent builds running in the same filesystem location.

Clean bulid folder

#### duplicate symbols for architecture arm64

pod deintegrate

pod install

#### Couldn't create workspace arena folder '~': Unable to write to info file '~'.

Disk space is not enought

#### Firebase

Just realized that according to the docs, these functions only work when sending and receiving notifications via FCM, which is why you aren't seeing these work when sending them manually through APNS. This package will allow for leverage getInitialNotification and the other function: 

#### SIGABRT RCTModalHostViewController

SIGABRT: -[MTLDebugBuffer newTextureWithDescriptor:offset:bytesPerRow:] > -[MTLDebugBuffer newTextureWithDescriptor:offset:bytesPerRow:]:326: failed assertion `resourceOptions (0x0) must match backing buffer resource options (0x20).'
 > : failed assertion `%s'
 
check componentWillUnmount event

#### XCode 14 Image not showing

https://github.com/hsource/react-native/pull/2

#### react-native-modal-datetime-picker

https://github.com/mmazzarolo/react-native-modal-datetime-picker/pull/474
