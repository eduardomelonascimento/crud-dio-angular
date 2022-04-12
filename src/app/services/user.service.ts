import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'https://sheet.best/api/sheets/5e7abead-76bd-4de7-a04b-f8b852faed84'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  // Read
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl)
  }

  // Create
  postUser(User: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, User, this.httpOptions)
  }

  // Delete
  deleteUser(id: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.apiUrl}/id/${id}`)
  }

  //update

  updateUser(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/id/${id}`, user, this.httpOptions);
  }

  //Get User By Id
  retrieveById(id: string):Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/id/${id}`)
  }

}
