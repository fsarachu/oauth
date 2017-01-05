$(function () {
    gapi.load("auth2", function () {
        auth2 = gapi.auth2.init({
            client_id: "729655589304-ftob0mqhbbb3hhi2hkuco0m957n8n3v8.apps.googleusercontent.com"
        });
    });

    $("#google-login").on("click", function () {
        auth2.grantOfflineAccess({'redirect_uri': 'postmessage'}).then(signInCallback);
    });

    function signInCallback(authResult) {
        if (authResult['code']) {

            // Hide the sign-in button now that the user is authorized, for example:
            $('#google-login').attr('style', 'display: none');

            // Send the code to the server
            $.ajax({
                type: 'POST',
                url: 'http://localhost:5000/auth/google',
                contentType: 'application/octet-stream; charset=utf-8',
                success: function (result) {
                    // Handle or verify the server response.
                },
                processData: false,
                data: authResult['code']
            });
        } else {
            // There was an error.
        }
    }

});
