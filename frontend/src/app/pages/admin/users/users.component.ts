import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
})
export class UsersComponent {
  constructor(private userSerivce: UserService) {}

  title = 'Пользователи';
  fields = [
    { name: 'email', label: 'Электронный адрес' },
    { name: 'nickname', label: 'Логин' },
  ];
}
