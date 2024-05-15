import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcasComponent } from './marcas.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MarcasComponent', () => {
  let component: MarcasComponent;
  let fixture: ComponentFixture<MarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarcasComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
