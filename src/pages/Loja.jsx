import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { FaEdit, FaEnvelope, FaFacebookSquare, FaInstagram, FaMapMarkerAlt, FaPlusCircle, FaTrash, FaWhatsapp } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { RiScrollToBottomLine } from "react-icons/ri";
import { IoArrowDown } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";

Modal.setAppElement('#root');

function Loja() {
    const { lojaID } = useParams();
    const [loja, setLoja] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const isDono = usuarioLogado && loja.UsuarioId === usuarioLogado.id;

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

    async function deleteProduto(produtoId) {
        try {

            const result = await Swal.fire({
                title: "Você tem certeza?",
                text: "Você irá deletar esse item permanentemente!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Deletar"
            })

            if (result.isConfirmed) {
                const produtosAtualizados = loja.produtos.filter(produto => produto.id !== produtoId)
                const resposta = await fetch(`http://localhost:3000/lojas/${lojaID}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...loja,
                        produtos: produtosAtualizados
                    })
                })
                if (!resposta) throw new Error("Erro ao deletar produto")
                setLoja({ ...loja, produtos: produtosAtualizados })
                Swal.fire("Deletado!", "Produto removido com sucesso", "sucess")
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }




        } catch (e) {
            Swal.fire("Erro", e.message, "error")
        }
    }


    const listaProdutos = loja.produtos ? loja.produtos.map(produto => (
        <div className="flex flex-col bg-salmao/50 w-[300px] h-[592px] rounded-2xl overflow-clip shadow-sm shadow-preto/50">
            <div className="h-[300px] overflow-clip flex items-center">
                <img src={produto.imagem} alt="" className="w-[300px] h-[300px]" />
            </div>
            <div className="p-4 h-full flex flex-col justify-between gap-4 ">
                <h3 className="w-full text-2xl text-roxo font-bold capitalize">{produto.nome}</h3>
                <p className="text-sm text-left text-preto h-full wrap-break-word">{produto.descricao.slice(0, 134)}...</p>
                <div className="w-full flex justify-between items-center capitalize ">
                    {(produto.disponibilidade === "Em estoque") ? <p className="text-roxo text-lg font-semibold">{Number(produto.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p> : null}
                    <p className="text-roxo font-semibold bg-branco py-1 px-2 rounded-full">{produto.disponibilidade}</p>
                </div>
                <button onClick={() => openProduto(produto)} className="flex justify-end gap-1 items-center text-salmao cursor-pointer"><FaPlusCircle className="text-roxo" /><span className="text-preto font-semibold">Ver mais</span> </button>
            </div>
            {isDono && (
                <div className="flex justify-between items-center">
                    <a href="" className="flex justify-center items-center w-[50%] bg-roxo p-2">
                        <BiSolidEdit className="text-branco text-base" />
                    </a>
                    <button onClick={() => deleteProduto(produto.id)} className="flex justify-center items-center w-[50%] bg-red-400 p-2 cursor-pointer">
                        <FaTrash className="text-branco text-base" /> 
                    </button>
                </div>
            )}
        </div>
    )) : null;




    return (
        <>
            <Header />
            <main className="flex md:flex-row flex-col">
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
                    <ul className="flex items-center md:items-start flex-col  gap-3">
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
                <div className="flex-5/6 grid grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 gap-y-10 py-12 px-6 justify-items-center">
                    {listaProdutos}
                </div>
            </main>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Detalhes do produto"
                className="bg-salmao/80 p-8 rounded-lg md:max-w-[70%] max-h-screen overflow-auto md:overflow-hidden overflow-x-hidden outline-none backdrop-blur-lg"
                overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center"
            >
                {produtoSelecionado && (
                    <div className="flex lg:flex-row flex-col gap-4">
                        <img src={produtoSelecionado.imagem} alt={produtoSelecionado.nome} className="w-full md:w-1/2 mb-4" />
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