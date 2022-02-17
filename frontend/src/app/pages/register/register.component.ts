import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private subs = new SubSink()
  addForm: FormGroup
  constructor(private fb: FormBuilder, private userService: UserService, private router:Router) { }

  ngOnInit():void {
    this.addForm = this.fb.group({
      username: null,
      password: null,
      email:null
    })

  }
onSubmitAdd(){
  let formValue = this.addForm.value
  console.log(formValue)

  this.subs.sink = this.userService.addUser(formValue).subscribe(res => {

    console.log(res)
    this.router.navigate(['login'])
  })
}

ngOnDestroy(): void {
    this.subs.unsubscribe()
}
}
