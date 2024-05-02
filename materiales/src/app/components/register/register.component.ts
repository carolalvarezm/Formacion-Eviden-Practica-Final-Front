import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userModel } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
constructor(){

}
register(form:NgForm){
  const user:userModel={
    username:form.value.username,
    password:form.value.password,
    email:form.value.email,
    firstname:form.value.firstname,
    lastname:form.value.lastname
  }
  console.log(user);

}
}
