import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/core/table/table.component';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'admin-authors',
  templateUrl: '../../../core/table/table.component.html',
  styleUrls: ['./authors.component.sass'],
})
export class AuthorsComponent extends TableComponent implements OnInit {
  constructor(private authorSerivce: AuthorService) {
    super(authorSerivce);
  }

  title = 'Авторы';
}
