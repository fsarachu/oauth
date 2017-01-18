window.fbAsyncInit = function () {
    FB.init({
        appId: facebookClientId,
        cookie: true,
        xfbml: true,
        version: "v2.8"
    });
    FB.AppEvents.logPageView();

    $("#facebook-login").on("click", function () {
        FB.login(function (response) {
            var $result = $("#result");

            $result.removeClass(function (index, className) {
                return (className.match(/(^|\s)alert-\S+/g) || []).join(' ');
            });

            if (response.authResponse) {
                $.ajax({
                    type: "POST",
                    url: "/fbconnect?state=" + state,
                    processData: false,
                    data: response.authResponse.accessToken,
                    contentType: "application/octet-stream; charset=utf-8"
                })
                    .done(function () {
                        $result.removeClass("hidden");
                        $result.addClass("alert-success").text("Login Successful! Redirecting...");
                        setTimeout(function () {
                            window.location.replace("http://localhost:5000/");
                        }, 3000);
                    })
                    .fail(function (result) {
                            var $result = $("#result");
                            $result.removeClass("hidden");
                            $result.addClass("alert-danger").text("Failed to log in!");
                        }
                    );
            } else {
                $result.removeClass("hidden");
                $result.addClass("alert-danger").text("You cancelled login or did not fully authorize.");
            }
        }, {scope: "email, public_profile"});
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
}(document, "script", "facebook-jssdk"));