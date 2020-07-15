import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ApiService {
  url = 'api/v1/users/';
}
