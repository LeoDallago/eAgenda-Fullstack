import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, PartialObserver } from 'rxjs';
import { ListarCategoriaViewModel } from '../../categorias/models/categoria.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DespesasService } from '../service/despesas.service';
import { CategoriasService } from '../../categorias/service/categorias.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { DespesaEditadaViewModel, DespesaInseridaViewModel } from '../models/despesa.model';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatAnchor, MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatChip, MatChipRemove, MatChipSet } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-editar-excluir',
  standalone: true,
  imports: [
    AsyncPipe,
    MatAnchor,
    MatButton,
    MatChip,
    MatChipRemove,
    MatChipSet,
    MatDivider,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatMiniFabButton,
    MatOption,
    MatPrefix,
    MatSelect,
    MatSuffix,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './editar-despesas.component.html',
})
export class EditarDespesasComponent implements OnInit{
  public form: FormGroup;
  public categorias?: Observable<ListarCategoriaViewModel[]>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private despesaService: DespesasService,
    private categoriaService: CategoriasService,
    private notificacaoService: NotificacaoService,
  ) {
    this.form = this.fb.group({
      descricao: ['',Validators.required],
      valor:['',Validators.required],
      data: ['', Validators.required],
      formaPagamento: ['',Validators.required],
      categoriasSelecionadas:[[],Validators.required]
    })
  }

  ngOnInit(): void {
    this.categorias = this.categoriaService.selecionarTodos()

    const despesa = this.route.snapshot.data['despesa']

    this.form.patchValue({
      ...despesa,
      data: new Date(despesa.data).toISOString().substring(0,10),
      categoriasSelecionadas: despesa.categorias.map((c: ListarCategoriaViewModel) => c.id)
    })

/*    despesa.categorias.forEach((item: any)=>{
      this.categoriasSelecionadas.push({
        id: item.id,
        titulo:item.titulo,
      })
    })*/
  }


  get descricao() {
    return this.form.get('descricao')
  }

  get valor(){
    return this.form.get('valor')
  }

  get data() {
    return this.form.get('data')
  }

  get formaPagamento() {
    return this.form.get('formaPagamento')
  }

  get categoriasSelecionadas(){
    return this.form.get('categoriasSelecionadas') as FormArray
  }

/*  adicionarCategoria(categoria: ListarCategoriaViewModel) {
    this.categoriasSelecionadas.push(new FormControl(categoria.id));
  }

  removerCategoria(index: number){
    this.categoriasSelecionadas.removeAt(index)
  }*/

  public gravar(){
    if(this.form.invalid){
      return;
    }
    const id = this.route.snapshot.params['id'];
    const editarDespesaVm = this.form.value;

    console.log(editarDespesaVm)
    const observer: PartialObserver<DespesaEditadaViewModel> = {
      next: (despesaEditada) => this.processarSucesso(despesaEditada),
      error: (erro) => this.processarFalha(erro),
    }

    this.despesaService.editar(id,editarDespesaVm).subscribe(observer)
  }

  private processarSucesso(despesas: DespesaEditadaViewModel): void {
    this.notificacaoService.sucesso('Despesa editada com sucesso')

    this.router.navigate(['/despesas', 'listar'])
  }

  private processarFalha(erro: any) {
    this.notificacaoService.erro(erro);
  }
}
