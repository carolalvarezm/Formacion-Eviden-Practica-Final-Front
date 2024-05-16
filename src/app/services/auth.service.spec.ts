import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { registeRequest } from '../models/registerRequest';


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
  const mockToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNzE1NzYyMzkxLCJleHAiOjE3MTU4NDg3OTF9.bbEtwzce5CrFYNVbS-ZfB0uCExJIpXzrs_iMUm2oMYE"
  
  //Action
    const {username,password}=mockLoginRequest;
    
    service.login(username,password).subscribe(
      resultado => {
        expect(resultado).withContext("response").toEqual(mockLoginResponse);
        expect(service.currentUserLogin).withContext("boolean").toBeTruthy();
        expect(service.getToken()).withContext("Guardado en el storage").toEqual(mockToken);
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
  it('Debe devolver un error(Login Incorrecto)',()=>{
     //Mock de los datos
     const mockLoginRequest={
      username:'user',
      password:'ghj'
    }
    const mockError='';
    //Action
      const {username,password}=mockLoginRequest;
      
      service.login(username,password).subscribe(
        {
          next: () => fail('should have failed with the 403 error'),
          error: (error: HttpErrorResponse) => {
            expect(error.status).withContext('status').toEqual(403);
            expect(error.error).withContext('message').toBeNull();
          },
        });
        const req = httpTestingController.expectOne('http://localhost:8080/auth/login');

        // Respond with mock error
        req.flush(mockError, { status: 403, statusText: 'Forbidden'});
    })
    it('Al realizar logout debe eliminarse del storage el token',()=>{
      
      let store:any = {"token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VydfghjkIiwiaWF0IjoxNzE1NzYyMzkxLCJleHAiOjE3MTU4NDg3OTF9.bbEtwzce5CrFYNVbS-ZfB0uCExJIpXzrs_iMUm2oMYE"};
      const mockToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VydfghjkIiwiaWF0IjoxNzE1NzYyMzkxLCJleHAiOjE3MTU4NDg3OTF9.bbEtwzce5CrFYNVbS-ZfB0uCExJIpXzrs_iMUm2oMYE"
      spyOn(sessionStorage, 'getItem').and.callFake(() => {
        return store['token'];
      });
      spyOn(sessionStorage, 'removeItem').and.callFake(() => {
          delete store['token'];
      });
      service.ngOnInit();
      expect(service.getToken()).withContext('Antes de hace logout debe existir el token en el storage').toBe(mockToken);
      expect(service.token).withContext('Antes de hace logout el servicio debe tener un token').toBe(mockToken);
      expect(service.currentUserLogin).withContext('Antes de hace logout currentUserLogin debe ser true').toBe(true);
      
      service.logout();
      expect(service.getToken()).withContext('Después de hace logout no debe existir el token en el storage').toBeNull();
      expect(service.token).withContext('Después de hace logout el servicio no debe tener un token').toBe('');
      expect(service.currentUserLogin).withContext('Después de hace logout currentUserLogin debe ser false').toBe(false);
    })
    it('Debe retornar un token(Register Correcto)',()=>{
      //Mock de los datos
      const mockRegisterRequest:registeRequest={
          username:"user2",
          password:"1234",
          firstname:"name",
          lastname:"usuario",
          email:"usuario@usuario.com"
      }
      const mockRegisterResponse={
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNzE1NzYyMzkxLCJleHAiOjE3MTU4NDg3OTF9.bbEtwzce5CrFYNVbS-ZfB0uCExJIpXzrs_iMUm2oMYE"
    }
    const mockToken="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiaWF0IjoxNzE1NzYyMzkxLCJleHAiOjE3MTU4NDg3OTF9.bbEtwzce5CrFYNVbS-ZfB0uCExJIpXzrs_iMUm2oMYE"
    
    //Action
      service.register(mockRegisterRequest).subscribe(
        resultado => {
          expect(resultado).withContext("response").toEqual(mockRegisterResponse);
          expect(service.currentUserLogin).withContext("boolean").toBeTruthy();
          expect(service.getToken()).withContext("Guardado en el storage").toEqual(mockToken);
        }
      );
      const req = httpTestingController.expectOne('http://localhost:8080/auth/register');
      expect(req.request.method).toEqual('POST');
      req.flush(mockRegisterResponse);
    })
  
});
