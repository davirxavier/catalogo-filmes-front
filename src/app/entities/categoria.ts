import {FilmeVO} from './filme';
import {Idioma} from './idioma';

export interface CategoriaVO
{
  id: number;
  nome: string;
  tag: string;
  idioma: Idioma;
  filmes: Array<FilmeVO>;
  hasFilmes: boolean;
  desativado: boolean;
}
