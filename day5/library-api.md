# Library Books REST API

Base URL: /api

### 1. List All Books
- **Method:** GET
- **Path:** /books
- **Description:** Retrieve a list of all books
- **Example Response (200 OK):**
[{"id":1,"title":"Things Fall Apart","author":"Chinua Achebe"}]

### 2. List Books by Author
- **Method:** GET
- **Path:** /books?author={authorName}
- **Description:** Filter books by author using query parameter
- **Example Response (200 OK):**
[{"id":2,"title":"Born a Crime","author":"Trevor Noah"}]

### 3. Get One Book
- **Method:** GET
- **Path:** /books/:id
- **Description:** Retrieve a single book by ID
- **Example Response (200 OK):**
{"id":1,"title":"Things Fall Apart","author":"Chinua Achebe"}

### 4. Create a New Book
- **Method:** POST
- **Path:** /books
- **Description:** Add a new book
- **Example Request Body:**
{"title":"The Alchemist","author":"Paulo Coelho","year":1988}
- **Example Response (201 Created):**
{"id":3,"title":"The Alchemist","author":"Paulo Coelho"}

### 5. Update a Book
- **Method:** PUT
- **Path:** /books/:id
- **Description:** Update existing book details
- **Example Request Body:**
{"title":"Things Fall Apart","available":false}
- **Example Response (200 OK):**
{"id":1,"title":"Things Fall Apart","available":false}

### 6. Delete a Book
- **Method:** DELETE
- **Path:** /books/:id
- **Description:** Remove a book by ID
- **Example Response (204 No Content):** No body