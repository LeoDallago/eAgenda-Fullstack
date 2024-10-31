import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  CategoriaEditadaViewModel, CategoriaExcluidaViewModel,
  CategoriaInseridaViewModel,
  EditarCategoriaViewModel,
  InserirCategoriaViewModel, ListarCategoriaViewModel, VisualizarCategoriaViewModel
} from '../models/categoria.model';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private readonly url = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) { }

  inserir(inserirCategoriaVm: InserirCategoriaViewModel): Observable<CategoriaInseridaViewModel>{
    return this.http.post<CategoriaInseridaViewModel>(this.url, inserirCategoriaVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  editar(id: string, editarCategoriaVm:EditarCategoriaViewModel): Observable<CategoriaEditadaViewModel>{
    const urlCompleto = `${this.url}/${id}`
    return this.http.put<CategoriaEditadaViewModel>(urlCompleto, editarCategoriaVm)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  excluir(id: string): Observable<CategoriaExcluidaViewModel> {
    const urlCompleto = `${this.url}/${id}`
    return this.http.delete<CategoriaExcluidaViewModel>(urlCompleto)
      .pipe(map(this.processarDados),catchError(this.processarFalha))
  }

  selecionarTodos():Observable<ListarCategoriaViewModel[]>{
    return this.http.get<ListarCategoriaViewModel[]>(this.url)
      .pipe(map(this.processarDados), catchError(this.processarFalha))
  }

  selecionarPorId(id: string): Observable<VisualizarCategoriaViewModel> {
    const urlCompleto = `${this.url}/visualizacao-completa/${id}`
    return this.http.get<VisualizarCategoriaViewModel>(urlCompleto)
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
