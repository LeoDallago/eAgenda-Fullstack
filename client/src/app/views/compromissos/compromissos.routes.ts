import { ActivatedRouteSnapshot, ResolveEnd, ResolveFn, Routes } from "@angular/router";
import { ListarCompromissoViewModel, VisualizarCompromissoViewModel } from "./models/compromisso.model";
import { inject } from "@angular/core";
import { CompromissosService } from "./service/compromissos.service";
import { ListarCompromissosComponent } from "./listar/listar-compromissos.component";
import { CadastrarCompromissosComponent } from "./cadastrar/cadastrar-compromissos/cadastrar-compromissos.component";
import { EditarCompromissosComponent } from "./editar/editar-compromissos/editar-compromissos.component";
import { ExcluirCompromissosComponent } from "./excluir/excluir-compromissos/excluir-compromissos.component";


const listagemCompromissosResolver: ResolveFn<ListarCompromissoViewModel[]> = () => {
    return inject(CompromissosService).selecionarTodos();
}

const visualizarCompromissoResolver: ResolveFn<VisualizarCompromissoViewModel> = (route: ActivatedRouteSnapshot) => {
    const id = route.params['id'];

    return inject(CompromissosService).selecionarPorId(id);
}

export const compromissosRoutes: Routes = [
    { path: '', redirectTo: 'listar', pathMatch: 'full' },

    {
        path: 'listar', component: ListarCompromissosComponent, resolve: {
            compromissos: listagemCompromissosResolver,
        }
    },

    { path: 'cadastrar', component: CadastrarCompromissosComponent },

    {
        path: 'editar/:id', component: EditarCompromissosComponent, resolve: {
            compromissos: visualizarCompromissoResolver
        }
    },
    {
        path: 'excluir/:id', component: ExcluirCompromissosComponent, resolve: {
            compromissos: visualizarCompromissoResolver
        }
    }
]