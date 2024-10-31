import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriasService } from '../service/categorias.service';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { PartialObserver } from 'rxjs';
import { CategoriaEditadaViewModel, CategoriaInseridaViewModel } from '../models/categoria.model';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-editar-categorias',
  standalone: true,
  imports: [
    FormsModule,
    MatAnchor,
    MatButton,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatPrefix,
    MatSuffix,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './editar-categorias.component.html',
})
export class EditarCategoriasComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private categoriaService: CategoriasService,
    private notificacao: NotificacaoService,
  ) {
    this.form = this.fb.group({
      titulo: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20)
        ]]
    })
  }

  ngOnInit(): void {
    const categoria = this.route.snapshot.data['categoria']

    this.form.patchValue(categoria);
    }

  get titulo(){
    return this.form.get('titulo')
  }

  public gravar(){
    if(this.form.invalid){
      return;
    }

    const id = this.route.snapshot.params['id']
    const editarCategoriaVm = this.form.value;

    const observer: PartialObserver<CategoriaEditadaViewModel> = {
      next: (categoriaEditada) => this.processarSucesso(categoriaEditada),
      error: (erro) => this.processarFalha(erro),
    }

    this.categoriaService.editar(id,editarCategoriaVm).subscribe(observer)
  }
  private processarSucesso(categoria: CategoriaEditadaViewModel): void {
    this.notificacao.sucesso('Categoria editada com sucesso')

    this.router.navigate(['/categorias', 'listar'])
  }

  private processarFalha(erro: any) {
    this.notificacao.erro(erro);
  }
}
