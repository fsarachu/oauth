# OAuth2

Project for Udacity's course *Authentication & Authorization: OAuth*

## Running the App

### Set up credentials

Replace Google and Facebook API credentials in the following files:

* `client_secrets.json`
* `fb_client_secrets.json`
* `static/facebookLogin.js`
* `static/googleLogin.js`

### Initialize the Database

Run `python database_setup.py` to initialize the database.

Run `python lotsofmenus.py` to populate the database with restaurants and menu items.

Run `python project.py` to run the Flask web server. App will serve at `http://localhost:5000`
