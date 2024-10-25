import { Component, OnInit } from '@angular/core';
import { VisualizarCompromissoViewModel } from '../models/compromisso.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../contatos/services/contato.service';
import { CompromissosService } from '../service/compromissos.service';
import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-excluir-compromissos',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    RouterLink,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './excluir-compromissos.component.html',
})
export class ExcluirCompromissosComponent implements OnInit {
  detalhesCompromisso?: VisualizarCompromissoViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private compromissoService: CompromissosService,
    private notificacaoService: NotificacaoService
  ) {

  }
  ngOnInit(): void {
    this.detalhesCompromisso = this.route.snapshot.data['compromisso'];
  }

  public excluir() {
    this.compromissoService.excluir(this.detalhesCompromisso!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    })
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso('Compromisso excluido com sucesso')

    this.router.navigate(['/compromissos/listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.toString())
  }
}
