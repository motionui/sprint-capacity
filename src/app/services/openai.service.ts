import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenaiService {
  private httpClient = inject(HttpClient);

  private endpoint = 'http://localhost:3000/api/roles';

  generateRoleDescription = (role: string): Observable<string> => {
    return this.httpClient
      .post<{ result: string }>(`${this.endpoint}/generateRoleDescription`, { role })
      .pipe(map(({ result }) => result));
  };
}
