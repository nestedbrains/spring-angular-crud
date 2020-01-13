import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserRegistrationService } from '../user-registration.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  users: any;
  email: string;

  constructor(private service: UserRegistrationService, private formBuilder: FormBuilder, private successMessage: NzMessageService) { }


  user: User = new User('', '', 0, '');
  message: any;

  registrationForm = this.formBuilder.group({
    name: [this.user.name , Validators.required],
    email: [this.user.email],
    experience: [this.user.experience],
    domain: [this.user.domain]
  });

  ngOnInit() {
    const resp = this.service.getAllUsers();
    resp.subscribe(data => this.users = data);
  }

  public registerNow() {
    const resp = this.service.doRegisrtation(this.registrationForm.value);
    resp.subscribe(data => {
      this.message = data;
      this.registrationForm.reset();
      this.successMessage.success('User Successfully Created ', {
        nzDuration: 5000
      });
    });
    this.ngOnInit();
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
