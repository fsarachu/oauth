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
                url: "http://localhost:5000/auth/google?state=" + state,
                contentType: "application/octet-stream; charset=utf-8",
                success: function (result) {
                    if (result) {
                        $("#result").html("Login Successful!<br>" + result + "<br> Redirecting...");
                        setTimeout(function () {
                            window.Location.href = "/restaurant";
                        }, 3000);
                    } else if (authResult["error"]) {
                        console.log("Ooooooops! Something went wrong: " + authResult["error"]);
                    } else {
                        $("#result").html("Failed to make a server-side call.")
                    }
                },
                processData: false,
                data: authResult['code']
            });
        } else {
            // There was an error.
            alert("Ooooops! no code here");
        }
    }

});
