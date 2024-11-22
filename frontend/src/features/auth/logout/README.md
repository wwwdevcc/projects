## Overview

The `Logout.tsx` file is a React functional component responsible for handling user logout functionality in the application. It utilizes the `useLogout` hook from the `auth` API to perform the logout operation and navigate the user to the login page upon successful logout.

## Functionality

The `Logout` component renders a button that, when clicked, triggers the `handleLogout` function. This function calls the `logout` mutation, which sends a logout request to the server. If the request is successful, the user is redirected to the login page. If an error occurs during the logout process, it is logged to the console.

## Hooks

### `useLogout()`

The `useLogout` hook is a custom hook that encapsulates the logic for logging out a user. It uses the `useMutation` hook from React Query to handle the asynchronous logout operation. The hook performs the following actions:

- Sends a POST request to the `logout` endpoint.
- Clears the user data from the query cache.
- Removes the authentication token from cookies.

This hook simplifies the logout process by managing the mutation state and side effects related to user authentication.
