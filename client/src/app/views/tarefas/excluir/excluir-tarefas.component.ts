import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TarefasService } from '../service/tarefas.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { VisualizarTarefaViewModel } from '../models/tarefa.model';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-excluir-tarefas',
  standalone: true,
  imports: [
    MatAnchor,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    RouterLink
  ],
  templateUrl: './excluir-tarefas.component.html',
})
export class ExcluirTarefasComponent implements OnInit {
detalhesTarefa?: VisualizarTarefaViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tarefaService: TarefasService,
    private notificacaoService: NotificacaoService
  ) {
  }

  ngOnInit(): void {
      this.detalhesTarefa = this.route.snapshot.data['tarefa']
  }

  public excluir() {
    this.tarefaService.excluir(this.detalhesTarefa!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    })
  }

  private processarSucesso(): void {
    this.notificacaoService.sucesso('Tarefa excluida com sucesso')

    this.router.navigate(['/tarefas/listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacaoService.erro(erro.toString())
  }
}
