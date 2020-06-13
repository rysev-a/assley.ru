import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DevService {
  constructor(private httpClient: HttpClient) {}

  private devUrl = 'api/v1/dev/command';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  runCommand(command) {
    return this.httpClient.post(this.devUrl, { command }, this.httpOptions);
  }
}
