import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarPersonaComponent } from './ingresar-persona.component';

describe('IngresarPersonaComponent', () => {
  let component: IngresarPersonaComponent;
  let fixture: ComponentFixture<IngresarPersonaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarPersonaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
