# Blog It Backend

The **Blog It Backend** is a secure and efficient API designed to support the Blog It platform. It provides endpoints for managing users and posts, with robust authentication and authorization using PassportJS and JWT.

## Features

- **User Authentication**: Secure signup, login, and logout.
- **Post Management**: Create, retrieve, update, delete, and publish/unpublish posts with fine-grained access control.
- **Database Integration**: Powered by Prisma and PostgreSQL for reliable and scalable data storage.
- **Protected Routes**: Ensures only authenticated users can access specific resources via PassportJS.
- **Latest Posts**: Fetch the latest published posts effortlessly.

---

## Tech Stack

- **Backend Framework**: Express.js
- **Database ORM**: Prisma
- **Authentication**: PassportJS with JWT
- **Database**: PostgreSQL

---

## API Endpoints

### Authentication

| Method | Endpoint  | Description                     |
| ------ | --------- | ------------------------------- |
| POST   | `/signup` | Register a new user             |
| POST   | `/login`  | Authenticate user and issue JWT |
| POST   | `/logout` | Log out a user                  |

---

### Users

| Method | Endpoint     | Description                                         |
| ------ | ------------ | --------------------------------------------------- |
| GET    | `/users/:id` | Fetch user details (protected)                      |
| GET    | `/users/me`  | Retrieve the current user's information (protected) |

---

### Posts

| Method | Endpoint             | Description                             |
| ------ | -------------------- | --------------------------------------- |
| GET    | `/posts`             | Retrieve all posts                      |
| GET    | `/posts/latest`      | Retrieve 10 latest published posts      |
| GET    | `/posts/:id`         | Retrieve a specific post (protected)    |
| POST   | `/posts`             | Create a new post (protected)           |
| PUT    | `/posts/:id`         | Update a post (protected)               |
| DELETE | `/posts/:id`         | Delete a post (protected)               |
| PUT    | `/posts/:id/publish` | Publish or unpublish a post (protected) |

---

## License

This project is licensed under the MIT License.
