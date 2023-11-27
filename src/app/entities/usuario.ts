import {Idioma} from './idioma';

export interface UsuarioVO
{
  id: number;
  nome: string;
  idioma: Idioma;
  username: string;
  cpf: string;
  telefone: string;
  email: string;
  senha: string;
  perfil: string;
  desativado: boolean;
}

export interface UsuarioPutDTO
{
  id: number;
  nome: string;
  idioma: Idioma;
  cpf: string;
  telefone: string;
  email: string;
  senha: string;
  perfil: string;
  desativado: boolean;
}
