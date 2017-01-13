window.fbAsyncInit = function () {
    FB.init({
        appId: '***FB_APP_ID***',
        xfbml: true,
        version: 'v2.8'
    });
    FB.AppEvents.logPageView();

    $("#facebook-login").on("click", function () {
        FB.login(function (response) {
            var $result = $("#result");
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
            } else if (response.status === 'not_authorized') {
                $result.removeClass("hidden");
                $result.addClass("alert-danger").text("Failed to log in!");
            } else {
                $result.removeClass("hidden");
                $result.addClass("alert-danger").text("Failed to log in!");
            }
        }, {scope: 'email, public_profile'});
    });

};

/* Load SDK asynchronously */
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