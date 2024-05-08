import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ProductosComponent } from './components/productos/productos.component';
import { MarcaEditComponent } from './components/marca-edit/marca-edit.component';
import { CategoriasEditComponent } from './components/categorias-edit/categorias-edit.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { authGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"perfil", component:PerfilComponent,canActivate:[authGuard]},
  {path:"home", component:HomeComponent},
  {path:"marcas", component:MarcasComponent,canActivate:[authGuard]},
  {path:"categorias",component:CategoriasComponent,canActivate:[authGuard]},
  {path:"productos",component:ProductosComponent,canActivate:[authGuard]},
  {path:"marca-edit",component:MarcaEditComponent,canActivate:[authGuard]},
  {path:"categoria-edit",component:CategoriasEditComponent,canActivate:[authGuard]},
  {path:"producto-edit", component:ProductEditComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
