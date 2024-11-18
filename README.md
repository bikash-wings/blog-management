# BigToes Fitness API
APIs built using NodeJS for the BigToes Fitness Application.


<br />

## Prerequisites
- Node.js (v18.x or above)
- npm or yarn
- MySQL
  
<br />

  
## Installation
1. Clone the repository:
```bash
git clone https://github.com/PM-wts/bigtoes-api.git
```

2. Install dependencies:
```bash
npm install
    or
yarn install
```

<br />

## Environment Setup
1. Create a .env file in the root directory.
2. Add the following configurations:
```bash
NODE_ENV = node-environment
PORT = 5000


API_BASE_ROOT = 'api'
APP_DOMAIN_NAME = api-base-url
ADMIN_DOMAIN_NAME = admin-panel-base-url
APP_STORE_LINK = app-store-link-of-ios-app
GOOGLE_PLAY_LINK = google-play-link-of-android-app

DB_USER = mysql-db-user
DB_PASSWORD = mysql-db-password
DB_NAME = mysql-db-name
DB_DIALECT = mysql-db-dialect
DB_HOST = mysql-db-host
DB_PORT = mysql-db-port

JWT_SECRET = jwt-secret-key
JWT_ACCESS_EXPIRATION_MINUTES = jwt-expiration
JWT_REFRESH_EXPIRATION_DAYS = jwt-refresh-expiration-days [number]
JWT_RESET_PASSWORD_EXPIRATION_MINUTES = reset-password-otp-expiration-miutes [number]
JWT_VERIFY_EMAIL_EXPIRATION_MINUTES = otp-expiration-minutes [number]

EMAIL_FROM = email-from
SMTP_HOST = smtp-host-server
SMTP_PORT = smtp-port-number
SMTP_USERNAME = smtp-user
SMTP_PASSWORD = smtp-password

ADMIN_ROLE = amin-role
ZOOM_ACCOUNT_ID = zoom-acoount-id
ZOOM_CLIENT_ID = zoom-client-id
ZOOM_CLIENT_SECRET = zoom-client-secret
ZOOM_AUTH_TOKEN_URL = "https://zoom.us/oauth/token"
ZOOM_BASE_URL = zoom-base-url

VIMEO_CLIENT_ID = vimeo-client-id
VIMEO_CLIENT_SECRET = vimeo-client-secret-key
VIMEO_ACCESS_TOKEN = vimeo-access-token

FIREBASE_TYPE = firebase-account-type
FIREBASE_PROJECT_ID = firebase-project-id
FIREBASE_PRIVATE_KEY = firebase-private-key

AVAILABLE_FREE_CALLS = system-given-free-calls


AWS_ACCESS_KEY_ID = aws-access-key-id
AWS_SECRET_ACCESS_KEY = aws-secret-access-key
AWS_REGION = aws-region
AWS_BUCKET = aws-bucket-name


MSG91_TEMPLATE_ID = msg91-otp-template-id
MSG91_AUTH_KEY = msg91-auth-key
MSG91_OTP_BASE_URL ="https://control.msg91.com/api/v5/otp"

```

<br />

## Running the Application in Development Mode:

```bash
npm run dev
    or
yarn dev
```
- API will be available at http://localhost:5000.

  
<br />

## Troubleshooting
1. Database Connection Fails:
- Check DATABASE_URL in the .env file.
- Ensure the database server is running.
2. Invalid Token: Ensure JWT_SECRET in the .env matches across services.
3. Port Already in Use: Specify another port in .env:
```bash
PORT=5001
```
<br />

## Contributing
1. Fork the repositories.
2. Create a feature branch:
```bash
git checkout -b feature-name
```
3. Commit changes and push:
```bash
git commit -m "Your commit message"
git push origin feature-name
```
4. Submit a pull request.

   
<br />

## Support
For any issues, feel free to contact the support team or open an issue in the respective GitHub repositories.
