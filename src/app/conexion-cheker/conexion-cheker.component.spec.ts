import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConexionChekerComponent } from './conexion-cheker.component';

describe('ConexionChekerComponent', () => {
  let component: ConexionChekerComponent;
  let fixture: ComponentFixture<ConexionChekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConexionChekerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConexionChekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
