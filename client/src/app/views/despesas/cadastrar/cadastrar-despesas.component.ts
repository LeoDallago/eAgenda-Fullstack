import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DespesasService } from '../service/despesas.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { Observable, PartialObserver } from 'rxjs';
import { DespesaInseridaViewModel } from '../models/despesa.model';
import { CompromissoInseridoViewModel } from '../../compromissos/models/compromisso.model';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatAnchor, MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { CategoriasService } from '../../categorias/service/categorias.service';
import { ListarCategoriaViewModel } from '../../categorias/models/categoria.model';
import { MatChip, MatChipRemove, MatChipSet } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-cadastrar-excluir',
  standalone: true,
  imports: [
    AsyncPipe,
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
    MatMiniFabButton,
    MatChip,
    MatChipRemove,
    MatChipSet,
    MatDivider
  ],
  templateUrl: './cadastrar-despesas.component.html',
})
export class CadastrarDespesasComponent implements OnInit{
  public form: FormGroup;
  public categorias?: Observable<ListarCategoriaViewModel[]>

  constructor(
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
      categoriasSelecionadas: this.fb.array([])
    })
  }

  ngOnInit(): void {
        this.categorias = this.categoriaService.selecionarTodos()
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

  adicionarCategoria(categoria: ListarCategoriaViewModel) {
      this.categoriasSelecionadas.push(new FormControl(categoria.id));
  }

  removerCategoria(index: number){
    this.categoriasSelecionadas.removeAt(index)
  }

  public gravar(){
    if(this.form.invalid){
      return;
    }

    const inserirDespesaVm = this.form.value;
    console.log(inserirDespesaVm)
    const observer: PartialObserver<DespesaInseridaViewModel> = {
      next: (despesaInserida) => this.processarSucesso(despesaInserida),
      error: (erro) => this.processarFalha(erro),
    }

    this.despesaService.inserir(inserirDespesaVm).subscribe(observer)
  }

  private processarSucesso(despesas: DespesaInseridaViewModel): void {
    this.notificacaoService.sucesso('Despesa cadastrada com sucesso')

    this.router.navigate(['/despesas', 'listar'])
  }

  private processarFalha(erro: any) {
    this.notificacaoService.erro(erro);
  }

}
