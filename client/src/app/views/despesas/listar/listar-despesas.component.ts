import { Component, OnInit } from '@angular/core';
import { ListarDespesasViewModel } from '../models/despesa.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatAnchor, MatIconAnchor } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { DatePipe, NgForOf } from '@angular/common';

@Component({
  selector: 'app-listar-excluir',
  standalone: true,
  imports: [
    MatAnchor,
    MatCard,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatIconAnchor,
    MatTooltip,
    NgForOf,
    RouterLink,
    MatCardContent,
    DatePipe
  ],
  templateUrl: './listar-despesas.component.html',
})
export class ListarDespesasComponent implements OnInit {
  despesas: ListarDespesasViewModel[] = []

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
        this.despesas = this.route.snapshot.data['despesas']
    }
}
