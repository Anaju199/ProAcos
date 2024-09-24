import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarPerguntasComponent } from './cadastrar-editar-perguntas.component';

describe('CadastrarEditarPerguntasComponent', () => {
  let component: CadastrarEditarPerguntasComponent;
  let fixture: ComponentFixture<CadastrarEditarPerguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarEditarPerguntasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarPerguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
