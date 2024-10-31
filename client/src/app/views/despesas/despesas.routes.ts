import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { ListarDespesasViewModel, VisualizarDespesaViewModel } from './models/despesa.model';
import { resolve } from '@angular/compiler-cli';
import { DespesasService } from './service/despesas.service';
import { inject } from '@angular/core';
import { VisualizarCategoriaViewModel } from '../categorias/models/categoria.model';
import { CategoriasService } from '../categorias/service/categorias.service';
import { ListagemContatosComponent } from '../contatos/listar/listagem-contatos.component';
import { ListarDespesasComponent } from './listar/listar-despesas.component';
import { CadastrarDespesasComponent } from './cadastrar/cadastrar-despesas.component';
import { EditarDespesasComponent } from './editar/editar-despesas.component';
import { ExcluirDespesasComponent } from './despesas/excluir-despesas.component';


const listagemDespesasResolver: ResolveFn<ListarDespesasViewModel[]> = ()=>{
  return inject(DespesasService).selecionarTodos();
}

const visualizarDespesaResolver: ResolveFn<VisualizarDespesaViewModel> = (route: ActivatedRouteSnapshot) =>{
  const id = route.params['id']

  return inject(DespesasService).selecionarPorId(id)
}

export const despesaRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },

  { path: 'listar', component: ListarDespesasComponent, resolve: {
    despesas: listagemDespesasResolver
    }
  },

  { path: 'cadastrar', component: CadastrarDespesasComponent},

  {
    path: 'editar/:id', component: EditarDespesasComponent, resolve:{
      despesa: visualizarDespesaResolver
    }
  },

  {
    path: 'excluir/:id', component: ExcluirDespesasComponent, resolve:{
      despesa: visualizarDespesaResolver
    }
  }
]
