import { Component, OnInit } from '@angular/core';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { ListarTarefaViewModel } from '../models/tarefa.model';

@Component({
  selector: 'app-listar-tarefas',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    DatePipe,
  ],
  templateUrl: './listar-tarefas.component.html',
})
export class ListarTarefasComponent implements OnInit {
  tarefas: ListarTarefaViewModel[] = []

  constructor(private route: ActivatedRoute,) {}

  ngOnInit(): void {
        this.tarefas = this.route.snapshot.data['tarefas']
    }

}
