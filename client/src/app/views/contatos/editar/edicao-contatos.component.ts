import { NgIf, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../services/contato.service';
import { ContatoEditadoViewModel } from '../models/contato.models';
import { PartialObserver } from 'rxjs';

@Component({
  selector: 'app-edicao-contatos',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './edicao-contatos.component.html',
})
export class EdicaoContatosComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private contatoService: ContatoService
  ) {
    this.form = this.fb.group({
      nome: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50)
        ]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      empresa: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      cargo: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
    })
  }
  ngOnInit(): void {
    const contato = this.route.snapshot.data['contato']

    this.form.patchValue(contato)
  }

  get nome() {
    return this.form.get('nome');
  }
  get telefone() {
    return this.form.get('telefone');
  }
  get email() {
    return this.form.get('email');
  }
  get empresa() {
    return this.form.get('empresa');
  }
  get cargo() {
    return this.form.get('cargo');
  }

  public gravar() {
    if (this.form.invalid) {
      return;
    }

    const id = this.route.snapshot.params['id']
    const editarContatoVm = this.form.value

    const observer: PartialObserver<ContatoEditadoViewModel> = {
      next: (contatoInserido) => this.processarSucesso(contatoInserido),
      error: (erro) => this.processarFalha(erro),
    }

    this.contatoService.editar(id, editarContatoVm).subscribe(observer)
  }

  private processarSucesso(contato: ContatoEditadoViewModel): void {
    console.log('Contato cadastrado com sucesso')

    this.router.navigate(['/contatos', 'listar'])
  }

  private processarFalha(erro: any) {
    console.log(erro);
  }
}
