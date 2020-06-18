SELECT
books.id,
books.title,
books_genres.id,
books_genres.book_id,
books_genres.genre_id,
genres.id,
genres.name,
tags.name
FROM books LEFT OUTER JOIN
  books_genres
    ON books.id = books_genres.book_id
      LEFT OUTER JOIN genres
        ON genres.id = books_genres.genre_id

    LEFT OUTER JOIN
      books_tags
    ON books.id = books_tags.book_id
      LEFT OUTER JOIN tags
        ON tags.id = books_tags.tag_id
          ORDER BY books.id ASC
