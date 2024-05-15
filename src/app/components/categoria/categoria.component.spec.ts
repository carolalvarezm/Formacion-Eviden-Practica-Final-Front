import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaComponent } from './categoria.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { CategoriasEditComponent } from '../categorias-edit/categorias-edit.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('(1) CategoriaComponent', () => {
  let component: CategoriaComponent;
  let fixture: ComponentFixture<CategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriaComponent],
      providers: [provideRouter([{path:'**',component:CategoriasEditComponent}])],
      imports: [
        HttpClientTestingModule
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe Crearse', () => {
    expect(component).toBeTruthy();
  });

  // it('Debe moverse a la edición con el id al hacer click en editar',()=>{
  //   const harness = await RouterTestingHarness.create();
  //   component.edit();
  //   const activatedComponent = await harness.navigateByUrl('/', CategoriaComponent);
  //   await activatedComponent;
  //   harness.detectChanges();
  //   expect(harness.routeNativeElement?.innerHTML).toContain('search: books');
  // })
});
