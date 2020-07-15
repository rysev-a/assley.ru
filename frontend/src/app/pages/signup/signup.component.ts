import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

import { FormControl, FormGroup } from '@angular/forms';
import { ApiServiceResponse } from 'src/app/core/api.service';

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
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

interface SignupErrors {
  email: string;
  nickname: string;
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

  signupForm: FormGroup;

  errors: SignupErrors = {
    email: '',
    nickname: '',
    password: '',
    accept: false,
  };

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  get controls() {
    return this.signupForm.controls;
  }

  submit() {
    const formData = this.signupForm.value;
    this.accountService.signup(this.serializeData(formData)).subscribe(
      () => {
        this.accountService
          .login({ email: formData.email, password: formData.password })
          .subscribe((response: LoginResponse) => {
            this.accountService.setAccount(response.account);
            this.router.navigate(['/profile']);
          });
      },
      (response) => {
        this.messageService.add({
          status: 'danger',
          content: 'Что-то пошло не так, попробуйте повторить регистрацию',
        });

        const {
          error: { message },
        } = response;

        console.log(message);
      }
    );
  }

  validateEmail(control) {
    if (!SignupComponent.checkEmail(control.value)) {
      return { message: 'Неверный формат email' };
    }

    return null;
  }

  static checkEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  serializeData(data): SignupRequest {
    return {
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    };
  }

  validateIsFieldExist = (field) => (control) => {
    return this.userService
      .list({
        filters: [
          {
            value: control.value,
            key: field,
            operator: '==',
          },
        ],
      })
      .pipe(
        map((response: ApiServiceResponse) => {
          if (response.items.length > 0) {
            return {
              message: `Такой ${field} уже существует`,
            };
          }
          return null;
        })
      );
  };

  isAccepted(control) {
    return control.value === false
      ? { message: 'Необходимо принять соглашение' }
      : null;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      nickname: new FormControl('', {
        asyncValidators: [this.validateIsFieldExist('nickname')],
      }),
      email: new FormControl('', {
        validators: [this.validateEmail],
        asyncValidators: [this.validateIsFieldExist('email')],
      }),
      password: new FormControl('', [Validators.minLength(8)]),
      accept: new FormControl(false, [this.isAccepted]),
    });
  }

  onSubmit() {
    console.log('submit');
  }
}
