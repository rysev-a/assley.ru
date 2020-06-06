import { Component } from '@angular/core';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'Users';

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.load();
  }
}
