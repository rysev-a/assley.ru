import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Genre {
  id: number;
  name: string;
}

export interface GenreResponse {
  status: string;
  items: Genre[];
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
export class GenreService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private genresUrl = 'api/v1/genres';

  getGenres(queryParams: QueryParams = {}): Observable<GenreResponse> {
    const queryString = Object.keys(queryParams)
      .map((key) => {
        return `${key}=${JSON.stringify(queryParams[key])}`;
      })
      .join('&');

    const requestURL = `${this.genresUrl}?${queryString}`;
    return this.http.get<GenreResponse>(requestURL);
  }
}
