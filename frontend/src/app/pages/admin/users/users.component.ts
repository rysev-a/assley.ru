import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/core/table/table.component';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  url = 'api/v1/users/';
}

@Component({
  selector: 'admin-users',
  templateUrl: '../../../core/table/table.component.html',
  styleUrls: ['./users.component.sass'],
})
export class UsersComponent extends TableComponent implements OnInit {
  constructor(private userSerivce: UserService) {
    super(userSerivce);
  }

  title = 'Пользователи';
  fields = [
    { name: 'email', label: 'Электронный адрес' },
    { name: 'first_name', label: 'Имя' },
    { name: 'last_name', label: 'Фамилия' },
  ];
}
