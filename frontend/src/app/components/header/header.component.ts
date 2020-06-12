import { Component, OnInit } from '@angular/core';
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faCog,
  faWrench,
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
  faWrench = faWrench;

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
    { name: 'Манги', url: 'books/manga' },
    { name: 'Манхвы', url: 'books/manhwa' },
    { name: 'Маньхуа', url: 'books/manhua' },
    { name: 'OEL-манги', url: 'books/oel' },
    { name: 'Синглов', url: 'books/singles' },
  ];

  get email() {
    return (this.account.data && this.account.data.email) || '';
  }

  ngOnInit(): void {}
}
