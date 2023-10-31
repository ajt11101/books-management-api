# books-management-api
This is a RESTAPI for book management system which allows to perform various CRUD operations such as:  
1-Add a new book (title, author, summary)  
2-View a list of all books  
3-View details of a specific book by its ID  
4-Update a book's details  
5-Delete a book.  
## routes for performing various operations
GET Request for fetching all books : /api/book/fetchallbooks  
POST Request for adding a book : /api/book/addbook  
GET Request for fetching book with given id : /api/book/specificbook/:id  
PUT Request for updating book details with given id : /api/book/updatebook/:id  
DELETE Request for deleting book with given id : /api/book/deletebook/:id




