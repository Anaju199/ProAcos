import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/paginas/pagamentos/services/user.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(
    private userService: UserService,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'pt']);
    this.translate.setDefaultLang('pt');
    const browserLang = this.translate.getBrowserLang() || 'pt';
    this.translate.use(browserLang.match(/en|pt/) ? browserLang : 'pt');

  }


  ngOnInit(): void {
    const role = this.userService.retornarUserRole();
    this.isAdmin = role === 'admin';
    this.isUser = role === 'user';
    const idioma = localStorage.getItem('idiomaSelecionado') || 'pt';
    this.translate.use(idioma);
  }

  user$ = this.userService.retornarUser();
  nome = this.userService.retornarNome();
  id = this.userService.retornarId();

  logout() {
    this.userService.logout();
    window.location.href = '/login'
    // this.router.navigate(['/login'])
  }

  trocarIdioma(idioma: string): void {
    // Atualiza o campo select oculto (se necessário)
    const selectElement = document.getElementById('idiomaSelect') as HTMLSelectElement;
    if (selectElement) {
      selectElement.value = idioma;
    }

    // Lógica de troca de idioma
    this.translate.use(idioma);
    localStorage.setItem('idiomaSelecionado', idioma);
  }

}
