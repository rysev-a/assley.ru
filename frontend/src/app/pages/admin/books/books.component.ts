import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/core/table/table.component';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'admin-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass'],
})
export class AdminBooksComponent extends TableComponent implements OnInit {
  constructor(private bookSerivce: BookService) {
    super(bookSerivce);
  }
}
