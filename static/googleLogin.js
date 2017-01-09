$(function () {
    gapi.load("auth2", function () {
        auth2 = gapi.auth2.init({
            client_id: "***GOOGLE_CLIENT_ID***"
        });
    });

    $("#google-login").on("click", function () {
        auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then(signInCallback);
    });

    function signInCallback(authResult) {
        if (authResult["code"]) {
            // alert("got the code!");

            // Send the code to the server
            $.ajax({
                type: "POST",
                url: "http://localhost:5000/auth/google?state=a" + state,
                contentType: "application/octet-stream; charset=utf-8",
                processData: false,
                data: authResult['code']
            })
                .done(function (result) {
                        var $result = $("#result");

                        $result.removeClass("hidden");

                        if (result) {
                            $result.addClass("alert-success").text("Login Successful! Redirecting...");
                            setTimeout(function () {
                                window.location.replace("http://localhost:5000/");
                            }, 3000);
                        } else if (authResult["error"]) {
                            $result.addClass("alert-danger").text("Ooooooops! Something went wrong: " + authResult["error"]);
                        } else {
                            $result.addClass("alert-danger").text("Failed to make a server-side call.");
                        }
                    }
                )
                .fail(function (result) {
                        var $result = $("#result");
                        $result.removeClass("hidden");
                        $result.addClass("alert-danger").text("Failed to log in!");
                    }
                );
        } else {
            // There was an error.
            alert("Ooooops! no code here");
        }
    }

});
