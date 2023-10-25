import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ prod }) => {
    return (
        <div className="card">
            <img className="card-img-top" src={prod.img} alt={prod.nombreProduc} />
            <div className="card-body">
                <h4 className="card-title">{prod.nombreProduc}</h4>
                <p className="card-text">${prod.precio}</p>
                {prod.stock === 0 ? (
                    <h6>No hay stock</h6>
                ) : (
                    <Link to={`/item/${prod.id}`}>Ver información</Link>
                )}
            </div>
        </div>
    );
};

export default Item;