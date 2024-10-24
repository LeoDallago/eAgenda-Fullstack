export interface InserirCompromissoViewModel {
    assunto: string,
    data: string,
    horaInicio: string,
    horaTermino: string,
    local: string,
    link: string,
    contato: string,
}

export interface CompromissoInseridoViewModel {
    id: string,
    assunto: string,
    data: string,
    horaInicio: string,
    horaTermino: string,
    local: string,
    link: string,
    contato: string,
}

export interface EditarCompromissoViewModel {
    assunto: string,
    data: string,
    horaInicio: string,
    horaTermino: string,
    local: string,
    link: string,
    contato: string,
}

export interface CompromissoEditadoViewModel {
    id: string,
    assunto: string,
    data: string,
    horaInicio: string,
    horaTermino: string,
    local: string,
    link: string,
    contato: string,
}

export interface CompromissoExcluidoViewModel { }

export interface ListarCompromissoViewModel {
    id: string,
    assunto: string,
    data: string,
    horaInicio: string,
    horaTermino: string,
    local: string,
    link: string,
    contato: string,
}

export interface VisualizarCompromissoViewModel {
    id: string,
    assunto: string,
    data: string,
    horaInicio: string,
    horaTermino: string,
    local: string,
    link: string,
    contato: string,
}