import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { FaEnvelope, FaFacebookSquare, FaInstagram, FaMapMarkerAlt, FaPlusCircle, FaWhatsapp } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Modal from "react-modal";
import Swal from "sweetalert2";

Modal.setAppElement('#root');

function Loja() {
    const { lojaID } = useParams();
    const [loja, setLoja] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    function openProduto(produto) {
        setProdutoSelecionado(produto);
        setModalIsOpen(true);
    }

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
        <div className="flex flex-col bg-salmao/50 w-[300px] h-[552px] rounded-2xl overflow-clip shadow-sm shadow-preto/50">
            <img src={produto.imagem} alt="" className="w-[300px]" />
            <div className="p-4 flex flex-col justify-between gap-4 items-end">
                <h3 className="w-full text-2xl text-roxo font-bold capitalize">{produto.nome}</h3>
                <p className="text-sm text-justify text-preto ">{produto.descricao.slice(0, 134)}...</p>
                <div className="w-full flex justify-between items-center ">
                    {(produto.disponibilidade === "Em estoque") ? <p className="text-roxo text-lg font-semibold">R${produto.valor}</p> : null}
                    <p className="text-roxo font-semibold bg-branco py-1 px-2 rounded-full">{produto.disponibilidade}</p>
                </div>
                <button onClick={() => openProduto(produto)} className="flex justify-end gap-1 items-center text-salmao cursor-pointer"><FaPlusCircle className="text-roxo" /><span className="text-preto font-semibold">Ver mais</span> </button>
            </div>
        </div>
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
                <div className="flex-5/6 grid grid-cols-4 gap-y-10 py-12 px-6 justify-items-center">
                    {listaProdutos}
                </div>
            </main>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Detalhes do produto"
                className="bg-salmao/80 p-8 rounded-lg max-w-[70%] outline-none backdrop-blur-lg"
                overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center"
            >
                {produtoSelecionado && (
                    <div className="flex gap-4">
                        <img src={produtoSelecionado.imagem} alt={produtoSelecionado.nome} className="w-full mb-4" />
                        <div className="flex flex-col gap-8">
                            <div>
                                <h2 className="text-4xl text-roxo font-bold capitalize">{produtoSelecionado.nome}</h2>
                            </div>
                            <p className="text-base text-preto">{produtoSelecionado.descricao}</p>
                            <div className="w-full flex justify-between items-center ">
                                {(produtoSelecionado.disponibilidade === "Em estoque") ? <p className="text-branco text-xl font-semibold">R${produtoSelecionado.valor}</p> : null}

                                <p className="text-roxo font-semibold bg-branco py-1 px-2 rounded-full">{produtoSelecionado.disponibilidade}</p>
                            </div>
                            <button
                                onClick={() => setModalIsOpen(false)}
                                className="mt-4 px-4 py-2 bg-roxo text-white rounded cursor-pointer"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
            <Footer />
        </>
    )
}

export default Loja;