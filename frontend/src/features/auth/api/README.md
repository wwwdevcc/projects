# auth.ts

This auth.ts file provides authentication functionalities. It leverages React Query for data fetching and state management.

## Features

- **User Query**: Fetches the authenticated user's data if a valid token is present.
- **Login**: Handles user login and stores the authentication token.
- **Register**: Manages user registration and displays success notifications.
- **Logout**: Logs the user out, removes the token, and updates the user state.
- **Forgot Password**: Sends a password recovery link to the user's email.
- **Reset Password**: Resets the user's password and logs them in automatically.

## Usage

- Import the hooks from this file to use authentication features in your components.

## Dependencies

- `@tanstack/react-query`: For data fetching and caching.
- `@mantine/notifications`: For displaying notifications.
