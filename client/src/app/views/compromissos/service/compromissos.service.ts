import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../core/auth/services/local-storage.service';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { CompromissoEditadoViewModel, CompromissoExcluidoViewModel, CompromissoInseridoViewModel, EditarCompromissoViewModel, InserirCompromissoViewModel, ListarCompromissoViewModel, VisualizarCompromissoViewModel } from '../models/compromisso.model';
import { ContatoExcluidoViewModel } from '../../contatos/models/contato.models';

@Injectable({
  providedIn: 'root'
})
export class CompromissosService {

  private readonly url = `${environment.apiUrl}/compromissos`

  constructor(
    private http: HttpClient,
  ) { }

  inserir(inserirCompromissoVm: InserirCompromissoViewModel): Observable<CompromissoInseridoViewModel> {
    return this.http.post<CompromissoInseridoViewModel>(this.url, inserirCompromissoVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  editar(id: string, editarContatoVm: EditarCompromissoViewModel): Observable<CompromissoEditadoViewModel> {
    const urlComleto = `${this.url}/${id}`
    return this.http.put<CompromissoEditadoViewModel>(urlComleto, editarContatoVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  excluir(id: string): Observable<CompromissoExcluidoViewModel> {
    const urlComleto = `${this.url}/${id}`
    return this.http.delete<ContatoExcluidoViewModel>(urlComleto)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    return this.http.get<ListarCompromissoViewModel[]>(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  selecionarPorId(id: string): Observable<VisualizarCompromissoViewModel> {
    const urlComleto = `${this.url}/visualizacao-completa/${id}`
    return this.http.get<VisualizarCompromissoViewModel>(urlComleto)
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
