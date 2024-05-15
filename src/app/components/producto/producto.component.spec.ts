import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoComponent } from './producto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductoComponent', () => {
  let component: ProductoComponent;
  let fixture: ComponentFixture<ProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoComponent],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
