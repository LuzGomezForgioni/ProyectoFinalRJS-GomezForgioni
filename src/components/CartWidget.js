import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { IoMdCart } from 'react-icons/io';

const CartWidget = () => {
    const { totalUnidades } = useContext(CartContext);

    const total = totalUnidades();

    return (
        <div className="widget-container">
            <span><IoMdCart size={25}/></span>
            <span>{total}</span>
        </div>
    );
};

export default CartWidget;