import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';

const Footer = () => {
    const handleClick = () => {
        window.open("https://www.facebook.com/", '_blank')
    }

    const handleClick2 = () => {
        window.open("https://www.instagram.com/", '_blank')
    }

    const handleClick3 = () => {
        window.open("https://www.twitter.com/", '_blank')
    }

    const handleClick4 = () => {
        window.open("https://www.whatsapp.com/", '_blank')
    }

    const handleClick5 = () => {
        window.open("https://www.gmail.com/", '_blank')
    }

    return <footer>
        <div className="footer1">
            <div className="footerInline">
                <h4>Seguinos</h4>
                <span onClick={handleClick} ><BsFacebook cursor="pointer" className="fa-brands fa-facebook"/></span>
                <span onClick={handleClick2} ><BsInstagram cursor="pointer" className="fa-brands fa-instagram"/></span>
                <span onClick={handleClick3} ><BsTwitter cursor="pointer" className="fa-brands fa-twitter"/></span>
            </div>

            <div className="footerInline">
                <h4>Contacto</h4>
                <span onClick={handleClick4} ><BsWhatsapp cursor="pointer" className="fa-brands fa-whatsapp"/></span>
                <span onClick={handleClick5} ><SiGmail cursor="pointer" className="fa-solid fa-envelope"/></span>
            </div>
        </div>

        <div className="footer2">
            <p> © CallVille – Todos los derechos reservados </p>
        </div>
    </footer>
};

export default Footer;