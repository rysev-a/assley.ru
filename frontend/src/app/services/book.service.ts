import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
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
  items: Book[];
  pages: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookService extends ApiService {
  url = 'api/v1/books/';
}
