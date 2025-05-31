// Task 1: MongoDB Setup
use plp_bookstore
db.createCollection("books")



// Task 2: Basic CRUD Operations
// 1. Find all books in a specific genre
// Find all Fiction books
db.books.find({ genre: "Fiction" })

// 2. Find books published after a certain year
// Find books published after 2000
db.books.find({ published_year: { $gt: 2000 } })

// 3. Find books by a specific author
// Find books by a specific author
db.books.find({ author: "George Orwell" })

// 4. Update the price of a specific book
// Update the price of "The Alchemist" to 15.99
db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 15.99 } }
)

// 5. Delete a book by its title
// Delete "Moby Dick"
db.books.deleteOne({ title: "Moby Dick" })




// Task 3: Advanced MongoDB Queries
// 1. Find books that are both in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// 2. Use projection to return only the title, author, and price fields
db.books.find(
  {}, 
  { _id: 0, title: 1, author: 1, price: 1 }
)

// 3. Sort books by price (ascending)
db.books.find().sort({ price: 1 })

// 4. Sort books by price (descending)
db.books.find().sort({ price: -1 })

// 5. Pagination — 5 books per page
// Page 1
db.books.find().skip(0).limit(5)
// Page 2
db.books.find().skip(5).limit(5)
// Page 3
db.books.find().skip(10).limit(5)





// Task 4: Aggregation Pipeline
// 1. Average Price of Books by Genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      average_price: { $avg: "$price" }
    }
  },
  {
    $sort: { average_price: -1 } // Optional: sort from highest to lowest
  }
])


// 2. Find the Author with the Most Books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      book_count: { $sum: 1 }
    }
  },
  {
    $sort: { book_count: -1 }
  },
  {
    $limit: 1
  }
])

// 3. Group Books by Publication Decade and Count Them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [ { $floor: { $divide: ["$published_year", 10] } }, 10 ] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      book_count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
])






// Task 5: Indexing
// 1. Create an Index on the title Field
db.books.createIndex({ title: 1 })

// 2. Create a Compound Index on author and published_year
//Useful when queries filter by both fields, such as:
db.books.find({ author: "George Orwell", published_year: { $gte: 1945 } })
// Create the compound index:
db.books.createIndex({ author: 1, published_year: -1 })


// 3. Use explain() to Compare Query Performance
// Without index:
db.books.find({ title: "1984" }).explain("executionStats")
// With index in place:
db.books.find({ title: "1984" }).explain("executionStats")







