import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole']; // Obtém a função esperada da rota

    if (this.userService.estaLogado()) {
      const userRole = this.userService.retornarUserRole(); // Obtém a função do usuário
      if (!expectedRole || userRole === expectedRole) {
        return true;
      } else {
        this.router.navigate(['/unauthorized']); // Redireciona para uma página de acesso negado
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
