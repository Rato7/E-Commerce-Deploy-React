import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import LoadingIndicator from "../components/LoadingIndicator"
import { handleAddToCart } from "../components/CartApi";


function Home() {
    const [user, setUser] = useState(null)

    const [products, setProducts] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await api.get('/api/me/')
                setUser(res.data)
            } catch (err) {
                alert('Erro ao buscar usuário: ', err)
            }
        }
        fetchUser()
    }, [])

    useEffect(() => {
        api.get('/api/products/')
        .then(res => setProducts(res.data))
        .catch(err => console.error(err));
    }, [])

    if (!user) return <LoadingIndicator/>

    return <div>
        <h1>Salve, {user.username}</h1>
        <h2>Produtos recomendados:</h2>

        <div className="store-catalog">
            <h1>Produtos:</h1>
            <div className="row">
                {products.map((p) => (
                <div className="col-md-3 mb-4" key={p.id}>
                    <div className="card h-100">
                    <img
                        src={p.image}
                        className="card-img-top"
                        alt={p.name}
                        style={{ height: '200px', objectFit: 'cover', cursor: 'pointer' }}
                        onClick={() => {
                            navigate(`products/${p.id}`)
                        }}
                        
                    />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        <button className="btn btn-primary mt-auto"
                        onClick={() => {
                            handleAddToCart(p.id)
                            console.log(p.id, 1)
                        }}
                        >Adicionar ao carrinho</button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
}

export default Home