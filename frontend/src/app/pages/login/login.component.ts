import { Component, OnInit } from '@angular/core';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import {
  AccountService,
  LoginRequest,
  LoginResponse,
} from 'src/app/services/account.service';

interface LoginErrors {
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  faEnvelope = faEnvelope;
  faLock = faLock;
  errors: LoginErrors = {
    email: '',
    password: '',
  };

  submit(data: LoginRequest) {
    this.accountService.login(data).subscribe(
      () => {
        this.router.navigate(['/profile']);
      },
      (response) => {
        if (response.error && response.error.message) {
          this.errors = response.error.message;
        }
      }
    );
  }

  ngOnInit(): void {}
}
