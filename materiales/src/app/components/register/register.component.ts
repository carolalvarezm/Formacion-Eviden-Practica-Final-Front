import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { registeRequest } from '../../models/registerRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
constructor(){

}
register(form:NgForm){
  const user:registeRequest={
    username:form.value.username,
    password:form.value.password,
    email:form.value.email,
    firstname:form.value.firstname,
    lastname:form.value.lastname
  }
  console.log(user);

}
}
