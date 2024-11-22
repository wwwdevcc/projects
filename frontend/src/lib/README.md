# README for `@lib` Folder

## Overview

The `@lib` folder contains utility functions and configurations that support the frontend application. It is designed to encapsulate reusable code, making it easier to maintain and manage shared functionalities across different components of the application. This folder includes files for API client configuration and theming, which are essential for handling API requests and defining the application's visual style.

## Functionality

The primary purpose of the files in the `@lib` folder is to provide a centralized location for managing API interactions and theming. The `api-client.ts` file is responsible for setting up the API client using the `ky` library, while the `theme.ts` file defines the application's theme using Mantine's theming capabilities. This structure promotes a clean architecture by separating concerns and adhering to best practices.

## Functions in `api-client.ts`

### `hasCSRFToken`

This function checks if a CSRF token is present in the cookies. It returns a boolean indicating the presence of the token.

### `initCSRF`

This asynchronous function initializes the CSRF token by making a GET request to the specified endpoint if the token is not already present.

### `api`

The `api` constant is an instance of the `ky` HTTP client configured with hooks for handling requests and responses. The hooks include:

- **beforeRequest**: This hook adds an `Authorization` header to the request if a token is available. It retrieves the token using `auth.getToken()` and sets it in the request headers.

- **afterResponse**: This hook checks the response status. If the status is `401`, it calls displays a notification that the user is unauthorized to make this action.

- **beforeError**: This hook handles errors that occur during the request. If an error response is received, it attempts to parse the error message. If successful, it displays a notification with the error message. If parsing fails, it shows a generic error message.

The hooks ensure that the application can gracefully handle authentication and error scenarios, providing a better user experience.
