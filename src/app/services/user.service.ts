import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';
  private usersCache: { [key: number]: User } = {};
  private usersListCache: { [key: number]: User[] } = {};

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<{ data: User[] }> {
    // Check if users for the specific page are already cached
    if (this.usersListCache[page]) {
      return of({ data: this.usersListCache[page] });
    }

    return this.http.get<{ data: User[] }>(`${this.apiUrl}?page=${page}`).pipe(
      tap(response => {
        // Cache the fetched users list by page
        this.usersListCache[page] = response.data;
      })
    );
  }

  getUser(id: number): Observable<{ data: User }> {
    // Check if user details are already cached
    if (this.usersCache[id]) {
      return of({ data: this.usersCache[id] });
    }

    return this.http.get<{ data: User }>(`${this.apiUrl}/${id}`).pipe(
      tap(response => {
        // Cache the fetched user details
        this.usersCache[id] = response.data;
      })
    );
  }
}
