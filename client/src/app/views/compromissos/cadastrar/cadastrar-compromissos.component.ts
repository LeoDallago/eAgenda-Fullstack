import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { CompromissosService } from '../service/compromissos.service';
import { Observable, PartialObserver } from 'rxjs';
import { CompromissoInseridoViewModel } from '../models/compromisso.model';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { MatSelectModule } from '@angular/material/select';
import { ContatoService } from '../../contatos/services/contato.service';
import { ListarContatoViewModel } from '../../contatos/models/contato.models';

@Component({
  selector: 'app-cadastrar-compromissos',
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
    MatSelectModule,
    AsyncPipe,
  ],
  templateUrl: './cadastrar-compromissos.component.html',
})
export class CadastrarCompromissosComponent implements OnInit {
  public form: FormGroup;
  public contatos?: Observable<ListarContatoViewModel[]>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private compromissoService: CompromissosService,
    private contatoService: ContatoService,
    private notificacaoService: NotificacaoService,
  ) {
    this.form = this.fb.group({
      assunto: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]],
      data: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
      local: ['', Validators.required, [Validators.minLength(3), Validators.maxLength(20)]],
      link: ['', Validators.required],
    })
  }

  get assunto() {
    return this.form.get('assunto');
  }

  get data() {
    return this.form.get('data')
  }

  get horaInicio() {
    return this.form.get('horaInicio')
  }

  get horaTermino() {
    return this.form.get('horaTermino')
  }

  get local() {
    return this.form.get('local')
  }

  get link() {
    return this.form.get('link')
  }

  ngOnInit(): void {
    this.contatos = this.contatoService.selecionarTodos();
  }

  public gravar() {
    if (this.form.invalid) {
      return;
    }

    const inserirCompromissoVm = this.form.value

    const observer: PartialObserver<CompromissoInseridoViewModel> = {
      next: (compromissoInserido) => this.processarSucesso(compromissoInserido),
      error: (erro) => this.processarFalha(erro),
    }

    this.compromissoService.inserir(inserirCompromissoVm).subscribe(observer)
  }

  private processarSucesso(compromisso: CompromissoInseridoViewModel): void {
    this.notificacaoService.sucesso('Compromisso cadastrado com sucesso')

    this.router.navigate(['/compromissos', 'listar'])
  }

  private processarFalha(erro: any) {
    this.notificacaoService.erro(erro);
  }
}
