import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordHashService {
  constructor(private http: HttpClient) {}

  getMd5Digest(value: string): Observable<any> {
    return this.http.get(`https://api.hashify.net/hash/md5/hex?value=${value}`);
  }
}
