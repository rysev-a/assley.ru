import { Component, OnInit } from '@angular/core';
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';

interface Link {
  url: string;
  name: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(private account: AccountService) {}

  faUserPlus = faUserPlus;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;

  categories: Link[] = [
    { name: 'Манги', url: 'manga' },
    { name: 'Манхвы', url: 'manga' },
    { name: 'Маньхуа', url: 'manga' },
    { name: 'OEL-манги', url: 'manga' },
    { name: 'Руманга', url: 'manga' },
    { name: 'Комикс западный', url: 'manga' },
    { name: 'Синглов', url: 'manga' },
    { name: 'Весь', url: 'manga' },
    { name: 'Случайный тайтл', url: 'manga' },
  ];

  ngOnInit(): void {}
}
