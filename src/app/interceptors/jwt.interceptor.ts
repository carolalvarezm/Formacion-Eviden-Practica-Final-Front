import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const autService = inject(AuthService);
  const token=autService.getToken();
  let request=req;
  if(token){
    request=req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
    });
  }
  return next(request);
};
