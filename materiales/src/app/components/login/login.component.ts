import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
constructor(private authService:AuthService,private router:Router){

}
login(form:NgForm){
  const username=form.value.username;
  const password=form.value.password;
  this.authService.login(username,password).subscribe((response)=>{
    this.router.navigate(['/perfil'])
  });
}
}
