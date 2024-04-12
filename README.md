# GitHub OAuth React App

This is a simple React application that utilizes GitHub OAuth for authentication and fetches user repositories.

## Prerequisites

Before running this application, you need to set up a GitHub OAuth App. Follow these steps:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers).
2. Click on "New OAuth App".
3. Fill in the details:
   - **Application name**: Your application's name.
   - **Homepage URL**: URL of your application.
   - **Authorization callback URL**: URL to handle authorization response (e.g., `http://localhost:3000/callback`).
4. Click on "Register application" to create the OAuth App.
5. Note down the **Client ID**.

## Installation

1. Clone this repository.
2. Install dependencies using npm:

```bash
npm install
```

## Configuration

Set the environment variable `REACT_APP_CLIENT_ID` in a `.env` file at the root of your project:

```plaintext
REACT_APP_CLIENT_ID=your_github_oauth_client_id
```

## Running the Application

Run the development server:

```bash
npm start
```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Click on "Sign in with GitHub" to authenticate.
3. Upon successful authentication, you will be able to see your GitHub repositories upon clicking on get my repos button.

## License

This project is licensed under the MIT License.
