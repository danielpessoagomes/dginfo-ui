export interface Categoria {
  codigo: number;
  classificacao: {
    codigo: null,
    descricao: null,
  };
  subClassificacao: {
    codigo: null,
    descricao: null,
  };
  descricao: string;
}

export class CategoriaFilter {
  pagina = 0;
  itensPorPagina = 10;
  descricao: string;
}
