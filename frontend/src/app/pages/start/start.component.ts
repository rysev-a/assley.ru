import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.sass'],
})
export class StartComponent implements OnInit {
  constructor(private bookService: BookService) {}

  books = [];
  publicUrl = environment.publicUrl;

  limitText = (text, max) => {
    let length = 0;
    let result = '';
    const chunks = text.split(' ');
    chunks.reverse();
    
    while (length < max && chunks.length > 0) {
      const word = chunks.pop();

      result = `${result} ${word}`;
      length = length + word.length;
    }

    if (chunks.length) {
      result = `${result}...`;
    }

    return result;
  }

  ngOnInit(): void {
    this.bookService
      .list({
        pagination: {
          page: 1,
          limit: 50,
        },
      })
      .subscribe((response: any) => {
        this.books = response.items;
      });
  }
}
