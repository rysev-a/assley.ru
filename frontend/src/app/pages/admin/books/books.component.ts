import { faPen, faTimes, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { QueryParams, ApiServiceResponse } from 'src/app/core/api.service';
import { MessageService } from 'src/app/services/message.service';
import { Component } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'admin-book-list',
  templateUrl: './books.component.html',
})
export class AdminBooksComponent {
  constructor(
    public messageService: MessageService,
    private bookService: BookService
  ) {}

  // icons
  faPen = faPen;
  faTimes = faTimes;
  faPenNib = faPenNib;

  processing: boolean = false;
  loaded: boolean = false;
  page = 1;
  pages = 0;
  limit = 10;
  items = [];

  setPage(page) {
    this.page = page;
    this.load();
  }

  load() {
    this.processing = true;
    const queryParams: QueryParams = {
      pagination: {
        page: this.page,
        limit: this.limit,
      },
    };

    this.bookService
      .list(queryParams)
      .subscribe((response: ApiServiceResponse) => {
        this.items = response.items;
        this.pages = response.pages;
        this.loaded = true;
        this.processing = false;
      });
  }

  remove(id) {
    this.processing = true;
    this.bookService.remove(id).subscribe(() => {
      this.load();
    });
  }

  ngOnInit(): void {
    this.load();
  }
}
