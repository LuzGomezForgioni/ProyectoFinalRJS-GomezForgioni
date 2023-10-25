import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ItemDetailContainer from './components/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Form from './components/Form';
import Provider from './components/CartContext';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <Provider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<ItemListContainer />} />
                    <Route path="/categoria/:tipoDeCategoria" element={<ItemListContainer />}/>
                    <Route path="/item/:id" element={<ItemDetailContainer />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/finalizar" element={<Form />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </Provider>
    );
}

export default App;