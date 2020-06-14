import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

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
export class TagService extends ApiService {
  url = '/api/v1/tags';
}
