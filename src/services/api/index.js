/**
 * @author Alexandre Thebaldi <ahlechandre@gmail.com>
 */

import { api } from '../../env.json'

/**
 * Monta o objeto de URL para API do blog conforme as opções indicadas.
 * 
 * @param {Object} options 
 */
const useUrl = options => {
  const { resource, id, page } = options
  const url = new URL(api[resource])

  // Se existir recurso específico.
  if (id) {
    return new URL(id, url)
  }

  // Se existir páginação.
  if (page) {
    url.searchParams.set('page', page)

    return url
  }

  return url
}

/**
 * Exemplo de utilização:
 *  - Api('articles').paginate(1)
 *  - Api('articles').show(15)
 *  - Api('contacts').store({ name: "Alexandre Thebaldi", ...fields })
 * 
 * @param {string} resource 
 */
export default function Api(resource) {
  // Ações REST para recurso.
  return {
    /**
     * Lista todos os recursos da coleção na página indicada.
     * 
     * @param {null|Number} page 
     */
    paginate(page) {
      return fetch(useUrl({ resource, page }))
    },
  
    /**
     * Mostra um único recurso da coleção.
     * 
     * @param {Number} id 
     */
    show(id) {
      return fetch(useUrl({ resource, id }))
    },
  
    /**
     * Armazena um recurso na coleção.
     * 
     * @param {Object} data 
     */
    store(data) {
      return fetch(useUrl({ resource }), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    }
  }
}
