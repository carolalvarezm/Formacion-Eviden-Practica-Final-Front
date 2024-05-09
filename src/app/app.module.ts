import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoComponent } from './components/producto/producto.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import {  HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UserService } from './services/user.service';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import { MarcasComponent } from './components/marcas/marcas.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { MarcaService } from './services/marca.service';
import { MarcaComponent } from './components/marca/marca.component';
import { MarcaEditComponent } from './components/marca-edit/marca-edit.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriasEditComponent } from './components/categorias-edit/categorias-edit.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { SeriesComponent } from './components/series/series.component';
import { SerieComponent } from './components/serie/serie.component';
import { SerieEditComponent } from './components/serie-edit/serie-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    ProductosComponent,
    ProductoComponent,
    PerfilComponent,
    MarcasComponent,
    CategoriasComponent,
    MarcaComponent,
    MarcaEditComponent,
    CategoriasEditComponent,
    CategoriaComponent,
    ProductEditComponent,
    SeriesComponent,
    SerieComponent,
    SerieEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,

  ],
  providers: [
    AuthService,
    UserService,
    MarcaService,
    provideHttpClient(withInterceptors([jwtInterceptor])),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
