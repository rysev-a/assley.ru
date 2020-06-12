import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tag {
  id: number;
  name: string;
}

export interface TagResponse {
  status: string;
  items: Tag[];
  pages: number;
}

export interface QueryParams {
  pagination?: {
    page: number;
    limit: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private tagsUrl = 'api/v1/tags';

  getTags(queryParams: QueryParams = {}): Observable<TagResponse> {
    const queryString = Object.keys(queryParams)
      .map((key) => {
        return `${key}=${JSON.stringify(queryParams[key])}`;
      })
      .join('&');

    const requestURL = `${this.tagsUrl}?${queryString}`;
    return this.http.get<TagResponse>(requestURL);
  }
}
