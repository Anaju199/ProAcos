import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { ContatoComponent } from './paginas/contato/contato.component';
import { SucessoContatoComponent } from './componentes/sucesso-contato/sucesso-contato.component';
import { MensagemComponent } from './componentes/mensagem/mensagem.component';
import { MaiorIdadeDirective } from './directives/maior-idade.directive';
import { ValidandoCepDirective } from './directives/validando-cep.directive';
import { NaoImplementadoComponent } from './componentes/nao-implementado/nao-implementado.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { ErroContatoComponent } from './componentes/erro-contato/erro-contato.component';
import { ClientesComponent } from './paginas/administrador/clientes/clientes.component';
import { PagamentosComponent } from './paginas/pagamentos/pagamentos/pagamentos.component';
import { ConfirmarPagamentosComponent } from './paginas/pagamentos/confirmar-pagamentos/confirmar-pagamentos.component';
import { PedidosComponent } from './paginas/pagamentos/pedidos/pedidos.component';
import { LoginComponent } from './paginas/pagamentos/login/login.component';
import { CadastroComponent } from './paginas/pagamentos/cadastro/cadastro.component';
import { EnderecoComponent } from './paginas/pagamentos/endereco/cadastro-endereco/endereco.component';
import { NotificacoesComponent } from './paginas/pagamentos/notificacoes/notificacoes.component';
import { PedidosLinkComponent } from './paginas/pagamentos/pedidos-link/pedidos-link.component';
import { AutenticacaoInterceptor } from './paginas/pagamentos/core/interceptors/autenticacao.interceptor';
import { EditarEnderecoComponent } from './paginas/pagamentos/endereco/editar-endereco/editar-endereco.component';
import { ClienteComponent } from './paginas/administrador/cliente/cliente.component';
import { SobreMimComponent } from './paginas/sobre-mim/sobre-mim.component';
import { QuestionarioComponent } from './paginas/administrador/perguntas/questionario/questionario.component';
import { ListarPerguntasComponent } from './paginas/administrador/perguntas/listar-perguntas/listar-perguntas.component';
import { CadastrarEditarPerguntasComponent } from './paginas/administrador/perguntas/cadastrar-editar-perguntas/cadastrar-editar-perguntas.component';
import { AutoResizeTextareaDirective } from './directives/auto-resize-textarea.directive';
import { ConsultaDadosComponent } from './paginas/consulta-dados/consulta-dados.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    RodapeComponent,
    ContatoComponent,
    SucessoContatoComponent,
    MensagemComponent,
    MaiorIdadeDirective,
    ValidandoCepDirective,
    NaoImplementadoComponent,
    MenuComponent,
    PaginaInicialComponent,
    ErroContatoComponent,
    ClientesComponent,
    PagamentosComponent,
    ConfirmarPagamentosComponent,
    PedidosComponent,
    LoginComponent,
    CadastroComponent,
    EnderecoComponent,
    NotificacoesComponent,
    PedidosLinkComponent,
    EditarEnderecoComponent,
    ClienteComponent,
    SobreMimComponent,
    QuestionarioComponent,
    ListarPerguntasComponent,
    CadastrarEditarPerguntasComponent,
    AutoResizeTextareaDirective,
    ConsultaDadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AutenticacaoInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
