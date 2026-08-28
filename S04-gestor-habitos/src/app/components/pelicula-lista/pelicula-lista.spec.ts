import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaLista } from './pelicula-lista';

describe('PeliculaLista', () => {
  let component: PeliculaLista;
  let fixture: ComponentFixture<PeliculaLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculaLista],
    }).compileComponents();

    fixture = TestBed.createComponent(PeliculaLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
