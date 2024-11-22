## Overview

The `Register.tsx` file contains a functional React component that facilitates user registration. It utilizes the Mantine library for UI components and integrates form handling with validation using Zod. The component allows users to input their username, email, and password, and handles the submission of this data to a backend API for account creation.

## Functionality

The `Register` component provides a user-friendly interface for new users to create an account. It includes:

- Form fields for username, email, password, and password confirmation.
- Validation of input fields using a schema defined in `registerSchema`.
- Error handling to display messages when registration fails.
- Navigation to the login page upon successful registration.

## Hooks

### `useRegister()`

The `useRegister` hook is a custom hook that encapsulates the logic for user registration. It utilizes the `useMutation` hook from React Query to handle the asynchronous registration process. Key features include:

- Sending a POST request to the `register` endpoint with the user's data.
- Updating the query client with the newly registered user's data upon successful registration.
- Displaying a success notification to the user after a successful registration.

This hook abstracts the registration logic, making it reusable and maintainable within the application.
