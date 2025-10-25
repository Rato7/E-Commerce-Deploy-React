import { useEffect, useState } from "react";
import { getCart, updateCartItem, removeCartItem } from "../components/CartApi";

function CartPage() {
    const [cart, setCart] = useState(null)

    useEffect(() => {
        fetchCart()
    }, [])

    const fetchCart = async () => {
            try {
                const res = await getCart()
                setCart(res.data[0])
            } catch(err) {
                console.log(err)
            }
        }

    const handleUpdate = async(itemId, quantity) => {
        await updateCartItem(itemId, quantity)
        fetchCart()
    }

    const handleRemove = async(itemId) => {
        await removeCartItem(itemId)
        fetchCart()
    }

    if (!cart) return <p>Carregando...</p>

    return (
        <div className="container my-4">
            <h2>Meu Carrinho</h2>
            {cart.items.length === 0 ? <p>Carrinho vazio</p> : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Qtd</th>
                            <th>Preço</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.items.map(item => (
                            
                            <tr key={item.id}>
                                <script>console.log(item)</script>
                                <td>{item.name}</td>
                                <script></script>
                                <td>
                                    <input type="number" value={item.quantity} min="1"
                                        onChange={e => handleUpdate(item.id, parseInt(e.target.value))}/>
                                </td>
                                <td>${item.product.price}</td>
                                <td>${item.total_price}</td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>Remover</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <h4>Total: ${cart.total_price}</h4>
        </div>
    )
}

export default CartPage