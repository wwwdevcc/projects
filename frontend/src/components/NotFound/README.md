# NotFound Component

The `NotFound` component is a functional React component designed to display a user-friendly 404 error page when a route is not found in the application. It is integrated into the routing system using the `createRootRouteWithContext` function in the `__root.tsx` file.

## Usage

The `NotFound` component is specified as the `notFoundComponent` in the routing configuration. This means that whenever a user navigates to a route that does not exist, this component will be rendered.

### Features

- **User Navigation**: The component provides a button that allows users to navigate back to the previous page or to the home page, depending on their browsing history.
- **Styling**: It utilizes Mantine's UI components for consistent styling and layout.
