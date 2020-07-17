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
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private account: AccountService,
    private sectionService: SectionService,
    private router: Router
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

  hideHeader = false;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (/\/books\/[0-9]+\/read/i.test(window.document.location.pathname)) {
          this.hideHeader = true;
        } else {
          this.hideHeader = false;
        }
      }
    });

    this.sectionService.list().subscribe(({ items }: ApiServiceResponse) => {
      this.sections = items;
    });
  }
}
