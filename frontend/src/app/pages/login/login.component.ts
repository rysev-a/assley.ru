import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  constructor(private accountService: AccountService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  faEnvelope = faEnvelope;
  faLock = faLock;
  errors = {};

  get controls() {
    return this.loginForm.controls;
  }

  setErrors(errors) {
    Object.keys(errors).map((key) => {
      const control = this.loginForm.get(key);
      control.setErrors({ message: errors[key] });
    });
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(
      () => {
        this.router.navigate(['/profile']);
      },
      (response) => {
        if (response.error && response.error.message) {
          this.setErrors(response.error.message);
        }
      }
    );
  }

  ngOnInit(): void {}
}
