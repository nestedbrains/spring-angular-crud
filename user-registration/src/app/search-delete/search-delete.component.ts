import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../user-registration.service';

@Component({
  selector: 'app-search-delete',
  templateUrl: './search-delete.component.html',
  styleUrls: ['./search-delete.component.css']
})
export class SearchDeleteComponent implements OnInit {

  users: any;
  email: string;

  constructor(private service: UserRegistrationService) { }

  ngOnInit() {
    const resp = this.service.getAllUsers();
    resp.subscribe(data => this.users = data);
  }

  public delete(id: number) {
    if (id != null) {
      alert('Are u want to sure');
      const resp = this.service.deleteUser(id);
      resp.subscribe(data => this.users = data);
    }
  }

  public findByUserEmailid() {
    const resp = this.service.getUsersByEmail(this.email);
    resp.subscribe(data => this.users = data);
  }

}
