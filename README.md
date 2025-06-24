# trip-fotos-vue

[![Run Cypress Tests](https://github.com/andres-codigo/trip-fotos-vue/actions/workflows/cypress.yml/badge.svg)](https://github.com/andres-codigo/trip-fotos-vue/actions/workflows/cypress.yml)

## Contents

- [📘 About This Project](#about-this-project)
- [🧱 Stack](#stack)
- [⚡ Quick Start](#quick-start)
- [💾 Installation](#installation)
- [🎯 Scripts](#scripts)
- [⚙️ Setup](#setup)
- [👨‍💻 Development](#development)
- [🧪 Testing](#testing)
- [🚀 CI/CD Workflows](#cicd-workflows)
- [🛠️ Build](#build)
- [📦 Deployment](#deployment)
- [✨ Features](#features)
- [📁 Folder Structure](#folder-structure)
- [🧯 Troubleshooting](#troubleshooting)

<a id="about-this-project"></a>

## 📘 About This Project

This project is a UI and functional extension on Udemy's Vue - The Complete Guide (incl. Router & Composition API) > 'Find a coach' project.

It has been converted from "finding a coach" to "finding popular travel destinations" tied to a registered traveller.

<a id="stack"></a>

## 🧱 Stack

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

<a id="quick-start"></a>

## ⚡ Quick Start

1. Clone the repository:

    ```bash
    git clone https://github.com/andres-codigo/trip-fotos-vue
    cd trip-fotos-vue
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

4. Open the app in your browser at http://localhost:4000

<a id="installation"></a>

## 💾 Installation

To get started with the project, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Clone the repository

```bash
git clone https://github.com/andres-codigo/trip-fotos-vue
cd trip-fotos-vue
```

### Install dependencies

Run the following command to install all required dependencies, including Cypress:

```bash
npm install
```

<a id="scripts"></a>

## 🎯 Scripts

Below are the available npm scripts for this project:

```bash
# Start the development server with linting
npm run dev

# Run ESLint to check for issues
npm run lint

# Automatically fix linting issues and format files
npm run lint:fix

# Format files using Prettier
npm run format

# Open the Cypress Test Runner in interactive mode
npm run cy:open

# Build the project for production
npm run build

# Preview the production build locally
npm run preview
```

<a id="setup"></a>

## ⚙️ Setup

### Firebase Configuration

#### Prerequisites

- A [Google Account](https://accounts.google.com/) is required.
- A [Blaze Plan](https://firebase.google.com/pricing?hl=en) is necessary for database and storage capabilities.

#### Steps

1. **Create a Firebase Project**
   Sign in to your [Firebase Console](https://console.firebase.google.com) and create a new project.

2. **Enable Required Firebase Products**
   Navigate to the "Build" dropdown menu in your Firebase project and enable the following:
    - **Realtime Database**
        - Set the location to **United States (us-central1, us-east1, or us-west1)**.
        - Copy the database URL and add it to your `.env` file under `VITE_BACKEND_BASE_URL`.
        - Update the database rules as follows:
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

    - **Authentication**
        - Go to "Sign-in Method" and enable **Email/Password**. Ensure **Email link (passwordless sign-in)** is NOT enabled.

    - **Cloud Storage**
        - Set up a [Blaze Plan](https://firebase.google.com/pricing?hl=en) to enable storage capabilities.

3. **Add Firebase to Your Web App**
    - Register your app in the Firebase Console.
    - Copy the Firebase configuration values and add them to your `.env` file.

### Environment Variables

Create a `.env` file in the root directory and add the following key-value pairs:

**Note:**
Do not commit your `.env` file to version control.
Instead, create a `.env.example` file (without sensitive values) to document required environment variables for collaborators.

```bash

# Firebase Auth REST API
VITE_API_URL='https://identitytoolkit.googleapis.com/v1/accounts:'
VITE_API_KEY='' # firebaseConfig > apiKey

# Firebase Realtime Database
VITE_BACKEND_BASE_URL='' # firebaseConfig > databaseURL

# Firebase App Configuration
VITE_FIREBASE_API_KEY='' # firebaseConfig > apiKey
VITE_FIREBASE_AUTH_DOMAIN='' # firebaseConfig > authDomain
VITE_DATABASE_URL=$VITE_BACKEND_BASE_URL
VITE_FIREBASE_PROJECT_ID='' # firebaseConfig > projectId
VITE_FIREBASE_STORAGE_BUCKET='' # firebaseConfig > storageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID='' # firebaseConfig > messagingSenderId
VITE_FIREBASE_APP_ID='' # firebaseConfig > appId
VITE_FIREBASE_MEASUREMENT_ID='' # firebaseConfig > measurementId

# Admin User ID
VITE_ADMIN_ID='' # Firebase authenticated User UID for deletion of users rights

# CYPRESS TESTING
CYPRESS_USER_EMAIL=''
CYPRESS_USER_PASSWORD=''

```

### Firebase Project Configuration File

Create a `.firebaserc` file in the root directory with the following content:

```json
{
	"projects": {
		"default": "your-project-name"
	}
}
```

<a id="development"></a>

## 👨‍💻 Development

### Start the Development Server

Run the following command to start the local development server with hot module replacement:

```bash
npm run dev
```

### Linting and Formatting

Refer to the [Scripts](#scripts) section for commands to run ESLint, fix linting issues, and format files using Prettier.

---

<a id="testing"></a>

## 🧪 Testing

This project uses [Cypress](https://www.cypress.io/) for end-to-end testing.

### 2. Cypress Setup

Cypress is already configured in the project.

To get started:

**Install Cypress**

Cypress is included in the project dependencies. If you haven't already installed the dependencies, run:

```bash
npm install
```

**Cypress Configuration**

Cypress is pre-configured in this project. Feel free to customise the [cypress.config.js](https://github.com/andres-codigo/trip-fotos-vue/blob/main/cypress.config.js) file as needed for your testing requirements.

**Run Tests**

- **Interactive Mode**: Opens the Cypress Test Runner for a visual testing experience.

```bash
npx cypress open
```

- **Headless Mode:** Runs all tests in the terminal without opening the Test Runner

```bash
npx cypress run
```

- Run a specific test file:

```bash
npx cypress run --spec "cypress/e2e/<test-file>.cy.js"
```

**Cypress Directory Structure**

**Fixtures**: Contains mock data used in tests (e.g., JSON files for API responses).
**Support**: Contains custom commands and global test setup files.

```
    cypress/
      ├── e2e/         # End-to-end test files (e.g., homepage.cy.js)
      ├── fixtures/    # Mock data used in tests
      ├── support/     # Custom commands and test setup
```

**Test Artifacts**

Cypress stores screenshots and videos (if enabled) in the following directories:

- **Screenshots**: `cypress/screenshots/`
- **Videos**: `cypress/videos/`

You can configure these paths in the [cypress.config.js](https://github.com/andres-codigo/trip-fotos-vue/blob/main/cypress.config.js) file.

**Debugging Cypress Tests**

To debug tests, use the Cypress Test Runner in interactive mode (`npx cypress open`). You can inspect elements and view console logs using the browser's developer tools.

<a id="cicd-workflows"></a>

## 🚀 CI/CD Workflows

This project uses GitHub Actions to automate key development and monitoring tasks.

### Vitest CI Workflow

- **Location:** `.github/workflows/cypress.yml`
- **Triggers:**
    - On **push** to any branch
    - On **pull requests** to `main`
    - Manually via **Actions → "Run workflow"**
- **Purpose:** Runs the full test suite to ensure code quality.
- **Merge Blocking:** Pull requests must pass this test workflow before merging into `main`.

#### Test Commands

```bash
npm run test:full     # Run all tests in CI mode with coverage reporting
npm run test:watch    # Run tests in watch mode (local dev)
npm run test:coverage # Run tests with coverage reporting
```

### Clone Tracker Workflow

- **Location:** `.github/workflows/clone-tracker.yml`
- **Purpose:** Sends a webhook notification (e.g., to Discord) when the repository is cloned.
- **Use Case:** Useful for monitoring interest and visibility of the project.

> Note: This workflow uses the GitHub [Traffic API](https://docs.github.com/en/rest/metrics/traffic) and requires the appropriate permissions to access clone statistics.

---

### 🛠 Manual Triggers

Some workflows, like the **Cypress test runner**, can be manually executed from the GitHub UI:

1. Navigate to the **Actions** tab of the repository
2. Select the desired workflow (e.g., **"Run Cypress Tests"**)
3. Click the **"Run workflow"** button on the right side
4. The workflow will be executed immediately (no input needed)

> This is useful for manually re-running workflows after configuration changes or failed automated runs.

<a id="build"></a>

## 🛠️ Build

### Build for Production

Compile and minify the project for production:

```bash
npm run build
```

The output will be located in the `./dist` folder.

### Preview Production Build

Serve the production build locally:

```bash
npm run preview
```

---

<a id="deployment"></a>

## 📦 Deployment

This project is configured for deployment on [Vercel](https://vercel.com/).

### Steps

1. Follow the [Vercel Getting Started Guide](https://vercel.com/docs/getting-started-with-vercel).
2. Deploy the project by linking your GitHub repository to Vercel.
3. Configure environment variables in the Vercel dashboard.

<a id="features"></a>

## ✨ Features

- **User Registration and Authentication**
  Users can sign up and log in using Firebase Authentication.

- **Admin Access**
  Assign admin rights to a specific user by adding their Firebase Auth User UID to the `.env` file under `VITE_ADMIN_ID`. This allows the admin user to delete other travellers.

- **Traveller Profiles**
  Registered travellers can add a description of their travel destination, choose where they travelled to, the number of days spent there, as well as upload photos. They are also able to leave contact and send messages on other traveller against their profile.

<a id="folder-structure"></a>

## 📁 Folder Structure

```
trip-fotos-vue/
├── .github/            # GitHub Actions workflows
├── cypress/            # Cypress tests
├── public/             # Static assets
├── rules/              # ESLint configuration rules
├── src/
│   ├── assets/         # Fonts, SVGs, and other static assets
│   ├── components/     # Reusable Vue components
│   ├── composables     # Vue 3 Composition API functions (composables)
│   ├── constants/      # Global, Firebase, API, paths, and other constants
│   ├── directives/     # Custom Vue directives
│   ├── pages/          # Top-level route components
│   ├── store/          # Vuex store modules
│   ├── styles/         # SCSS stylesheets
│   ├── utils/          # General utility functions
│   ├── App.js          # Root Vue component
│   ├── firebase.js     # Firebase configuration
│   ├── main.js         # App entry point
│   └── router.js       # Vue Router configuration
├── .env                        # Environment variables (not committed to version control)
├── .firebaserc                 # Firebase project configuration
├── .gitignore                  # Git ignore rules
├── .npmrc                      # npm configuration file.
├── .prettierignore             # Prettier ignore rules
├── .prettierrc.json            # Prettier configuration
├── cypress.config.js           # Cypress testing configuration
├── eslint.config.mjs           # ESLint configuration
├── index.html                  # Main HTML template for the app
├── jsconfig.json               # JS configuration
├── package.json                # Project dependencies and scripts
├── README.md                   # Project documentation
├── vercel.json                 # Vercel deployment configuration
└── vite.config.js              # Vite build tool configuration
```

### Explanation of Additional Files:

1. **`.firebaserc`**: Firebase project configuration file for managing Firebase environments.
2. **`.gitignore`**: Specifies files and directories to be ignored by Git (e.g., `node_modules`, `.env`).
3. **`.prettierignore`**: Specifies files and directories to be ignored by Prettier for formatting.
4. **`.prettierrc.json`**: Configuration file for Prettier to enforce consistent code formatting.
5. **`cypress.config.js`**: Configuration file for Cypress end-to-end testing.
6. **`eslint.config.mjs`**: ESLint configuration file for linting JavaScript/TypeScript code.
7. **`vercel.json`**: Configuration file for deploying the project to Vercel.
8. **`vite.config.js`**: Configuration file for Vite, specifying plugins, aliases, and build options.

<a id="troubleshooting"></a>

## 🧯 Troubleshooting

- **Issue**: `npm install` fails.
    - **Solution**: Ensure you have Node.js and npm installed. Check the required versions in the [Node.js](https://nodejs.org/) documentation.

- **Issue**: Firebase environment variables are not working.
    - **Solution**: Ensure you have created a [.env](http://_vscodecontentref_/1) file in the root directory with the correct Firebase configuration values.
