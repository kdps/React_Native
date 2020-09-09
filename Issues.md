duplicate symbols for architecture arm64

pod deintegrate
pod install



Firebase

Just realized that according to the docs, these functions only work when sending and receiving notifications via FCM, which is why you aren't seeing these work when sending them manually through APNS. This package will allow for leverage getInitialNotification and the other function: 
