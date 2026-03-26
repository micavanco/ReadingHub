import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiBooksResponse } from '../interfaces/api-books-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient: HttpClient = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/v1';

  loadBooks(): Observable<ApiBooksResponse> {
    return this.httpClient.get<ApiBooksResponse>(
      `${this.API_URL}/books`,
    );
  }
}
