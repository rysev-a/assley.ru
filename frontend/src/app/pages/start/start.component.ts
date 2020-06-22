import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.sass'],
})
export class StartComponent implements OnInit {
  constructor(private bookService: BookService) {}

  books = [];

  ngOnInit(): void {
    this.bookService.list().subscribe((response: any) => {
      this.books = response.items;
    });
  }
}
