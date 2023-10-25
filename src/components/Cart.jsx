import { useContext } from 'react';
import { CartContext } from './CartContext';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cart, borrarTodo, borrarProduc, precioTotal } = useContext(CartContext);

    const total = precioTotal();

    if (cart.length === 0) {
        return <div className="carrito-vacio">
            <h1>Aún no hay productos en el carrito</h1>
            <span><Link to="/">Inicio</Link>{' '}</span>
        </div>
    }

    return (
        <section className="section-cart">
            {cart.map((prod) => (
                <div key={prod.id}>
                    <div className="container-cart">
                        <img src={prod.img} alt={prod.nombreProduc} width="80px" />
                        <div>
                            <h3>{prod.nombreProduc}</h3>
                            <h5>Cantidad: {prod.cantidad}</h5>
                            <h5>Precio Unidad: ${prod.precio}</h5>
                            <h5>Subtotal: ${prod.precio * prod.cantidad}</h5>
                            <p>Eliminar producto<AiFillDelete size={25} color="red" cursor="pointer" onClick={() => borrarProduc(prod.id)} /></p>
                        </div>
                    </div>
                </div>
            ))}
            <h2>Total: ${total}</h2>
            <div className="btns-cart">
                <button onClick={borrarTodo}>Eliminar todos los productos</button>
                <Link to="/finalizar">Finalizar compra</Link>
            </div>
        </section>
    );
};

export default Cart;