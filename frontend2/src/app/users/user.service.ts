import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}
  getAllUsers(){
    return this.http.get('@baseUrl/users');
  }
  updatedAccount(id: string) {
    const url = '@baseUrl/users/' + id; 
    return this.http.patch(url, { id });
  }
}