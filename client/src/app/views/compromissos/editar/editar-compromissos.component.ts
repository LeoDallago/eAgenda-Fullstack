import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, PartialObserver } from 'rxjs';
import { NotificacaoService } from '../../../core/notificacao/notificacao.service';
import { CompromissoEditadoViewModel } from '../models/compromisso.model';
import { CompromissosService } from '../service/compromissos.service';
import { ListarContatoViewModel } from '../../contatos/models/contato.models';
import { ContatoService } from '../../contatos/services/contato.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-editar-compromissos',
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
    AsyncPipe
  ],
  templateUrl: './editar-compromissos.component.html',
})
export class EditarCompromissosComponent implements OnInit {
  public form: FormGroup;
  public contatos?: Observable<ListarContatoViewModel[]>

  constructor(
    private route: ActivatedRoute,
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
      contato: ['', Validators.required, [Validators.maxLength(20)]],
    })
  }
  ngOnInit(): void {
    this.contatos = this.contatoService.selecionarTodos();
    const compromisso = this.route.snapshot.data['compromisso']

    this.form.patchValue(compromisso)
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

  get contato() {
    return this.form.get('contato')
  }

  public gravar() {
    if (this.form.invalid) {
      return;
    }

    const id = this.route.snapshot.params['id']
    const editarCompromissoVm = this.form.value

    const observer: PartialObserver<CompromissoEditadoViewModel> = {
      next: (compromissoEditado) => this.processarSucesso(compromissoEditado),
      error: (erro) => this.processarFalha(erro),
    }

    this.compromissoService.editar(id, editarCompromissoVm).subscribe(observer)
  }

  private processarSucesso(compromisso: CompromissoEditadoViewModel): void {
    this.notificacaoService.sucesso('Compromisso editado com sucesso')

    this.router.navigate(['/compromissos', 'listar'])
  }

  private processarFalha(erro: any) {
    this.notificacaoService.erro(erro);
  }
}
