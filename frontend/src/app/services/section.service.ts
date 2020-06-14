import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

export interface Section {
  id: number;
  name: string;
}

export interface SectionResponse {
  status: string;
  items: Section[];
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
export class SectionService extends ApiService {
  url = '/api/v1/sections/';
}
