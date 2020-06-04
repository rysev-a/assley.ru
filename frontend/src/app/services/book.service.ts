import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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

  private booksUrl = 'api/v1/books';

  getBooks(): Observable<BookResponse> {
    console.log('make request');
    return this.http.get<BookResponse>(this.booksUrl).pipe(
      tap((_) => console.log('fetched books')),
      catchError(this.handleError<BookResponse>('getBooks'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
