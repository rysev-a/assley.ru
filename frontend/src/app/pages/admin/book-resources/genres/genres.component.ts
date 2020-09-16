import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import {} from 'src/app/services/author.service';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'admin-genres',
  templateUrl: './genres.component.html',
})
export class GenresComponent {
  apiService: ApiService;
  constructor(private genreService: GenreService) {
    this.apiService = genreService;
  }

  tableTitle = 'Жанры';
  addFormPlaceholder = 'Добавить жанр';
  itemTitle = 'Жанр';
}
