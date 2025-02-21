# trip-fotos-vue

## Contents

- [About This Project](#about-this-project)
- [Stack](#stack)
- [Installation](#installation)
- [Setup](#setup)
- [Development](#development)
- [Testing](#testing)
- [Build](#build)
- [Deployment](#deployment)
- [Features](#features)

## About this project

This project is a UI and functional extension on Udemy's Vue - The Complete Guide (incl. Router & Composition API) > 'Find a coach' project.

If has been converted from "finding a coach" to "finding popular travel destinations" tied to a registered traveller.

## Stack

- [Vite](https://vite.dev/) for development and build.
- [Vue 3](https://vuejs.org/) as Front-End Library.
- [Vue Router](https://router.vuejs.org/) for Vue.js routing.
- [Vuex](https://vuex.vuejs.org/) for State Management.
- [SASS](https://sass-lang.com/) for CSS preprocessing
- [ESLint](https://eslint.org/) for JavaScript linting
- [Prettier](https://prettier.io/) for code formatting
- [Cypress](https://www.cypress.io/) for frontend test automation
- [Firebase Realtime Database](https://firebase.google.com/docs/database) for storing Travellers and Messages.
- [Firebase Authentication](https://firebase.google.com/docs/auth) for storing Sign-in credentials.
- [Firebase Cloud Storage](https://firebase.google.com/docs/storage) for storing uploaded traveller images.

## Installation

To get started with the project, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Clone the repository

```bash
git clone https://github.com/andres-codigo/trip-fotos-vue
cd trip-fotos-vue
```

### Install dependencies

After cloning the repository, install the dependencies by running:

```bash
npm install
```

This will install all the required package dependencies defined in the package.json file.

## Setup

### Firebase

#### A pre-requisite of having a Google Account is required, and a [Blaze Plan](https://firebase.google.com/pricing?hl=en) necessary for Database and the Storing of images.

Sign-in to your [Firebase](https://firebase.google.com) account and go to your [Firebase console](https://console.firebase.google.com) to create a [your-project-name] Firebase project.

Once the project is set-up the following build products are required in order to run the App. These products are located inside the project, on the left hand side, under the "Product Categories > Build" dropdown menu:

1.  <u>**Realtime Database:**</u>

- **United States (us-central1, us-east1, or us-west1)** Realtime Database location is required for "No-cost up 'X' GB-months" tier prior to [Cloud Store pricing](https://cloud.google.com/storage/pricing?authuser=0#regions) kicking in, as the [Blaze Pricing Plan](https://firebase.google.com/pricing?hl=en) is now required for use of the Firebase products.
- The Realtime Database url is required for the **.env > VITE_BACKEND_BASE_URL** key/value (see [Needed Files](#needed-files) below)

    Once set-up select the Rules tab and update as follows:

    ```json
    {
    	"rules": {
    		"travellers": {
    			".read": true,
    			".write": "auth != null"
    		},
    		"messages": {
    			".read": "auth != null",
    			".write": true
    		}
    	}
    }
    ```

2.  <u>**Authentication:**</u>

- Sign-in Method > Native providers > Email/Password (enabled), and Email link (passwordless sign-in) NOT enabled

3.  <u>**Storage:**</u>

- Set-up a [Blaze Plan](https://firebase.google.com/pricing?hl=en) account to enable storage capabilities

4. <u>**Add Firebase to your web app**</u>

- Register the app
- Select Firebase SDK using npm **(npm firebase install is not required as already added to package.json)**

### Needed Files

#### `.env`

Locate your config details located under the **\*Project > Project settings > General** tab, create a `.env` file and add the applicable project values against the following key/value pairs:

```bash

# FIREBASE AUTH REST API
VITE_API_URL='https://identitytoolkit.googleapis.com/v1/accounts:'
VITE_API_KEY='' # firebaseConfig > apiKey (delete comment after value added)

VITE_BACKEND_BASE_URL='' # firebaseConfig > databaseURL (delete comment after value added)

# FIREBASE APP CONFIGURATION FOR SDK USAGE
VITE_FIREBASE_API_KEY="" # firebaseConfig > apiKey (delete comment after value added)
VITE_FIREBASE_AUTH_DOMAIN="" # firebaseConfig > authDomain (delete comment after value added)
VITE_DATABASE_URL=$VITE_BACKEND_BASE_URL
VITE_FIREBASE_PROJECT_ID="" # firebaseConfig > projectId (delete comment after value added)
VITE_FIREBASE_STORAGE_BUCKET="" # firebaseConfig > storageBucket (delete comment after value added)
VITE_FIREBASE_MESSAGING_SENDER_ID="" # firebaseConfig > messagingSenderId (delete comment after value added)
VITE_FIREBASE_APP_ID="" # firebaseConfig > appId (delete comment after value added)
VITE_FIREBASE_MEASUREMENT_ID="" # firebaseConfig > measurementId (delete comment after value added)

# UNIQUE ID FOR 'EMAIL/PASSWORD' REGISTERED FIREBASE AUTHENTICATED USER THAT WILL HAVE ADMIN RIGHTS ON APP, ALLOWING FOR THE DELETION OF TRAVELLERS FROM THE UI FRONT END, EXCLUDING ADMIN USER
VITE_ADMIN_ID=''

# CYPRESS TESTING
CYPRESS_USER_EMAIL=''
CYPRESS_USER_PASSWORD=''

```

[Features](#features) section below outlines steps on how to obtain the VITE_ADMIN_ID.

#### `.firebaserc`

```json
{
	"projects": {
		"default": "your-project-name"
	}
}
```

## Development

### Local Setup

### Compiles and hot-reloads from a local web server with Hot Module Replacement for development

```
npm run dev
```

### ESLints and fixes files for the project

```
npm run lint:js
```

or to fix issues automatically

```
npm run lint:fix
```

### Prettier and reformat files on the project based on '.prettierrc.json' configuration file

```
npm run format
```

### Cypress for frontend test automation

```
npx cypress open
```

## Build

### Compiles and minifies the project, outputted to the './dist' folder ready for production

```
npm run build
```

### Preview production build from a local web server that serves the './dist' build solution

```
npm run serve
```

## Deployment

Follow the [Vercel getting started instructions](https://vercel.com/docs/getting-started-with-vercel) and [Deploying Git Repositories with Vercel](https://vercel.com/docs/deployments/git) to set-up deployment via GitHub.

Project deployment workflow can be viewed and configured via GitHub > Integrations > Applications > Vercel.

## Features

NB: The trip-fotos-vue App requires registered login credentials for full access. By default, a user is only able to login.

To enable a user to 'Sign-up' and then register as a traveller uncomment the 'switch mode' button (src/pages/auth/UserAuth.vue), lines 38-43. Once a users have been signed-up, validate the entries in Firebase > Authentication > Users, and copy and paste the **User UID** of your choice into the .env **VITE_ADMIN_ID** property for user Admin access, allowing this user to delete registered travellers using the Front End UI. Deleting the traveller will delete all traveller information, including images, but their authenticated sign-up details will remain.

- When registering travellers can optionally upload photos against their profile for others to view.

- Registered travellers can leave personal 'messages', as opposed to 'requests', on other traveller profiles
