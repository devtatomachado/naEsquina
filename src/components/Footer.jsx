import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="flex md:justify-between justify-center bg-salmao py-5 md:px-12 font-inter">
            <div className="flex flex-col gap-8 text-center md:text-left ">
                <Link to="/"><img src="./logo_footer.svg" alt="Logo NaEsquina" /></Link>
                <div className="flex flex-col gap-2">
                    <h4 className="text-preto text-xl font-bold">Fique ligado</h4>
                    <ul className="flex gap-2 text-2xl text-roxo justify-center md:justify-start">
                        <li><a href="#"><FaInstagram className="hover:text-roxo/70 duration-700 ease-in-out" /></a></li>
                        <li><a href="#"><FaFacebookSquare className="hover:text-roxo/70 duration-700 ease-in-out" /></a></li>
                        <li><a href="#"><FaLinkedin className="hover:text-roxo/70 duration-700 ease-in-out" /></a></li>
                    </ul>
                </div>
                <div className="text-sm text-preto">
                    <p>Copyright © 2025 Na Esquina</p>
                    <p>Todos os direitos reservados</p>
                </div>
            </div>
            <div className="hidden md:block">
                <h3 className="text-roxo text-xl font-bold">Institucional</h3>
                <ul>
                    <li><a href="#" className="text-preto text-sm font-medium hover:underline duration-300 ease-in">Quem somos</a></li>
                    <li><a href="#" className="text-preto text-sm font-medium hover:underline duration-300 ease-in">Quero divulgar minha loja</a></li>
                    <li><a href="#" className="text-preto text-sm font-medium hover:underline duration-300 ease-in">Imprensa</a></li>
                    <li><a href="#" className="text-preto text-sm font-medium hover:underline duration-300 ease-in">Fale Conosco</a></li>
                    <li><a href="#" className="text-preto text-sm font-medium hover:underline duration-300 ease-in">Suporte</a></li>
                </ul>
            </div>
            <div className="hidden md:block">
                <h3 className="text-roxo text-xl font-bold">Ajuda</h3>
                <ul>
                    <li><a href="#" className="text-preto text-sm font-medium hover:underline duration-300 ease-in">Nossa missão</a></li>
                    <li><a href="#" className="text-preto text-sm font-medium hover:underline duration-300 ease-in">Segurança e Privacidade</a></li>
                    <li><a href="#" className="text-preto text-sm font-medium hover:underline duration-300 ease-in">Politicas de privacidade</a></li>
                    <li><a href="#" className="text-preto text-sm font-medium hover:underline duration-300 ease-in">Termos de uso</a></li>
                    <li><a href="#" className="text-preto text-sm font-medium hover:underline duration-300 ease-in">Acessibilidade</a></li>
                </ul>
            </div>
            <div className="md:flex flex-col gap-4 hidden">
                <div className="flex flex-col gap-2">
                    <h3 className="text-roxo text-xl font-bold">Contato</h3>
                    <ul className="flex flex-col gap-2">
                        <li className="flex gap-2 items-center text-preto"><FaPhone className="text-roxo"/> 53 999999999</li>
                        <li className="flex gap-2 items-center text-preto"><FaEnvelope className="text-roxo"/> Contato@naesquina.com.br</li>
                    </ul>
                </div>
                <h3 className="text-roxo text-xl font-bold">Anuncie Aqui</h3>


            </div>

        </footer>
    );
}

export default Footer;