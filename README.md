# Recipes Backend

Welcome to the backend part of the Recipes project! This section will guide you through the server-side components and functionalities that power the recipe search system.

## Table of Contents

1. [Introduction](#introduction)
2. [Technology Stack](#technology-stack)
3. [API Endpoints](#api-endpoints)
4. [Database](#database)
5. [Authentication](#authentication)
6. [Recipe Data](#recipe-data)
7. [User Data](#user-data)

## Introduction

The backend of the Recipes project serves as the foundation for the entire application. It handles data storage, retrieval, authentication, and other crucial operations required to support the frontend functionalities.

## Technology Stack
The backend is built using the following technologies:

Programming Language: JavaScript (Node.js)
Web Framework: Express.js (Node.js)
Database: MySQL
Authentication: JSON Web Tokens (JWT)

## API Endpoints

The backend exposes various API endpoints to cater to different frontend actions. Some of the key endpoints include:

- `/api/register`: Handles user registration.
- `/api/login`: Manages user login and authentication.
- `/api/recipes`: Provides recipe data, including search results and detailed recipe information.
- `/api/user/favorites`: Manages a user's favorite recipes.
- `/api/user/recipes`: Handles personal recipes created by users.
- `/api/user/family-recipes`: Manages family recipes saved by users.
- `/api/recipe/search`: Manages search for new recipes.

## Database

The MySQL database stores essential data for the application, including user information, recipe details, user favorites, personal recipes, and family recipes. Each entity is defined as a table, and relationships are established to ensure data integrity.

## Authentication

User authentication is achieved using JWT (JSON Web Tokens). Upon successful login, a JWT token is generated and provided to the user. This token is required for subsequent requests to protected endpoints, ensuring that only authenticated users can access certain features.

## Recipe Data

Recipe data is fetched from an external source, possibly using the Spoonacular API. This data includes recipe names, images, preparation time, dietary information, and other relevant details. The backend caches this data to reduce external API calls and enhance performance.

## User Data

User data, including favorites, personal recipes, and family recipes, is stored in the database. Each user has a unique identifier (username) and associated data. This allows users to save, manage, and retrieve their personalized recipe-related information.

Feel free to explore the backend's API endpoints, data management, and authentication mechanisms. By interacting with these components, you'll gain a deeper understanding of how the Grandma's Recipes project comes together to provide a seamless recipe search and management experience.
