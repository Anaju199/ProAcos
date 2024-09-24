import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PerguntaService } from 'src/app/paginas/administrador/perguntas/questionario/pergunta.service';
import { Pergunta, Resposta } from './questionario';
import { RespostaService } from './resposta.service';
import { UserService } from '../../../pagamentos/services/user.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.component.html',
  styleUrls: ['./questionario.component.css']
})
export class QuestionarioComponent implements OnInit {

  id?: number;
  formulario!: FormGroup;
  perguntas: Pergunta[] = [];
  ano: number = new Date().getFullYear();
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  listaRespostas: Resposta[] = [];
  usuarioId = this.userService.retornarId();

  constructor(
    private perguntaService: PerguntaService,
    private service: RespostaService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      perguntas: this.formBuilder.array([]) // FormArray para perguntas e respostas
    });

    // Primeiro, verifica se existem respostas anteriores
    this.verificaResposta(this.usuarioId!).then((respostasExistentes) => {
      // Se houver respostas, lista as perguntas e preenche o formulário com as respostas anteriores
      this.listarPerguntas(respostasExistentes);
    });
  }

  get perguntasArray(): FormArray {
    return this.formulario.get('perguntas') as FormArray;
  }

  listarPerguntas(respostasExistentes: Resposta[] = []): void {
    this.perguntaService.listarTodos(this.paginaAtual, this.itensPorPagina).subscribe(
      response => {
        this.perguntas = response.results;
        this.popularPerguntasNoFormulario(respostasExistentes);
      },
      error => {
        console.error('Erro ao recuperar perguntas:', error);
      }
    );
  }

  popularPerguntasNoFormulario(respostasExistentes: Resposta[]): void {
    this.perguntas.forEach(pergunta => {
      const respostaEncontrada = respostasExistentes.find(r => r.pergunta === pergunta.id);
      this.perguntasArray.push(this.criarPergunta(pergunta, respostaEncontrada?.resposta || ''));
    });
  }

  criarPergunta(pergunta: any, resposta: string): FormGroup {
    return this.formBuilder.group({
      id: [pergunta.id], // ID da pergunta
      pergunta: [pergunta.pergunta], // Texto da pergunta
      resposta: [resposta, Validators.required] // Resposta associada à pergunta
    });
  }

  criarResposta() {
    if (this.formulario.valid) {

      // Mapeia as respostas no formato correto
      const respostas: Resposta[] = this.formulario.value.perguntas.map((item: any) => {
        return {
          id: null, // O ID da resposta será gerado no backend
          usuario: this.usuarioId, // ID do usuário
          pergunta: item.id, // Apenas o ID da pergunta
          resposta: item.resposta // Resposta fornecida pelo usuário
        };
      });

      // Cria um array de requisições HTTP
      const requisicoes = respostas.map((resposta: Resposta) => this.service.criar(resposta));

      // Aguarda todas as requisições serem finalizadas
      forkJoin(requisicoes).subscribe(() => {
        alert('Respostas cadastradas com sucesso.');
        this.router.navigate(['/paginaInicial']);
      }, error => {
        console.error('Erro ao cadastrar respostas:', error);
        alert('Não foi possível cadastrar, entre em contato com o administrador.');
      });
    } else {
      this.formulario.markAllAsTouched(); // Marcar todos os campos como tocados para exibir erros
      alert('Formulário Inválido');
    }
  }

  cancelar() {
    this.router.navigate(['/listarPerguntas']);
  }

  verificaResposta(usuarioId: string): Promise<Resposta[]> {
    return new Promise((resolve) => {
      this.service.listar('', parseInt(usuarioId!)).subscribe((listaRespostas) => {
        this.listaRespostas = listaRespostas;
        resolve(this.listaRespostas); // Resolve com as respostas existentes
      });
    });
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao_forms';
    } else {
      return 'botao__desabilitado';
    }
  }

}
