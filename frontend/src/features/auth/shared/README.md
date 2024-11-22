## Overview

The `@shared` folder contains utility functions, types, and schemas that are used across the authentication feature of the application. It serves as a centralized location for shared logic, ensuring consistency and reusability throughout the codebase.

## Functionality

This folder includes the following files:

- **utils.ts**: Contains utility functions for managing authentication tokens using cookies.
- **types.ts**: Defines TypeScript types and interfaces related to authentication forms and responses.
- **schema.ts**: Contains validation schemas for various authentication-related forms using Zod.

## Functions in utils.ts

The `utils.ts` file provides the following functions for handling authentication tokens:

- **getToken**: Retrieves the authentication token from cookies. Returns the token if it exists, otherwise returns `undefined`.

- **setToken**: Stores the provided authentication token in cookies with a specified expiration of 30 days. It also sets security attributes based on the environment (production or development).

- **removeToken**: Deletes the authentication token from cookies, effectively logging the user out.

- **hasToken**: Checks if an authentication token exists in cookies. Returns `true` if a token is present, otherwise returns `false`.
