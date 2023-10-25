import React, { useEffect, useState } from 'react';
import CartWidget from './CartWidget';
import { Link, NavLink } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { dataBase } from '../firebase/firebaseConfig';

const Navbar = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const coleccionCategorias = collection(dataBase, 'categorias');
        getDocs(coleccionCategorias)
            .then((res) => {
                const categorias = res.docs.map((cat) => {
                    return {
                        id: cat.id,
                        ...cat.data(),
                    };
                });
                setCategorias(categorias);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid">
                <Link to="/">
                    <img src="https://res.cloudinary.com/dte1karmc/image/upload/v1667678712/CallVille/icono_czpesk.png" alt="icono" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        {categorias.map((cat) => (
                            <NavLink key={cat.id} to={`/categoria/${cat.ruta}`}>
                                {cat.nombre}
                            </NavLink>
                        ))}
                    </ul>
                    <Link to="/cart">
                        <CartWidget />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;