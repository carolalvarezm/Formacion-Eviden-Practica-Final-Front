import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieEditComponent } from './serie-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('SerieEditComponent', () => {
  let component: SerieEditComponent;
  let fixture: ComponentFixture<SerieEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SerieEditComponent],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        FormsModule,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SerieEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
