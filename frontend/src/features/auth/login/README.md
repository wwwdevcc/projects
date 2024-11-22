# README

## Overview

The `Login.tsx` file is a React functional component that provides a user interface for logging into the application. It utilizes Mantine components for styling and layout, and integrates form handling with validation using the `useForm` hook from Mantine. The component manages user input for email and password, and handles the submission of login credentials.

## Functionality

The `Login` component allows users to enter their email and password to authenticate. It includes features such as:

- Form validation using Zod schema.
- Conditional rendering of alerts based on URL search parameters.
- Navigation to a registration page for new users.
- A "Remember me" checkbox and a link for password recovery.

Upon successful login, the user is redirected to a specified URL or the home page.

## Hooks

### `useLogin()`

The `useLogin` hook is responsible for managing the login mutation. It utilizes the `useMutation` hook from React Query to handle the asynchronous login process. Key functionalities include:

- Sending login credentials to the server via a POST request.
- Handling CSRF token initialization before the request.
- Updating the authentication state and user data in the query client upon successful login.

This hook encapsulates the logic for user authentication, making it reusable and maintainable.
