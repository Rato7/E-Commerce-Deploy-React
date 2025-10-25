import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null)

    useEffect(() => {
        api.get(`/api/products/${id}/`)
        .then(res => setProduct(res.data))
        .catch(err => console.error(err))
    }, [id])

    if (!product) return <p>Carregando...</p>

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-6 text-center mb-4">
                <img
                    src={`${product.image}`}
                    className="img-fluid rounded shadow-sm"
                    alt={product.name}
                />
                </div>

                {/* Detalhes do Produto */}
                <div className="col-md-6">
                <h2 className="fw-bold mb-2">{product.name}</h2>
                <p className="text-muted mb-3">{product.category}</p>

                <h4 className="text-success mb-4">R$ {product.price}</h4>

                <p className="mb-4">{product.description}</p>

                <ul className="list-unstyled mb-4">
                    <li><strong>Estoque:</strong> {product.stock || 'Não informado'}</li>
                    <li><strong>Publicado em:</strong> {product.created_at || 'Único'}</li>
                </ul>

                <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-lg">
                    Adicionar ao carrinho
                    </button>
                    <button className="btn btn-outline-secondary btn-lg" onClick={() => window.history.back()}>
                    Voltar
                    </button>
                </div>
                </div>
            </div>
            </div>
    )
}

export default ProductDetails