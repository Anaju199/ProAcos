import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDadosComponent } from './consulta-dados.component';

describe('ConsultaDadosComponent', () => {
  let component: ConsultaDadosComponent;
  let fixture: ComponentFixture<ConsultaDadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaDadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
