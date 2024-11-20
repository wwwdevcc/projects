# Project Hub API

**Project Hub API** is the backend service for **Project Hub**, a platform that connects developers with exciting projects seeking collaborators. Whether you're a developer looking to contribute to meaningful projects or have your own project that needs a team, Project Hub makes collaboration easy.

This API powers the core functionality of the platform, including project listings, user profiles, and collaboration requests. It serves as the foundation for the React-based frontend application, ensuring seamless data exchange and a robust, scalable backend architecture.

## Features

-   RESTful API endpoints for resource management.
-   Authentication and authorization using **Laravel Sanctum**.
-   Centralized error handling for consistent API responses.
-   Flexible and extensible architecture for future scalability.

## Requirements

-   **PHP**: 8.1 or higher
-   **Composer**: Latest version
-   **SQLite** or another supported database

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/wwwdevcc/projects.git
    cd backend
    ```

2. Install dependencies:

    ```bash
    composer install
    ```

3. Configure the environment:

    - Copy .env.example to .env

    ```bash
    cp .env.example .env
    ```

    - Update .env with your database and application settings.

4. Generate the application key:

    ```bash
    php artisan key:generate
    ```

5. Migrate the database:
    ```
    php artisan migrate
    ```

## Usage

1. Start the development server:

    ```bash
    php artisan serve
    ```

    The API will be accessible at: http://127.0.0.1:8000

2. Test API endpoints using tools like **Postman** or **cURL**

## License

This project is open-source and available under the MIT License.
