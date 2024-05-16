import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { registeRequest } from '../../models/registerRequest';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
constructor(private authService:AuthService,private router:Router){

}
register(form:NgForm){
  const user:registeRequest={
    username:form.value.username,
    password:form.value.password,
    email:form.value.email,
    firstname:form.value.firstname,
    lastname:form.value.lastname
  }
  this.authService.register(user).subscribe((response)=>{
    this.router.navigate(['/perfil'])
  });
}
}
