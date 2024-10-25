import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ShellComponent } from "./core/shell/shell.component";
import { Observable } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { UsuarioTokenViewModel } from './core/auth/models/auth.models';
import { UsuarioService } from './core/auth/services/usuario.service';
import { AsyncPipe } from '@angular/common';
import { LocalStorageService } from './core/auth/services/local-storage.service';
import { AuthService } from './core/auth/services/auth.service';

registerLocaleData(localePtBr);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ShellComponent, AsyncPipe],
  templateUrl: './app.component.html',
  providers: [{provide: LOCALE_ID,useValue: 'pt-BR'}],
})
export class AppComponent implements OnInit {
  title = 'eAgenda';

  usuarioAutenticado$?: Observable<UsuarioTokenViewModel | undefined>

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuarioAutenticado$ = this.usuarioService.usuarioAutenticado;

    const token = this.localStorageService.obterTokenAutenticacao();

    if (!token) return;

    const usuarioPersisistido = token.usuario;
    const dataExpiracao = new Date(token.dataExpiracao);

    const tokenValido: boolean = this.authService.validarExpiracaoToken(dataExpiracao);

    if (usuarioPersisistido && tokenValido) {
      this.usuarioService.logarUsuario(usuarioPersisistido);
    } else {
      this.efetuarLogout();
    }
  }

  efetuarLogout() {
    this.usuarioService.logout();
    this.authService.logout();
    this.localStorageService.limparDadosLocais();
    this.router.navigate(['/login'])

  }
}
