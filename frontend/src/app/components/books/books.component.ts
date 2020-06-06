import { Component, OnInit } from '@angular/core';
import { BookService, Book, BookResponse } from '../../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass'],
})
export class BooksComponent implements OnInit {
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }
  books: Book[] = [];

  getBooks() {
    this.bookService.getBooks().subscribe(
      (response) => {
        this.books = response.books;
      },
      (error) => {
        console.log("Can't load books");
      }
    );
  }
}
