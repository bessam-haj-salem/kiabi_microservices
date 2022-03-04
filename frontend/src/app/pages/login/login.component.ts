import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/core/models/LoginResponse';
import { UserService } from 'src/app/core/services/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs = new SubSink()
  loginForm: FormGroup
  constructor(private userService:UserService, private fb:FormBuilder,private router: Router) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: null,
      password:null
    })

  }
 onSubmitLogin() {
   let formValue = this.loginForm.value
  //  console.log(formValue)
   this.subs.sink = this.userService.loginUser(formValue).subscribe(res  => {
    //  console.log(res)
     sessionStorage.setItem("token", res.token)
     sessionStorage.setItem("user", res.username)
     if(res.token) {
      this.router.navigate(['user'])
     }

   })
 }

  ngOnDestroy() {
  this.subs.unsubscribe()

  }

}
