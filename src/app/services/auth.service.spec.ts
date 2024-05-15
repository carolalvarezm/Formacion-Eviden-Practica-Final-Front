import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';


describe('(1) Pruebas de AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  it('Debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });
  it('Debe retornar un token de inicio de sesion(Login Correcto)',()=>{
    //Mock de los datos
    const mockLoginRequest={
      username:'user',
      password:'1234'
    }
    const mockLoginResponse={
      "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNzE1NzYyMzkxLCJleHAiOjE3MTU4NDg3OTF9.bbEtwzce5CrFYNVbS-ZfB0uCExJIpXzrs_iMUm2oMYE"
  }
  //Action
    const {username,password}=mockLoginRequest;
    
    service.login(username,password).subscribe(
      resultado => {
        expect(resultado).toEqual(mockLoginResponse);
        expect(service.currentUserLogin).toBeTruthy();
        
      }
    );
    const req = httpTestingController.expectOne('http://localhost:8080/auth/login');
    expect(req.request.method).toEqual('POST');
    req.flush(mockLoginResponse);
  })

  it('Debe guardar el token en el sessionStorage',()=>{
    //Mock de los datos
    const mockLoginRequest={
      username:'user',
      password:'1234'
    }
    const mockLoginResponse={
      "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNzE1NzYyMzkxLCJleHAiOjE3MTU4NDg3OTF9.bbEtwzce5CrFYNVbS-ZfB0uCExJIpXzrs_iMUm2oMYE"
  }
    const mockToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNzE1NzYyMzkxLCJleHAiOjE3MTU4NDg3OTF9.bbEtwzce5CrFYNVbS-ZfB0uCExJIpXzrs_iMUm2oMYE"
  
  //Action
    const {username,password}=mockLoginRequest;
    
    service.login(username,password).subscribe(
      resultado => {
        expect(service.getToken()).toEqual(mockToken);
      }
    );
    const req = httpTestingController.expectOne('http://localhost:8080/auth/login');
    expect(req.request.method).toEqual('POST');
    req.flush(mockLoginResponse);
  })
  it('isValid() Debe devolver true con un token Válido',()=>{
    const store = {"token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNzE1NzYyMzkxLCJleHAiOjE3MTU4NDg3OTF9.bbEtwzce5CrFYNVbS-ZfB0uCExJIpXzrs_iMUm2oMYE"};
    spyOn(sessionStorage, 'getItem').and.callFake(() => {
      return store['token'];
    });
    expect(service.isValid()).toBeTruthy();
  })
  it('isValid() Debe devolver false con un token inválido',()=>{
    const store = {"token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VydfghjkIiwiaWF0IjoxNzE1NzYyMzkxLCJleHAiOjE3MTU4NDg3OTF9.bbEtwzce5CrFYNVbS-ZfB0uCExJIpXzrs_iMUm2oMYE"};
    spyOn(sessionStorage, 'getItem').and.callFake(() => {
      return store['token'];
    });
    expect(service.isValid()).toBeFalsy();
  })
  // it('Debe devolver un error(Login Incorrecto)',(done:DoneFn)=>{

  // })

});
