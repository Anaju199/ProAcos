import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItensService } from './itens.service';
import { Itens } from './Itens';

@Component({
  selector: 'app-consulta-dados',
  templateUrl: './consulta-dados.component.html',
  styleUrls: ['./consulta-dados.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ConsultaDadosComponent implements OnInit {

    formulario!: FormGroup;
    listaVendas: Itens [] = [];

    constructor(
      private formBuilder: FormBuilder,
      private service: ItensService) {}

    ngOnInit(): void {
      this.formulario = this.formBuilder.group({
        start_date: ['', Validators.required],
        end_date: ['', Validators.required]
      });

      // this.service.listar('2024-09-01', '2024-09-30')
      //   .subscribe(listaVendas => {
      //     this.listaVendas = listaVendas
      //   })
    }

    pesquisar(): void {
      if (this.formulario.valid) {
        const { start_date, end_date } = this.formulario.value;

        this.service.listar(start_date, end_date)
        .subscribe(
          listaVendas => {
            this.listaVendas = listaVendas;
          },
          error => {
            alert('Ocorreu um erro ao buscar os dados, entre em contato com o administrador');
          }
        );
        // this.realizarPesquisa(start_date, end_date);
      } else {
        this.formulario.markAllAsTouched();
        alert('Por favor, preencha as datas corretamente.');
      }
    }

    // realizarPesquisa(startDate: string, endDate: string): void {
    //   // Lógica para realizar a pesquisa com os parâmetros
    //   // Pode ser uma chamada de serviço para o backend, por exemplo.
    //   console.log(`Pesquisando entre ${startDate} e ${endDate}`);
    // }
}

