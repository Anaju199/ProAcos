import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuario.service';
import { Usuario } from '../../pagamentos/tipos';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  listaClientes: Usuario[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  filtroNome: string = ''
  cliente: string = 'True'
  adm: string = 'False'

  constructor(
    private service: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarClientes()
  }

  carregarClientes(){
    this.service.listarTodos(this.paginaAtual, this.itensPorPagina).subscribe((response) => {
      this.listaClientes = response.results
      this.totalPaginas = Math.ceil(response.count/this.itensPorPagina)
    })
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarClientes();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarClientes();
    }
  }

  habilitarBotao(direcao: string): string {
    if (direcao === 'anterior' && this.paginaAtual === 1) {
      return 'botao_pag_desabilitado';
    }
    if (direcao === 'proxima' && this.paginaAtual === this.totalPaginas) {
      return 'botao_pag_desabilitado';
    }
    return 'botao_pag';
  }

  // excluir(id: number) {
  //   if (confirm('Tem certeza que deseja excluir?')){
  //     this.service.excluir(id).subscribe(() => {
  //       alert('Cliente excluido com sucesso.')
  //       this.recarregarComponente()
  //     })
  //   }
  // }

  // recarregarComponente(){
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false
  //   this.router.onSameUrlNavigation = 'reload'
  //   this.router.navigate([this.router.url])
  // }

  pesquisarCliente(event: Event) {
    const target = event.target as HTMLInputElement | HTMLSelectElement;

    if (target.type === 'select-one') {
      if (target.id === 'cliente') {
        this.cliente = target.value;
      } else if (target.id === 'adm') {
        this.adm = target.value;
      }
    } else if (target.type === 'search') {
      this.filtroNome = target.value;
    }

    this.service.listar(this.filtroNome, this.cliente, this.adm)
      .subscribe(listaTodosClientes => {
        this.listaClientes = listaTodosClientes;
      });
  }

}
