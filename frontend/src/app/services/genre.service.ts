import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

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
export class GenreService extends ApiService {
  url = '/api/v1/genres';
}
