if(navigator.appVersion.includes('Android')){
    document.addEventListener("message", function (data) {
       alert("you are in android OS");
    });
}
else {
    window.addEventListener("message", function (data) {
       alert("you are in android OS");               
     });
}
