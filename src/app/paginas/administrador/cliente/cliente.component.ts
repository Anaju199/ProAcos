import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../clientes/usuario.service';
import { RespostaService } from '../perguntas/questionario/resposta.service';
import { Resposta } from '../perguntas/questionario/questionario';
import { Usuario } from '../../pagamentos/tipos';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente!: Usuario;
  filtroResposta: string = ''
  listaRespostas: Resposta[] = []
  // id: number = 0

  constructor(
    private service: UsuariosService,
    private respostaService: RespostaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id')

    this.service.buscarPorId(parseInt(id!)).subscribe((cliente) => {
      this.cliente = cliente
    })

    this.respostaService.listar(this.filtroResposta, parseInt(id!)).subscribe((listaRespostas) => {
      this.listaRespostas = listaRespostas
    })
  }

  voltar() {
    this.router.navigate(['/clientes'])
  }

}
