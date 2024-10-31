import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  DespesaEditadaViewModel, DespesaExcluidaViewModel,
  DespesaInseridaViewModel,
  EditarDespesaViewModel,
  InserirDespesaViewModel, ListarDespesasViewModel, VisualizarDespesaViewModel
} from '../models/despesa.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CategoriaExcluidaViewModel, VisualizarCategoriaViewModel } from '../../categorias/models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class DespesasService {

  private readonly url = `${environment.apiUrl}/despesas`;

  constructor(private http: HttpClient) { }

  inserir(inserirDespesaVm: InserirDespesaViewModel): Observable<DespesaInseridaViewModel>{
    return this.http.post<DespesaInseridaViewModel>(this.url, inserirDespesaVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  editar(id: string,editarDespesaVm: EditarDespesaViewModel):Observable<DespesaEditadaViewModel>{
    const urlCompleto = `${this.url}/${id}`

    return this.http.put<DespesaEditadaViewModel>(urlCompleto, editarDespesaVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  excluir(id: string): Observable<DespesaExcluidaViewModel> {
    const urlCompleto = `${this.url}/${id}`
    return this.http.delete<DespesaExcluidaViewModel>(urlCompleto)
      .pipe(map(this.processarDados),catchError(this.processarFalha))
  }

  selecionarTodos():Observable<ListarDespesasViewModel[]>{
    return this.http.get<ListarDespesasViewModel[]>(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha));
  }

  selecionarPorId(id: string): Observable<VisualizarDespesaViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`
    return this.http.get<VisualizarDespesaViewModel>(urlCompleto)
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
