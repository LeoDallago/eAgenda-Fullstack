import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TarefasService } from '../service/tarefas.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { Observable, PartialObserver } from 'rxjs';
import { TarefaEditadaViewModel, TarefaInseridaViewModel, VisualizarItensViewModel } from '../models/tarefa.model';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatAnchor, MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatChip, MatChipRemove, MatChipSet } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-editar-tarefas',
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
    MatChip,
    MatChipRemove,
    MatChipSet,
    MatDivider,
    MatMiniFabButton
  ],
  templateUrl: './editar-tarefas.component.html',

})
export class EditarTarefasComponent implements OnInit{
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    const tarefa = this.route.snapshot.data['tarefa']

    this.form.patchValue(tarefa)

    tarefa.itens.forEach((item: any) =>{
      this.itens.push(this.fb.group({
        titulo:item.titulo,
        status: item.status,
        concluido: item.concluido,
      }))
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

    const id = this.route.snapshot.params['id']
    const editarTarefaVm = this.form.value

    console.log(editarTarefaVm)

    const observer: PartialObserver<TarefaEditadaViewModel> = {
      next: (tarefaEditada) => this.processarSucesso(tarefaEditada),
      error: (erro) => this.processarFalha(erro),
    }

    this.tarefaService.editar(id,editarTarefaVm).subscribe(observer)
  }

  private processarSucesso(tarefa: TarefaEditadaViewModel): void {
    this.notificacaoService.sucesso('Tarefa editada com sucesso')

    this.router.navigate(['/tarefas', 'listar'])
  }

  private processarFalha(erro: any) {
    this.notificacaoService.erro(erro);
  }
}
