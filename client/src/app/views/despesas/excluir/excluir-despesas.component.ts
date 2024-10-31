import { Component, OnInit } from '@angular/core';
import { VisualizarDespesaViewModel } from '../models/despesa.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DespesasService } from '../service/despesas.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-excluir-excluir',
  standalone: true,
  imports: [
    MatAnchor,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    RouterLink
  ],
  templateUrl: './excluir-despesas.component.html',
})
export class ExcluirDespesasComponent implements OnInit{
  detalhesDespesa?: VisualizarDespesaViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private despesasService: DespesasService,
    private notificacao: NotificacaoService
  ) {}

  ngOnInit(): void {
        this.detalhesDespesa = this.route.snapshot.data['despesa']
    }

    public excluir(){
    this.despesasService.excluir(this.detalhesDespesa!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    })
    }

  private processarSucesso(): void {
    this.notificacao.sucesso('Despesa excluida com sucesso')
    this.router.navigate(['/despesas/listar']);
  }

  private processarFalha(erro: Error) {
    this.notificacao.erro(erro.toString())
  }
}
