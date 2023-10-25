import React, { useEffect, useState } from 'react';
import ItemList from './ItemList'; //-> import por default
import { useParams } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { dataBase } from '../firebase/firebaseConfig';

const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { tipoDeCategoria } = useParams();

    useEffect(() => {
        const coleccionDeProduct = collection(dataBase, 'productos');

        const referencia = tipoDeCategoria
            ? query(coleccionDeProduct, where('categoria', '==', tipoDeCategoria))
            : coleccionDeProduct;

        getDocs(referencia)
            .then((res) => {
                const productos = res.docs.map((prod) => {
                    return {
                        id: prod.id,
                        ...prod.data(),
                    };
                });
                setItems(productos);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });

        return () => setLoading(true);
    }, [tipoDeCategoria]);

    if (loading) {
        return (
            <div className="loading">
                <FadeLoader color="black" />
            </div>
        );
    }

    return (
        <main>
            <div className="item-list-container">
                <ItemList items={items} />
            </div>
        </main>
    );
};

export default ItemListContainer;