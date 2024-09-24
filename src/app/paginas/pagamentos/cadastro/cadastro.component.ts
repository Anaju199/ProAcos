import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { CadastroService } from '../services/cadastro.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  // @Input()

  alterarSenha: boolean = false;

  id?: number;
  formulario!: FormGroup;
  formularioEndereco!: FormGroup;
  isAdmin: boolean = false;
  titulo: string = 'Digite os dados para cadastro:'

  constructor(
    private userService: UserService,
    private service: CadastroService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const role = this.userService.retornarUserRole();
    this.isAdmin = role === 'admin';

    this.route.queryParams.subscribe(params => {
      this.alterarSenha = params['alterarSenha'] === 'true';  // Verifica se alterarSenha é 'true'
    });

    this.formulario = this.formBuilder.group({
      nome: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
      cpf: ['', Validators.compose([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11)
      ])],
      email: [''], //, Validators.compose([
      //   Validators.required,
      //   Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
      // ])
      celular: [''], //, Validators.compose([
      //   Validators.required,
      //   Validators.minLength(8)
      // ])
      senha: ['', Validators.compose([
        Validators.required
      ])],
      senha_2: ['', Validators.compose([
        Validators.required,
        this.equalTo('senha')
      ])],
      cliente: [true],
      administrador: [false]
    });

    const id = this.route.snapshot.paramMap.get('id')

    if(id){
      this.titulo = 'Editar informações:'

      this.service.buscarPorId(parseInt(id!)).subscribe((cliente) => {
        this.id = cliente.id

        this.formulario = this.formBuilder.group({
          id: [cliente.id],
          nome: [cliente.nome, Validators.compose([
            Validators.required,
            Validators.minLength(2)
          ])],
          cpf: [cliente.cpf, Validators.compose([
              Validators.required,
              Validators.minLength(11),
              Validators.maxLength(11)
          ])],
          email: [cliente.email], //, Validators.compose([
          //   Validators.required,
          //   Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
          // ])
          celular: [cliente.celular], //, Validators.compose([
          //   Validators.required,
          //   Validators.minLength(8)
          // ])
          senha: [this.alterarSenha ? '' : cliente.senha, Validators.compose([
            Validators.required
          ])],
          senha_2: [this.alterarSenha ? '' : cliente.senha, Validators.compose([
            Validators.required,
            this.equalTo('senha')
          ])],
          cliente: [cliente.cliente],
          administrador: [cliente.administrador]
        });
      })
    }
  }

  user$ = this.userService.retornarUser();

  cadastrar() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('nome', this.formulario.get('nome')!.value);
      formData.append('cpf', this.formulario.get('cpf')!.value);
      formData.append('email', this.formulario.get('email')!.value);
      formData.append('celular', this.formulario.get('celular')!.value);
      formData.append('senha', this.formulario.get('senha')!.value);
      formData.append('cliente', this.formulario.get('cliente')!.value);
      formData.append('administrador', this.formulario.get('administrador')!.value);

      this.service.criar(formData).subscribe(() => {
        alert('Cadastro realizado com sucesso.');
        this.router.navigate(['/login']);
      }, error => {
        console.log('erroo ',error)
        alert('Não foi possível cadastrar');
      });
    } else {
      alert('Formulário Inválido');
    }
  }

  editar() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('nome', this.formulario.get('nome')!.value);
      formData.append('cpf', this.formulario.get('cpf')!.value);
      formData.append('email', this.formulario.get('email')!.value);
      formData.append('celular', this.formulario.get('celular')!.value);
      formData.append('senha', this.formulario.get('senha')!.value);
      formData.append('cliente', this.formulario.get('cliente')!.value);
      formData.append('administrador', this.formulario.get('administrador')!.value);

      const id = this.formulario.get('id')!.value;
      this.service.editar(id, formData).subscribe(() => {
        alert('Edição realizada com sucesso.');
        this.router.navigate(['/paginaInicial']);
      }, error => {
        console.log('erroo ',error)
        alert('Não foi possível editar, entre em contato com o administrador');
      });
    } else {
      alert('Formulário Inválido');
    }
  }

  equalTo(otherField: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldValue = control.value
      const otherFieldValue = control.root.get(otherField)?.value
      if(fieldValue !== otherFieldValue) {
        return { equalTo: true}
      }
      return null
    }
  }

  cancelar() {
    this.router.navigate(['/paginaInicial'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }
}
