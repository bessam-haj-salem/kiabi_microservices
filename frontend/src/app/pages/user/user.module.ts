import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAllComponent } from './user-all/user-all.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './user.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    
    UserAllComponent,
    ListUsersComponent,
    UpdateUsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,

  ]
})
export class UserModule { }
