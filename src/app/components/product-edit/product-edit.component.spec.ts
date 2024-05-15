import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditComponent } from './product-edit.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';


describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: ComponentFixture<ProductEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductEditComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
