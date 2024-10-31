export interface InserirCategoriaViewModel{
  titulo: string,
}

export interface CategoriaInseridaViewModel{
  id: string,
  titulo: string,
}

export interface EditarCategoriaViewModel{
  titulo: string,
}

export interface CategoriaEditadaViewModel{
  id: string,
  titulo: string,
}

export interface CategoriaExcluidaViewModel {}

export interface ListarCategoriaViewModel {
  id: string,
  titulo: string,
}

export interface VisualizarCategoriaViewModel {
  id: string,
  titulo: string,
  //todo inplementar excluir
}
