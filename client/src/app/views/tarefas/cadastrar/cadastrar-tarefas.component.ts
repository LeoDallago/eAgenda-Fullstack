import { Component, input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { TarefasService } from '../service/tarefas.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { PartialObserver } from 'rxjs';
import { TarefaInseridaViewModel } from '../models/tarefa.model';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatAnchor, MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatChip, MatChipRemove, MatChipSet } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';

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
    RouterLink,
    MatChipSet,
    MatChip,
    MatIconButton,
    MatMiniFabButton,
    MatDivider,
    MatChipRemove,
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

      itens:this.fb.array([]),
    })
  }

  adicionarItem(titulo: string){
    this.itens.push(new FormControl({
      titulo: titulo,
      status: 1,
      concluido: false,
    }))
  }

  removerItem(index:number){
    this.itens.removeAt(index)
  }

  get titulo() {
    return this.form.get('titulo');
  }

  get prioridade() {
    return this.form.get('prioridade');
  }

  get itens() {
    return this.form.get('itens') as FormArray;
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

  //protected readonly input = input;
}
