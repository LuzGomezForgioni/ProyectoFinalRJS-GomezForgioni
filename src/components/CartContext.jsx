import { createContext, useState } from 'react';

export const CartContext = createContext();

const Provider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const agregarAlCarrito = (item, cantidad) => {
        const producto = { ...item, cantidad };
        if (isInCart(producto.id)) {
            sumarCantidad(producto);
        } else {
            setCart([...cart, producto]);
        }
    };

    const sumarCantidad = (producAgregado) => {
        const carritoActualizado = cart.map((producCarrito) => {
            if (producCarrito.id === producAgregado.id) {
                const producActualizado = {
                    ...producCarrito,
                    cantidad: producAgregado.cantidad,
                };
                return producActualizado;
            } else {
                return producCarrito;
            }
        });
        setCart(carritoActualizado);
    };

    const isInCart = (id) => cart.some((prod) => prod.id === id);

    const borrarTodo = () => {
        setCart([]);
    }

    const borrarProduc = (id) => {
        const producFiltrados = cart.filter((prod) => prod.id !== id);
        setCart(producFiltrados);
    };

    const totalUnidades = () => {
        let acumulador = 0;
        const copia = [...cart];
        copia.forEach((prod) => {
            acumulador += prod.cantidad;
        });
        return acumulador;
    };

    const total = () => {
        return 1000;
    };

    const precioTotal = () => {
        let acumulador = 0;
        const copia = [...cart]
        copia.forEach((prod) => {
            acumulador += prod.cantidad * prod.precio;
        });
        return acumulador;
    };

    const cantidadProduct = (id) => {
        const product = cart.find((prod) => prod.id === id);
        return product?.cantidad;
    };

    return (
        <CartContext.Provider
            value={{cart, total, precioTotal, totalUnidades, agregarAlCarrito, borrarTodo, borrarProduc, cantidadProduct}}>
            {children}
        </CartContext.Provider>
    );
};

export default Provider;