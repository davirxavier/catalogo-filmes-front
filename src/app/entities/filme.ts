import {Idioma} from './idioma';
import {CategoriaVO} from './categoria';

export interface FilmeVO
{
  id: number;
  titulo: string;
  sinopse: string;
  idioma: Idioma;
  categoria: CategoriaVO;
  imagem: string;
  imagemAlt: string;
  dataLancamento: string;
  duracao: string;
  desativado: boolean;
}

export interface FilmePagedListVO
{
  totalPages: number;
  totalElements: number;
  firstPage: boolean;
  lastPage: boolean;
  pageNumber: number;
  empty: boolean;

  filmes: Array<FilmeVO>;
}
