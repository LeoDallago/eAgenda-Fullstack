import { Component, OnInit } from '@angular/core';
import { ListarCategoriaViewModel } from '../models/categoria.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatAnchor, MatIconAnchor } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-listar-categorias',
  standalone: true,
  imports: [
    MatAnchor,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatIconAnchor,
    MatTooltip,
    NgForOf,
    RouterLink
  ],
  templateUrl: './listar-categorias.component.html',
})
export class ListarCategoriasComponent implements OnInit {
  categorias: ListarCategoriaViewModel[] = []

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
      this.categorias = this.route.snapshot.data['categorias']
  }

}
