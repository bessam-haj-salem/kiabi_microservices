import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/core/models/User.model';
import { UserService } from 'src/app/core/services/user.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  private subs = new SubSink()
  users: User[] = []
  private idUser:number
  public boolListForm: boolean = true
  public boolAddForm: boolean = true

  public boolEditForm: boolean = false
  public boolTablesForm: boolean = true
  public userSelected: User
  editForm: FormGroup

  constructor(private userService:UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.listUsers()
    this.editForm = this.fb.group({
      username: null,
      email: null,
      password: null,
      
  
  
    })
  }
  listUsers() {
    this.subs.sink = this.userService.getUsers().subscribe((users: any) => {
      if (users.collection != undefined) {
          
        this.users = users.collection;
      } else {
        this.users = users;
      }
  
    })
   }
   openAddForm() {
    this.boolAddForm = true
    this.boolEditForm = false
    this.boolListForm = false
   }
   closeAddForm() {
    this.boolAddForm = false
    this.boolEditForm = false
    this.boolTablesForm = true
    this.boolListForm = true
   }
   updateUser(id) {
    let idclient = id
    this.idUser = id
    let users = this.users
    for(let i = 0; i < users.length; i++) {
      if(users[i].id === idclient) {
        this.userSelected = users[i]
      }
    }
    console.log(this.userSelected);
    this.boolTablesForm = true
    this.boolListForm = false
    this.boolEditForm = true
   }
   deleteUser(id) {
    console.log(id);
    this.subs.sink = this.userService.deleteUser(id).subscribe(res => {
      console.log(res);
      this.listUsers()
    })
   }
   onSubmitEdit(){
    let formValue = this.editForm.value
    formValue["id"] = this.idUser
    console.log(formValue);
    this.subs.sink = this.userService.updateUser(formValue).subscribe(res => {
      this.editForm.reset()
      this.listUsers()
      
      console.log(res);
    })
   }
  }
