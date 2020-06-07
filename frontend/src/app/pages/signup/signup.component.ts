import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faEnvelope,
  faLock,
  faUserPlus,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  AccountService,
  SignupRequest,
  LoginResponse,
} from 'src/app/services/account.service';

interface SignupErrors {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  accept: any;
}

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

  errors: SignupErrors = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    accept: false,
  };

  constructor(private accountService: AccountService, private router: Router) {}

  submit(data) {
    if (this.validate(data)) {
      this.accountService.signup(this.serializeData(data)).subscribe(
        () => {
          this.accountService
            .login({ email: data.email, password: data.password })
            .subscribe((response: LoginResponse) => {
              this.accountService.setAccount(response.account);
              this.router.navigate(['/profile']);
            });
        },
        ({ error: { message } }) => {
          this.errors = message;
        }
      );
    }
  }

  validateEmail(email) {
    if (!SignupComponent.checkEmail(email)) {
      this.errors.email = 'Неверный формат email';
    }
  }

  static checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validate({ email, first_name, last_name, password, accept }) {
    console.log(accept);

    const values = { email, first_name, last_name, password, accept };

    this.errors = {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      accept: false,
    };
    if (!SignupComponent.checkEmail(email)) {
      this.errors.email = 'Неверный формат email';
    }

    ['first_name', 'last_name', 'password'].map((field) => {
      if (values[field].length === 0) {
        this.errors[field] = 'Необходимо заполнить поле';
      }
    });

    if (!accept) {
      this.errors.accept = 'Необходимо принять соглашение';
    }

    if (Object.values(this.errors).some((error) => error.length > 0)) {
      return false;
    }

    return true;
  }

  serializeData(data): SignupRequest {
    return {
      email: data.email,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name,
    };
  }

  ngOnInit(): void {}
}
