export interface InserirTarefaViewModel {
    titulo: string,
    prioridade: number,
    itens:string,
}

export interface TarefaInseridaViewModel {
    id: string,
    titulo: string,
    prioridade: number,
    itens:string,
}

export interface EditarTarefaViewModel {
    titulo: string,
    prioridade: number,
    itens:string,
}

export interface TarefaEditadaViewModel {
    id: string,
    titulo: string,
    prioridade: number,
    itens:string,
}

export interface TarefaExcluidaViewModel { }

export interface ListarTarefaViewModel {
    id: string,
    titulo: string,
    prioridade: string,
    dataCriacao: string,
    dataConclusao: string,
    itens:string,
}

export interface VisualizarTarefaViewModel {
    id: string,
    titulo: string,
    prioridade: string,
    dataCriacao: string,
    dataConclusao: string,
    itens:VisualizarItensViewModel[],
}

export interface VisualizarItensViewModel{
  titulo: string,
  status: number,
  concluido: boolean
}
