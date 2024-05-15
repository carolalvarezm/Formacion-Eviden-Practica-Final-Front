import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasEditComponent } from './categorias-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


describe('CategoriasEditComponent', () => {
  let component: CategoriasEditComponent;
  let fixture: ComponentFixture<CategoriasEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriasEditComponent],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        FormsModule,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
