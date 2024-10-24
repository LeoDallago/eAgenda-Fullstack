import { Component, OnInit } from '@angular/core';
import { ListarCompromissoViewModel } from '../models/compromisso.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgForOf, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-listar-compromissos',
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
  ],
  templateUrl: './listar-compromissos.component.html',
})
export class ListarCompromissosComponent implements OnInit {

  compromissos: ListarCompromissoViewModel[] = []


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.compromissos = this.route.snapshot.data['compromissos']
  }

}
