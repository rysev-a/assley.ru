import { Component, OnInit } from '@angular/core';
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faCog,
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
  faCog = faCog;

  logout() {
    this.account.logout();
  }

  isAccountAuth() {
    return this.account.isAuth;
  }

  isAccountLoaded() {
    return this.account.isLoaded;
  }

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

  get email() {
    return (this.account.data && this.account.data.email) || '';
  }

  ngOnInit(): void {}
}
