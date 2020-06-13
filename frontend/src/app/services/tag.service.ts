import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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

  remove(tagId) {
    return this.http.delete(`${this.tagsUrl}/${tagId}`);
  }

  addTag(tag) {
    return this.http.post(this.tagsUrl, tag, this.httpOptions);
  }

  update(tag) {
    const url = `${this.tagsUrl}/${tag.id}`;
    return this.http.put(url, { name: tag.name }, this.httpOptions);
  }
}
