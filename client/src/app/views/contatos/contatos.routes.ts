import { ActivatedRouteSnapshot, ResolveFn, Routes } from "@angular/router";
import { ListagemContatosComponent } from "./listar/listagem-contatos.component";
import { inject } from "@angular/core";
import { ContatoService } from "./services/contato.service";
import { ListarContatoViewModel, VisualizarContatoViewModel } from "./models/contato.models";
import { CadastroContatosComponent } from "./cadastrar/cadastro-contatos.component";
import { EdicaoContatosComponent } from "./editar/edicao-contatos.component";
import { ExclusaoContatosComponent } from "./excluir/exclusao-contatos.component";

const listagemContatosResolver: ResolveFn<ListarContatoViewModel[]> = () => {
    return inject(ContatoService).selecionarTodos();
}

const visualizarContatoResolver: ResolveFn<VisualizarContatoViewModel> = (route: ActivatedRouteSnapshot) => {
    const id = route.params['id']

    return inject(ContatoService).selecionarPorId(id)
}

export const contatosRoutes: Routes = [
    { path: '', redirectTo: 'listar', pathMatch: 'full' },
    {
        path: 'listar', component: ListagemContatosComponent, resolve: {
            contatos: listagemContatosResolver,
        }
    },

    { path: 'cadastrar', component: CadastroContatosComponent },
    {
        path: 'editar/:id', component: EdicaoContatosComponent, resolve: {
            contato: visualizarContatoResolver,
        }
    },
    {
        path: 'excluir/:id', component: ExclusaoContatosComponent, resolve: {
            contato: visualizarContatoResolver,
        }
    },
]