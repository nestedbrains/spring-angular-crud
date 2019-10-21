import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserRegistrationService } from '../user-registration.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private service: UserRegistrationService, private formBuilder: FormBuilder) { }


  user: User = new User('', '', 0, '');
  message: any;

  registrationForm = this.formBuilder.group({
    name: [this.user.name , Validators.required],
    email: [this.user.email],
    experience: [this.user.experience],
    domain: [this.user.domain]
  });

  ngOnInit() {
  }

  public registerNow() {
    const resp = this.service.doRegisrtation(this.registrationForm.value);
    resp.subscribe(data => {
      this.message = data;
      this.registrationForm.reset();
    });
  }

}
