import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { FaEnvelope, FaFacebook, FaFacebookSquare, FaInstagram, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

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
        },[lojaID])
    



    return (
        <>
            <Header />
            <main>
                <div className="w-[20%] bg-salmao/60 py-12 px-6 flex flex-col gap-12">
                    <div className="flex flex-col justify-center items-center gap-6">
                        <img src={loja.logo} alt="Logo loja" className="rounded-full w-44 h-44"/>
                        <h2 className=" text-2xl font-semibold text-roxo">{loja.nome}</h2>
                        <p className="text-justify text-sm">{loja.bio}</p>
                    </div>
                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-xl text-roxo"/> 
                            <span className="text-base text-preto font-semibold">{loja.endereco}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-xl text-roxo"/>
                            <span className="text-base text-preto font-semibold">{loja.email}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaWhatsapp className="text-xl text-roxo"/>
                            <span className="text-base text-preto font-semibold">{loja.telefone}</span>
                        </li>
                    </ul>
                    {/* Adicionar o botão direto para conversa no whatsapp */}
                    <p>#Btn whatsapp direto#</p>
                    <ul className="w-full flex gap-2 justify-start">
                        <p className="font-semibold text-roxo flex gap-2 items-center">Redes Sociais <FaArrowRight/> </p>
                        <li className="text-2xl text-preto hover:text-roxo duration-500 ease-in"><a href=""><FaInstagram/></a></li>
                        <li className="text-2xl text-preto hover:text-roxo duration-500 ease-in"><a href=""><FaFacebookSquare/></a></li>
                    </ul>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default Loja;