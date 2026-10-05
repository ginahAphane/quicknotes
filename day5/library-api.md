# Library API - Books Resource

Base URL: `/api`

## Endpoints

### 1. List Books
- **Method:** GET
- **Path:** /books
- **Description:** Get all books
- **Success Code:** 200 OK

### 2. Get One Book
- **Method:** GET
- **Path:** /books/:id
- **Description:** Get a single book by ID
- **Success Code:** 200 OK

### 3. Create Book
- **Method:** POST
- **Path:** /books
- **Description:** Create a new book
- **Request Body:** { "title": "1984", "author": "George Orwell", "year": 1949 }
- **Success Code:** 201 Created

### 4. Update Book
- **Method:** PUT
- **Path:** /books/:id
- **Description:** Update an existing book
- **Request Body:** { "title": "Updated Title" }
- **Success Code:** 200 OK

### 5. Delete Book
- **Method:** DELETE
- **Path:** /books/:id
- **Description:** Delete a book
- **Success Code:** 204 No Content

### 6. List Books by Author
- **Method:** GET
- **Path:** /books?author=George Orwell
- **Description:** List books filtered by author query parameter
- **Success Code:** 200 OK

## Error Codes

- **400 Bad Request** - Example: { "error": "Missing required field: title" }
- **404 Not Found** - Example: { "error": "Book with id 99 not found" }