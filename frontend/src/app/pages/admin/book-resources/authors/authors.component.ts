import { Component } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'admin-authors',
  templateUrl: './authors.component.html',
})
export class AuthorsComponent {
  apiService: ApiService;
  constructor(private authorService: AuthorService) {
    this.apiService = authorService;
  }

  tableTitle = 'Авторы';
  addFormPlaceholder = 'Добавить автора';
  itemTitle = 'Автор';
}
