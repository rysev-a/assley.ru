import { Component, OnInit } from '@angular/core';
import { TableComponent } from 'src/app/core/table/table.component';
import { UserService } from 'src/app/services/user.service';

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
    { name: 'nickname', label: 'Логин' },
  ];
}
