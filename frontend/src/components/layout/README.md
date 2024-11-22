# Layout Component Documentation

## Overview

The `Layout` component serves as the foundational container for the application, providing a consistent structure and navigation across different views. It integrates various UI elements such as headers, navigation bars, and main content areas, ensuring a cohesive user experience.

## File Path

`frontend/src/components/layout/Layout.tsx`

## Key Features

- **Responsive Design**: The layout adapts to different screen sizes using the Mantine library's responsive components.
- **Theme Toggle**: Allows users to switch between light and dark themes.
- **Authentication Navigation**: Displays authentication-related navigation options based on user state.
- **Dynamic Content**: Utilizes the `Outlet` component from React Router to render nested routes dynamically.

## Component Structure

- **Header**: Contains the application logo, a burger menu for navigation, and the theme toggle.
- **Navbar**: Displays authentication navigation links.
- **Main Content Area**: Renders the current route's content.

## Usage

The `Layout` component is used within the `RootComponent` of the application's routing setup, ensuring that all routes are wrapped within this layout structure.
