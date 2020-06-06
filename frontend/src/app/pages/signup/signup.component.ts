import { Component, OnInit } from '@angular/core';
import {
  faEnvelope,
  faLock,
  faUserPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  AccountService,
  SignupRequest,
} from 'src/app/services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUserPlus = faUserPlus;
  faUser = faUser;

  constructor(private accountService: AccountService) {}

  submit(data: SignupRequest) {
    this.accountService.signup(data).subscribe((response) => {
      console.log('response in component');
      console.log({ response });
    });
  }

  ngOnInit(): void {}
}
