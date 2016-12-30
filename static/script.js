gapi.load("auth2", function () {    //load in the auth2 api's, without it gapi.auth2 will be undefined
    gapi.auth2.init({
        client_id: "729655589304-ftob0mqhbbb3hhi2hkuco0m957n8n3v8.apps.googleusercontent.com"
    });

    var GoogleAuth = gapi.auth2.getAuthInstance();

    $("#google-login").on("click", function () {
        GoogleAuth.signIn().then(function (response) {
            console.log(response);
        });
    })
});