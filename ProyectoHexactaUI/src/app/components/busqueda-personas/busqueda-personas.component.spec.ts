import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaPersonasComponent } from './busqueda-personas.component';

describe('BusquedaPersonasComponent', () => {
  let component: BusquedaPersonasComponent;
  let fixture: ComponentFixture<BusquedaPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaPersonasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
