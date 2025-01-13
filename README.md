# trip-fotos

## Contents

-   [About This Project](#about-this-project)
-   [Stack](#stack)
-   [Installation](#installation)
-   [Setup](#setup)
-   [Development](#development)
-   [Testing](#testing)
-   [Build](#build)
-   [Deployment](#deployment)
-   [Features](#features)

## About this project

This project is a UI and functional extension on Udemy's Vue - The Complete Guide (incl. Router & Composition API) > 'Find a coach' project.

If has been converted from "finding a coach" to "finding popular travel destinations" tied to a registered traveller.

Tailored to be developed using Visual Studio Code.

## Stack

-   Vite for development and build.
-   Vue 3 as Front-End Library.
-   Vue Router for routing.
-   Vuex for State Management.
-   Cypress for front end testing
-   Firebase Realtime Database for storing Travellers and Messages.
-   Firebase Authentication for storing Sign-in credentials.
-   Firebase Cloud Storage for storing uploaded traveller images.

## Installation

To get started with the project, follow these steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

### Clone the repository

```bash
git clone https://github.com/andres-codigo/trip-fotos
cd trip-fotos
```

### Install dependencies

After cloning the repository, install the dependencies by running:

```bash
npm install
```

This will install all the required packages defined in the package.json file.

## Setup

### Needed Files

#### `.env`

Go to your [Firebase Project](https://console.firebase.google.com), ensuring the Firebase App is set-up. Locate your config details, then create a `.env` file adding your project values against the following structure:

```bash

# FIREBASE AUTH REST API
VITE_API_URL=''
VITE_API_KEY=''

VITE_BACKEND_BASE_URL=''

# FIREBASE APP CONFIGURATION FOR SDK USAGE
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_DATABASE_URL=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""

# UNIQUE ID FOR 'EMAIL/PASSWORD' REGISTERED FIREBASE AUTHENTICATED USER THAT WILL HAVE ADMIN RIGHTS ON APP, ALLOWING FOR THE DELETION OF TRAVELLERS FROM THE UI FRONT END, EXCLUDING ADMIN USER
VITE_ADMIN_ID=''

# CYPRESS TESTING
CYPRESS_USER_EMAIL=''
CYPRESS_USER_PASSWORD=''

```

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

### ESLints and fixes files test suite for the project

```
npm run lint
```

### Prettier and reformat files on the project based on '.prettierrc.json' configuration file

```
npm run format
```

## Cypress Testing

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

NB: The trip-fotos App requires registered login credentials for full access. To enable a user to 'Sign-up' and then register as a traveller within the app uncomment the 'switch mode' button (src/pages/auth/UserAuth.vue), lines 38-43.

-   When registering travellers can optionally upload photos against their profile for others to view.

-   Registered travellers can leave personal 'messages', as opposed to 'requests', on other traveller profiles

-   An admin user of your choice will be able to log in and delete other registered travellers
