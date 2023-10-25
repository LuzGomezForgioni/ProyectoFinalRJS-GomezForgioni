import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from './CartContext';
import { dataBase } from '../firebase/firebaseConfig';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

const Formulario = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [segundoCorreo, setSegundoCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [loading, setLoading] = useState(false);
    const [ordenId, setOrdenId] = useState("");
    const { cart, total, borrarTodo } =
        useContext(CartContext);
    const precioTotal = total();

    const handleSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const orden = {
            datos: { nombre, apellido },
            correo: { correo },
            items: cart,
            total: precioTotal,
            fecha: serverTimestamp(),
        };

        const crearorden = collection(dataBase, "ordenes");
        addDoc(crearorden, orden)
            .then((res) => {
                setOrdenId(res.id);
                borrarTodo();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => setLoading(false));
    };

    const handleChangeNombre = (e) => {
        setNombre(e.target.value);
    };

    const handleChangeApellido = (e) => {
        setApellido(e.target.value);
    };

    const handleCorreo = (e) => {
        setCorreo(e.target.value);
    };

    const handleSegundoCorreo = (e) => {
        setSegundoCorreo(e.target.value);
    };

    const handleTelefono = (e) => {
        setTelefono(e.target.value);
    };

    if (ordenId) {
        return (
            <div className="orden">
                <h5>Muchas gracias por su compra, tu número de seguimiento es:{" "}<b>{ordenId}</b></h5>
                <Link to='/'>
                    <button>
                        <small>Volver a Inicio</small>
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <Container>
            <h4 className="h4-form">Para finalizar su compra complete el siguiente formulario por favor:</h4>
            <Form className="form" onSubmit={handleSubmit} action=''>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label className='form-label'>Nombre</Form.Label>
                    <Form.Control className="form-control" type='text' name='nombre' onChange={handleChangeNombre} value={nombre} placeholder='Ingresar Nombre' required />
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label className='form-label'>Apellido</Form.Label>
                    <Form.Control className="form-control" type='text' name='apellido' onChange={handleChangeApellido} value={apellido} placeholder='Ingresar Apelllido' required />
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label className='form-label'>Teléfono</Form.Label>
                    <Form.Control className="form-control" type='number' name='telefono' onChange={handleTelefono} value={telefono} placeholder='Ingresar Teléfono' required />
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label className='form-label'>Correo Electrónico</Form.Label>
                    <Form.Control className="form-control" type='email' name='email' onChange={handleCorreo} value={correo} placeholder="ejemplo@ejemplo.com" required />
                </Form.Group>
                <Form.Group className="mb-3 mt-3">
                    <Form.Label className='form-label'>
                        Por favor repita su correo electrónico
                    </Form.Label>
                    <Form.Control className="form-control" type='email' name='email' placeholder="ejemplo@ejemplo.com" onChange={handleSegundoCorreo} value={segundoCorreo} required />
                    <Form.Text
                        style={
                            correo !== segundoCorreo || (correo === "" && segundoCorreo === "")
                                ? { color: "red", fontWeight: "bold" }
                                : { color: "green", fontWeight: "bold" }}>
                        {correo !== segundoCorreo || (correo === "" && segundoCorreo === "")
                            ? "Los Correos deben coincidir"
                            : "Los correos coinciden"}
                    </Form.Text>
                </Form.Group>
                <Button type='submit' className="btn-form" disabled={
                    correo !== segundoCorreo || (correo === "" && segundoCorreo === "")}>
                    {loading ? "Cargando..." : "Finalizar Compra"}
                </Button>
            </Form>
        </Container>
    );
};

export default Formulario;