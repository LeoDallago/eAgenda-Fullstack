import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()

export class NotificacaoService {

  constructor(private snackBar: MatSnackBar) {}

  sucesso(mensagem: string): void{
    this.snackBar.open(mensagem, 'ok', {
      panelClass: ['notificacao-sucesso'],
    });
    }

  aviso(mensagem: string): void{
    this.snackBar.open(mensagem, 'ok', {
      panelClass: ['notificacao-aviso'],
      duration: 5000,
    });
  }

  erro(mensagem: string): void{
    this.snackBar.open(mensagem, 'ok', {
      panelClass: ['notificacao-erro'],
      duration: 5000,
    });
  }
}
