import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { ListarTarefaViewModel, VisualizarTarefaViewModel } from './models/tarefa.model';
import { inject } from '@angular/core';
import { TarefasService } from './service/tarefas.service';
import { ListarTarefasComponent } from './listar/listar-tarefas.component';
import { CadastrarTarefasComponent } from './cadastrar/cadastrar-tarefas.component';
import { EditarTarefasComponent } from './editar/editar-tarefas.component';
import { ExcluirTarefasComponent } from './excluir/excluir-tarefas.component';


const listagemTarefasResolver: ResolveFn<ListarTarefaViewModel[]> = () =>{
  return inject(TarefasService).selecionarTodos();
}

const visualizarTarefaResolver: ResolveFn<VisualizarTarefaViewModel> = (route: ActivatedRouteSnapshot) =>{
  const id = route.params['id']

  return inject(TarefasService).selecionarPorId(id);
}

export const tarefasRoutes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },

  { path: 'listar', component: ListarTarefasComponent, resolve: {
    tarefas: listagemTarefasResolver,
    }
  },

  { path: 'cadastrar', component: CadastrarTarefasComponent },

  { path: 'editar/:id', component:EditarTarefasComponent, resolve:{
      tarefa: visualizarTarefaResolver
    }
  },

  { path: 'excluir/:id', component:ExcluirTarefasComponent, resolve:{
      tarefa: visualizarTarefaResolver
    }
  }

]
