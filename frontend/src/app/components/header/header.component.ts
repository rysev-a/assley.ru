import { Component, OnInit } from '@angular/core';
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faCog,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';

import { SectionService } from 'src/app/services/section.service';
import { ApiServiceResponse } from 'src/app/core/api.service';

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
  constructor(
    private account: AccountService,
    private sectionService: SectionService
  ) {}

  sections = [];

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

  get email() {
    return (this.account.data && this.account.data.email) || '';
  }

  ngOnInit(): void {
    this.sectionService.list().subscribe(({ items }: ApiServiceResponse) => {
      this.sections = items;
    });
  }
}
