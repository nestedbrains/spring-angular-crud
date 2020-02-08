import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {UserRegistrationService} from '../user-registration.service';
import {FormBuilder, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  users: any;
  email: string;
  isVisible = false;

  constructor(
    private service: UserRegistrationService,
    private formBuilder: FormBuilder,
    private successMessage: NzMessageService,
    private modalService: NzModalService
  ) {
  }


  user: User = new User('', '', 0, '');
  message: any;

  registrationForm = this.formBuilder.group({
    name: [this.user.name, Validators.required],
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
      this.ngOnInit();
    });
  }


  public delete(id: number) {
    if (id != null) {
      this.modalService.confirm({
        nzTitle: 'Are you sure delete this People?',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => {
          const resp = this.service.deleteUser(id);
          resp.subscribe(data => this.users = data);
          this.successMessage.success('People Deleted Successfully', {
            nzDuration: 3000
          });
        },
        nzOnCancel: () => this.ngOnInit()
      });

    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  public findByUserEmailId() {
    const resp = this.service.getUsersByEmail(this.email);
    resp.subscribe(data => this.users = data);
  }


}
