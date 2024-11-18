# BigToes Admin Panel
Admin interface built with React.js for managing the BigToes Fitness Application.



<br />

## Prerequisites
- Node.js (v18.x or above)
- npm or yarn package manager
- React Developer Tools (Optional, for debugging)

<br />

## Installation
1. Clone the repository:
```bash
git clone https://github.com/your-repo/bigtoe-admin.git
```
2. Install dependencies:
```bash
npm install
   # or
yarn install
```

<br />

## Environment Setup
1. Create a .env file in the root directory.
2. Add the following configurations:
```bash
VITE_BASE_URL = https://api.example.com
VITE_UPLOAD_BASE_URL = https://api.example.com
VITE_SOCKET_URL = https://api.example.com

JWT_SECRET = jwt-secret-key

VITE_FIREBASE_API_KEY = firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN = firebase-auth-domain
VITE_FIREBASE_DATABASE_URL=firebase-database-url
VITE_FIREBASE_PROJECT_ID = firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET = firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID = firebase-messaging-sender-id
VITE_FIREBASE_APP_ID = firebase-app-id
VITE_FIREBASE_MEASUREMENT_ID = firebase-measurement-id
VITE_FIREBASE_VAPID_KEY = firebase-vapid-key

```

<br /> 

## Building and Running in Development Mode:

```bash
npm run dev
   # or
yarn dev
```
- Access the app at http://localhost:5173.


## Production Build:

```bash
npm run build
    # or
yarn build
```

<br />

## Troubleshooting
- Port Already in Use: If the default port (5173) is already in use, the admin panel will automatically use another available port.
- API Not Responding: Ensure Bigtoe API is running and VITE_BASE_URL is correctly set.
- Logging Errors: If a component fails to load or throws any error logging that in UI & Console through Error Boundary.
- Build Errors: Check the .env file for missing configurations and ensure dependencies are up to date.

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
