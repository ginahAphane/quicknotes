# Library Books REST API

Base URL: `/api`

This API manages a library's books collection.

## Endpoints

### 1. List All Books
- **Method:** GET
- **Path:** /books
- **Description:** Retrieve a list of all books in the library.
- **Request Body:** None
- **Example Response (200 OK):**
```json
[
  { "id": 1, "title": "Things Fall Apart", "author": "Chinua Achebe", "year": 1958 },
  { "id": 2, "title": "Born a Crime", "author": "Trevor Noah", "year": 2016 }
]