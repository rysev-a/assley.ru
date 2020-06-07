import { Injectable } from '@angular/core';
import * as Cookie from 'js-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface AccountData {
  id: number;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  account: {
    email: string;
    id: string;
  };
  token: string;
}

export interface SignupResponse {
  status: string;
}

export interface ErrorResponse {
  error: any;
}

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  private loginUrl = 'api/v1/account/login';
  private signupUrl = 'api/v1/account/signup';
  private loadUrl = 'api/v1/account/load';

  data: AccountData;
  isAuth: boolean = false;
  isLoaded: boolean = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  load() {
    return this.http.get(this.loadUrl).subscribe(
      (response: { account: AccountData }) => {
        this.data = response.account;
        this.isAuth = true;
        this.isLoaded = true;
      },
      () => {
        this.isLoaded = true;
        this.isAuth = false;
      }
    );
  }

  login(data: LoginRequest): Observable<LoginResponse | ErrorResponse> {
    return this.http
      .post<LoginResponse>(this.loginUrl, data, this.httpOptions)
      .pipe(
        tap((response: LoginResponse) => {
          Cookie.set('Access-Token', response.token);
          return response;
        })
      );
  }

  signup(data: SignupRequest): Observable<SignupResponse | ErrorResponse> {
    return this.http.post<SignupResponse>(
      this.signupUrl,
      data,
      this.httpOptions
    );
  }

  setAccount(data) {
    this.data = data;
    this.isAuth = true;
  }

  logout() {
    Cookie.remove('Access-Token');
    this.isAuth = false;
    this.data = {
      id: 0,
      email: '',
    };
  }
}
