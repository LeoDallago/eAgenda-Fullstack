import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TarefasService } from '../service/tarefas.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { PartialObserver } from 'rxjs';
import { CompromissoInseridoViewModel } from '../../compromissos/models/compromisso.model';
import { TarefaInseridaViewModel } from '../models/tarefa.model';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-cadastrar-tarefas',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatAnchor,
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatPrefix,
    MatSelect,
    MatSuffix,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './cadastrar-tarefas.component.html',
})
export class CadastrarTarefasComponent {
  public form: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private tarefaService: TarefasService,
    private notificacaoService: NotificacaoService,
  ) {
    this.form = this.fb.group({
      titulo: ['',
       [ Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
       ]
      ],
      prioridade: ['',Validators.required],
    })
  }

  get titulo() {
    return this.form.get('titulo');
  }

  get prioridade() {
    return this.form.get('prioridade');
  }

  get itens() {
    return this.form.get('itens');
  }

  public gravar() {
    if (this.form.invalid) {
      return;
    }

    const inserirTarefaVm = this.form.value

    const observer: PartialObserver<TarefaInseridaViewModel> = {
      next: (tarefaInserida) => this.processarSucesso(tarefaInserida),
      error: (erro) => this.processarFalha(erro),
    }

    this.tarefaService.inserir(inserirTarefaVm).subscribe(observer)
  }

  private processarSucesso(tarefa: TarefaInseridaViewModel): void {
    this.notificacaoService.sucesso('Tarefa cadastrada com sucesso')

    this.router.navigate(['/tarefas', 'listar'])
  }

  private processarFalha(erro: any) {
    this.notificacaoService.erro(erro);
  }
}
