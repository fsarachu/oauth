/* Load SDK asynchronously */
window.fbAsyncInit = function () {
    FB.init({
        appId: '***FB_APP_ID***',
        xfbml: true,
        version: 'v2.8'
    });
    FB.AppEvents.logPageView();

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    console.log(response);
}