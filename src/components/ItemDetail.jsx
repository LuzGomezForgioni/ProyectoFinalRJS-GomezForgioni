import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import ItemCount from './ItemCount';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ItemDetail = ({ item }) => {
    const [unidades, setUnidades] = useState(0);

    const { agregarAlCarrito, cantidadProduct } = useContext(CartContext);

    const prueba = (numero) => {
        setUnidades(numero);
        agregarAlCarrito(item, numero);
        toast.success(`Añadiste ${numero} unidad/es`);
    };

    const quantity = cantidadProduct(item.id);

    return (
        <div className="container-detail">
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            />
            <img src={item.img} alt="" />
            <div>
                <h2 className="h2--title">{item.nombreProduc}</h2>
                <p>{item.descripcion}</p>
                {unidades === 0 ? (
                    item.stock === 0 ? (
                        <h1>No hay stock</h1>
                    ) : (<ItemCount prueba={prueba} stock={item.stock} initial={quantity} />)
                ) : (<Link className="btn-itemD" to="/cart">Ir al carrito</Link>)}
            </div>
        </div>
    );
};

export default ItemDetail;