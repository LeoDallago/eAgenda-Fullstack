import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { ListarCategoriaViewModel, VisualizarCategoriaViewModel } from './models/categoria.model';
import { CategoriasService } from './service/categorias.service';
import { inject } from '@angular/core';
import { ContatoService } from '../contatos/services/contato.service';
import { resolve } from '@angular/compiler-cli';
import { ListarCategoriasComponent } from './listar/listar-categorias.component';
import { CadastrarCategoriasComponent } from './cadastrar/cadastrar-categorias.component';
import { EditarCategoriasComponent } from './editar/editar-categorias.component';
import { ExcluirCategoriasComponent } from './excluir/excluir-categorias.component';


const listagemCategoriasResolver: ResolveFn<ListarCategoriaViewModel[]> = ()=>{
  return inject(CategoriasService).selecionarTodos();
}

const visualizarCategoriaResolver: ResolveFn<VisualizarCategoriaViewModel> = (route: ActivatedRouteSnapshot) =>{
  const id = route.params['id']

  return inject(CategoriasService).selecionarPorId(id)
}

export const categoriaRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },

  {
    path: 'listar', component: ListarCategoriasComponent, resolve:{
    categorias: listagemCategoriasResolver
    }
  },

  { path: 'cadastrar', component: CadastrarCategoriasComponent },

  {
    path: 'editar/:id', component: EditarCategoriasComponent, resolve:{
      categoria: visualizarCategoriaResolver
    }
  },

  {
    path: 'excluir/:id', component: ExcluirCategoriasComponent, resolve:{
      categoria: visualizarCategoriaResolver
    }
  },
]
