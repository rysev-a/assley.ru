import { Component, OnInit } from '@angular/core';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  GenreService,
  Genre,
  GenreResponse,
  QueryParams,
} from 'src/app/services/genre.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.sass'],
})
export class GenresComponent implements OnInit {
  constructor(private genreSevice: GenreService) {}

  faPen = faPen;
  faTimes = faTimes;

  isProcessing: boolean = false;
  isLoaded: boolean = false;
  page = 1;
  pages = 0;
  limit = 10;

  genres: Genre[] = [];

  updatePage(page) {
    this.page = page;
    this.load();
  }

  load() {
    this.isProcessing = true;
    const queryParams: QueryParams = {
      pagination: {
        page: this.page,
        limit: this.limit,
      },
    };

    this.genreSevice
      .getGenres(queryParams)
      .subscribe((response: GenreResponse) => {
        this.genres = response.items;
        this.pages = response.pages;
        this.isLoaded = true;
        this.isProcessing = false;
      });
  }

  ngOnInit(): void {
    this.load();
  }
}
