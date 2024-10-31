import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CategoriasService } from '../service/categorias.service';
import { PartialObserver } from 'rxjs';
import { CategoriaInseridaViewModel } from '../models/categoria.model';
import { ContatoInseridoViewModel } from '../../contatos/models/contato.models';
import { MatAnchor, MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';

@Component({
  selector: 'app-cadastrar-categorias',
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
  templateUrl: './cadastrar-categorias.component.html',
})
export class CadastrarCategoriasComponent {
  public form: FormGroup;

  constructor(
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

  get titulo(){
    return this.form.get('titulo')
  }

  public gravar(){
    if(this.form.invalid){
      return;
    }

    const inserirCategoriaVm = this.form.value;

    const observer: PartialObserver<CategoriaInseridaViewModel> = {
      next: (categoriaInserida) => this.processarSucesso(categoriaInserida),
      error: (erro) => this.processarFalha(erro),
    }

    this.categoriaService.inserir(inserirCategoriaVm).subscribe(observer)
  }
  private processarSucesso(categoria: CategoriaInseridaViewModel): void {
   this.notificacao.sucesso('Categoria cadastrada com sucesso')

    this.router.navigate(['/categorias', 'listar'])
  }

  private processarFalha(erro: any) {
    this.notificacao.erro(erro);
  }
}
