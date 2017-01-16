# OAuth2

## Running the App

### Set up credentials

Replace Google and Facebook API credentials in the following files:

* `client_secrets.json`
* `fb_client_secrets.json`
* `static/facebookLogin.js`
* `static/googleLogin.js`

### Initialize the Database

Type **python database_setup.py** to initialize the database.

Type **python lotsofmenus.py** to populate the database with restaurants and menu items. (Optional)

Type **python project.py** to run the Flask web server. App will serve at **http://localhost:5000**
