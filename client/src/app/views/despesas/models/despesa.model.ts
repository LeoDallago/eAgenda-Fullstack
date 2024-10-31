export interface InserirDespesaViewModel{
  descricao: string,
  valor: number,
  data: string,
  formaPagamento: number,
  categoriasSelecionadas: string[],
}

export interface DespesaInseridaViewModel {
  id: string,
  descricao: string,
  valor: number,
  data: string,
  formaPagamento: number,
  categoriasSelecionadas: string[],
}

export interface EditarDespesaViewModel {
  descricao: string,
  valor: number,
  data: string,
  formaPagamento: number,
  categoriasSelecionadas: string[],
}

export interface DespesaEditadaViewModel {
  id: string,
  descricao: string,
  valor: number,
  data: string,
  formaPagamento: number,
  categoriasSelecionadas: string[],
}

export interface DespesaExcluidaViewModel {}

export interface ListarDespesasViewModel {
  id: string,
  descricao: string,
  valor: number,
  data: string,
  formaPagamento: string,
}

export interface VisualizarDespesaViewModel {
  id: string,
  descricao: string,
  valor: number,
  data: string,
  formaPagamento: string,
  categoriasSelecionadas: string[],
}
