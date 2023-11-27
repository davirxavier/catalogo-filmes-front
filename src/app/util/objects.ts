/**
 * Retorna um novo objeto com propriedades copiadas do original sem conter a chave
 * especificada. Caso o objeto esteja vazio retorna null.
 */
export function withoutProperty(obj: object, keyToDelete: string): object
{
  if (obj)
  {
    let newObj = cloneProperties(obj);
    delete newObj[keyToDelete];

    if (Object.keys(newObj).length === 0)
    {
      newObj = null;
    }
    return newObj;
  }

  return null;
}

/**
 * Retorna um clone do objeto passado com a propriedade especificada.
 */
export function withProperty(obj: object, key: string, value: any): object
{
  let newObj = cloneProperties(obj);
  if (!newObj)
  {
    newObj = {};
  }

  newObj[key] = value;
  return newObj;
}

/**
 * Clona todas as propriedades de um objeto em um outro objeto novo.
 */
export function cloneProperties(objToClone: object): object
{
  if (objToClone)
  {
    return Object.assign({}, objToClone);
  }
  return null;
}
