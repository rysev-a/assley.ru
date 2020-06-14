import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface SearchFilter {
  key: string;
  value: string;
  operator: string;
}

export interface QueryParams {
  pagination?: {
    page: number;
    limit: number;
  };
  filters?: SearchFilter[];
}

export interface ApiServiceResponse {
  items: any[];
  status: string;
  pages: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  url = 'api/v1';

  list(queryParams: QueryParams = {}) {
    const queryString = Object.keys(queryParams)
      .map((key) => {
        return `${key}=${JSON.stringify(queryParams[key])}`;
      })
      .join('&');

    const requestURL = `${this.url}?${queryString}`;
    return this.http.get(requestURL);
  }

  remove(id) {
    return this.http.delete(`${this.url}/${id}`);
  }

  add(item) {
    return this.http.post(this.url, item, this.httpOptions);
  }

  update(item) {
    const url = `${this.url}/${item.id}`;
    return this.http.put(url, item, this.httpOptions);
  }
}
