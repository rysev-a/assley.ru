import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
export class SectionService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private sectionsUrl = 'api/v1/sections';

  getSections(queryParams: QueryParams = {}): Observable<SectionResponse> {
    const queryString = Object.keys(queryParams)
      .map((key) => {
        return `${key}=${JSON.stringify(queryParams[key])}`;
      })
      .join('&');

    const requestURL = `${this.sectionsUrl}?${queryString}`;
    return this.http.get<SectionResponse>(requestURL);
  }

  remove(sectionId) {
    return this.http.delete(`${this.sectionsUrl}/${sectionId}`);
  }

  addSection(section) {
    return this.http.post(this.sectionsUrl, section, this.httpOptions);
  }

  update(section) {
    const url = `${this.sectionsUrl}/${section.id}`;
    return this.http.put(url, { name: section.name }, this.httpOptions);
  }
}
