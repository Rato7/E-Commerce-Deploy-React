import api from "../api";

export const getCart = () => api.get('api/cart/')
export const addToCart = (productId, quantity = 1) => api.post('api/cart-items/', { product: productId, quantity})
export const updateCartItem = (id, quantity) => api.put(`api/cart-items/${id}`, { quantity })
export const removeCartItem = (id) => api.delete(`api/cart-items/${id}`)


export const handleAddToCart = async (productId) => {
  try {
    await addToCart(productId, 1) // quantidade padrão = 1
    alert('Produto adicionado ao carrinho!') // ou use um toast mais bonito
  } catch (error) {
    console.error(error)
    alert('Erro ao adicionar o produto.')
  }
}