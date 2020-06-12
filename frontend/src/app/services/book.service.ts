import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  release_year: number;
}

export interface BookResponse {
  status: string;
  books: Book[];
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private booksUrl = 'api/v1/books/';

  getBooks(): Observable<BookResponse> {
    return this.http.get<BookResponse>(this.booksUrl);
  }
}
