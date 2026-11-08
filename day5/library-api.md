# Library Books REST API Design

Base path: `/api/books`

## Endpoints

- **List books**
  - Method: `GET`
  - Path: `/api/books`
  - Description: Returns a list of books.
  - Success status: `200 OK`
  - Example request body: Not required.

- **Get one book**
  - Method: `GET`
  - Path: `/api/books/{id}`
  - Description: Returns the book with the specified ID.
  - Success status: `200 OK`
  - Example request body: Not required.

- **Create a book**
  - Method: `POST`
  - Path: `/api/books`
  - Description: Adds a new book to the library.
  - Example request body:
    ```json
    {
      "title": "Things Fall Apart",
      "author": "Chinua Achebe",
      "publishedYear": 1958
    }
    ```
  - Success status: `201 Created`

- **Update a book**
  - Method: `PUT`
  - Path: `/api/books/{id}`
  - Description: Replaces the details of an existing book.
  - Example request body:
    ```json
    {
      "title": "Things Fall Apart",
      "author": "Chinua Achebe",
      "publishedYear": 1958
    }
    ```
  - Success status: `200 OK`

- **Delete a book**
  - Method: `DELETE`
  - Path: `/api/books/{id}`
  - Description: Deletes the book with the specified ID.
  - Success status: `204 No Content`

- **List books by author**
  - Method: `GET`
  - Path: `/api/books?author=Chinua%20Achebe`
  - Description: Returns books whose author matches the `author` query parameter.
  - Success status: `200 OK`
  - Example request body: Not required.

## Error Responses

- **`400 Bad Request`**: The request contains invalid data, for example a create request is missing the required `title` field.
- **`404 Not Found`**: The requested book ID does not exist, for example `GET /api/books/9999`.
