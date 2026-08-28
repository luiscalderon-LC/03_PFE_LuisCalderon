import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaFormulario } from './pelicula-formulario';

describe('PeliculaFormulario', () => {
  let component: PeliculaFormulario;
  let fixture: ComponentFixture<PeliculaFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaFormulario],
    }).compileComponents();

    fixture = TestBed.createComponent(PeliculaFormulario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
