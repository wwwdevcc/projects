# Forgot Password Feature

## Overview

The `ForgotPassword` component is part of the authentication feature in the application. It allows users to request a password reset by entering their email address. This component utilizes React Query for managing the asynchronous operation of sending the reset link.

## Functionality

- **Form Handling**: The component uses `useForm` from Mantine to manage form state and validation, leveraging the `forgotPasswordSchema` from the shared schema.
- **React Query**: The `useForgotPassword` hook is employed to handle the mutation for sending the password reset request. It manages the loading state and error handling during the request, providing user feedback upon success.
- **User Feedback**: Visual feedback is given to the user while the request is being processed, ensuring a smooth user experience.

### useForgotPassword Hook

The `useForgotPassword` hook is a custom hook that utilizes React Query's `useMutation` to send a password reset request. It takes `ForgotPasswordFormValues` as input and makes a POST request to the `forgot-password` endpoint. Upon a successful request, it displays a notification confirming that the password recovery link has been sent.

## Schema and Types

The component uses the `forgotPasswordSchema` defined in the `@shared/schema` file to validate the email input. The corresponding type, `ForgotPasswordFormValues`, is inferred from this schema, ensuring type safety throughout the form handling process.
