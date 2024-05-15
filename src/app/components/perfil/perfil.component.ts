import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { userModel } from '../../models/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {


currentUser:userModel;
  

constructor(private authService:AuthService, private router:Router, private userService:UserService){
  this.currentUser={
    username:"pepe1234",
    email:"pepe@gmail.com",
    firstname:"Pepe",
    lastname:"Pérez",
  };

}
  ngOnInit(): void {
    const token=this.authService.decodeToken()
    const user =this.userService.getUser(token?.sub||'').subscribe(response =>{
      this.currentUser=response as userModel;
    })
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['home']);
  }

}
