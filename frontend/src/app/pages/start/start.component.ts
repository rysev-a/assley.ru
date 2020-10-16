import { Component, OnInit } from '@angular/core';
import { BookSearchService } from 'src/app/services/search.service';
import { QueryParams, ApiServiceResponse } from 'src/app/core/api.service';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.sass'],
})
export class StartComponent implements OnInit {
  constructor(private bookSearchService: BookSearchService) {}

  processing: boolean = false;
  loaded: boolean = false;
  page = 1;
  pages = 0;
  limit = 10;
  items = [];
  filters = [];
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
  };

  setPage(page) {
    this.page = page;
    this.load();
  }

  load() {
    this.processing = true;
    console.log(this.filters);
    const queryParams: QueryParams = {
      pagination: {
        page: this.page,
        limit: this.limit,
      },
      filters: this.filters,
    };

    this.bookSearchService
      .list(queryParams)
      .subscribe((response: ApiServiceResponse) => {
        this.items = response.items;
        this.pages = response.pages;

        console.log(response.pages);
        console.log(this.pages);

        this.loaded = true;
        this.processing = false;
      });
  }

  setFilters(filters) {
    this.filters = filters;
  }

  ngOnInit(): void {
    const config = {
      pagination: {
        page: 1,
        limit: 6,
      },
    };

    this.load();
  }
}
