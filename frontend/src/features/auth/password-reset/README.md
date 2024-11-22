# Password Reset Feature

## Overview

The `@password-reset` folder contains the components and logic necessary for users to reset their passwords. It includes a form for entering a new password and confirmation, as well as the necessary validation and API interaction to handle the password reset process.

## Functionality

The main component in this folder is `PasswordReset.tsx`, which provides a user interface for resetting passwords. It utilizes a form that captures the user's email, password, and password confirmation. The form is validated using a schema, and upon submission, it triggers the password reset mutation. If the reset link is invalid, an error message is displayed.

## Hooks

### `useResetPassword()`

The `useResetPassword` hook is responsible for managing the password reset process. It performs the following tasks:

- **Mutation Handling**: It uses the `useMutation` hook to define the mutation for resetting the password. The mutation sends a POST request to the `reset-password` endpoint with the user's data.
- **Success Notification**: Upon successful password reset, it displays a notification to the user indicating success.
- **Automatic Login**: After resetting the password, it automatically logs the user in using the provided email and new password.
- **Navigation**: Finally, it navigates the user to the home page after a successful reset and login.

This hook encapsulates the logic for interacting with the API and managing user feedback, making it reusable across different components.
