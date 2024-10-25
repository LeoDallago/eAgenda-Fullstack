import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  EditarTarefaViewModel,
  InserirTarefaViewModel, ListarTarefaViewModel,
  TarefaEditadaViewModel, TarefaExcluidaViewModel,
  TarefaInseridaViewModel, VisualizarTarefaViewModel
} from '../models/tarefa.model';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private readonly url = `${environment.apiUrl}/tarefas`

  constructor(private http: HttpClient) { }

  inserir(inserirTarefaVm: InserirTarefaViewModel): Observable<TarefaInseridaViewModel> {
    return this.http.post<TarefaInseridaViewModel>(this.url, inserirTarefaVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  editar(id: string, editarTarefaVm: EditarTarefaViewModel): Observable<TarefaEditadaViewModel> {
    const urlComleto = `${this.url}/${id}`

    return this.http.put<TarefaEditadaViewModel>(urlComleto, editarTarefaVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  excluir(id: string): Observable<TarefaExcluidaViewModel> {
    const urlComleto = `${this.url}/${id}`
    return this.http.delete<TarefaExcluidaViewModel>(urlComleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  selecionarTodos(): Observable<ListarTarefaViewModel[]>{
    return this.http.get<ListarTarefaViewModel>(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  selecionarPorId(id: string): Observable<VisualizarTarefaViewModel> {
    const urlComleto = `${this.url}/visualizacao-completa/${id}`
    return this.http.get<VisualizarTarefaViewModel>(urlComleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }


  private processarDados(resposta: any) {
    if (resposta.sucesso) return resposta.dados;
    throw new Error('erro ao mapear dados');
  }

  private processarFalha(resposta: any) {
    return throwError(() => new Error(resposta.error.erros[0]))
  }
}
