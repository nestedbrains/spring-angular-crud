import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http: HttpClient) { }


  public doRegisrtation(user) {
    return this.http.post('http://localhost:9090/register', user, { responseType: 'text' as 'json' });
  }

  public getAllUsers() {
    return this.http.get('http://localhost:9090/getAllUsers');
  }

  public deleteUser(id) {
    return this.http.delete('http://localhost:9090/cancel/' + id);
  }

  public getUsersByEmail(email) {
    return this.http.get('http://localhost:9090/findUser/' + email);
  }
}
