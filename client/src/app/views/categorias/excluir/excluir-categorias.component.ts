import { Component, OnInit } from '@angular/core';
import { VisualizarCategoriaViewModel } from '../models/categoria.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriasService } from '../service/categorias.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-excluir-categorias',
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
  templateUrl: './excluir-categorias.component.html',
})
export class ExcluirCategoriasComponent  implements OnInit {
  detalhesCategoria?:  VisualizarCategoriaViewModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriasService,
    private notifcacao: NotificacaoService,
  ) {}

  ngOnInit(): void {
        this.detalhesCategoria = this.route.snapshot.data['categoria'];
    }

  public excluir() {
    this.categoriaService.excluir(this.detalhesCategoria!.id).subscribe({
      next: () => this.processarSucesso(),
      error: (erro) => this.processarFalha(erro),
    })
  }

  private processarSucesso(): void {
    this.notifcacao.sucesso('Categoria excluida com sucesso')
    this.router.navigate(['/categorias/listar']);
  }

  private processarFalha(erro: Error) {
    this.notifcacao.erro(erro.toString())
  }
}
