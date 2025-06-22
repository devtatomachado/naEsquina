import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CardProduto from "../components/CardProduto";
import { useEffect, useState } from "react";
import { FaDove, FaEnvelope, FaFacebook, FaFacebookSquare, FaInstagram, FaMapMarkerAlt, FaPlusCircle, FaWhatsapp } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

function Loja() {
    const { lojaID } = useParams();
    const [loja, setLoja] = useState({})

    useEffect(() => {
        async function carregaLojas() {
            try {
                const resposta = await fetch(`http://localhost:3000/lojas/${lojaID}`)
                if (!resposta.ok) throw new Error("Erro ao carregar as lojas!")
                const dados = await resposta.json()
                setLoja(dados)
                console.log(dados)
            } catch (e) {
                console.error('Erro: ', e.message)
            }
        }
        carregaLojas()
    }, [lojaID])


    const listaProdutos = loja.produtos ? loja.produtos.map(produto => (
        <CardProduto key={produto.key} produto={produto}/>
    )) : null;

    return (
        <>
            <Header />
            <main className="flex">
                <div className="bg-salmao/60 py-12 px-6 flex flex-col gap-12 flex-1/6">
                    <div className="flex flex-col justify-center items-center gap-10">
                        <img src={loja.logo} alt="Logo loja" className="rounded-full w-44 h-44" />
                        <div className="flex flex-col gap-2">
                            <h2 className=" text-2xl font-bold text-roxo">{loja.nome}</h2>
                            <ul className="w-full flex gap-2 justify-center">
                                <li className="text-2xl text-preto hover:text-roxo duration-500 ease-in"><a href=""><FaInstagram /></a></li>
                                <li className="text-2xl text-preto hover:text-roxo duration-500 ease-in"><a href=""><FaFacebookSquare /></a></li>
                            </ul>
                        </div>
                        <p className="text-justify text-sm">{loja.bio}</p>
                    </div>
                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-xl text-roxo" />
                            <span className="text-base text-preto font-semibold">{loja.endereco}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-xl text-roxo" />
                            <span className="text-base text-preto font-semibold">{loja.email}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaWhatsapp className="text-xl text-roxo" />
                            <span className="text-base text-preto font-semibold">{loja.telefone}</span>
                        </li>
                    </ul>
                    <a
                        target="_blank"
                        href={`https://wa.me/55${loja.telefone}?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es`}
                        className="bg-[#25d366] flex gap-3 items-center justify-center py-3 px-5 rounded-full"
                    >
                        <IoLogoWhatsapp className="text-2xl text-[#075e54]" /><p className="text-branco font-semibold text-sm">Fale conosco via Whatsapp</p>
                    </a>
                </div>
                <div className="flex-5/6 grid grid-cols-4 gap-y-10 p-6 justify-items-center">
                        {listaProdutos}
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Loja;