import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { FaEnvelope, FaFacebookSquare, FaInstagram, FaMapMarkerAlt, FaPlusCircle, FaRegStar, FaStar, FaTrash, FaWhatsapp } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { BiSolidEdit } from "react-icons/bi";
import CardProduto from "../components/CardProduto";

Modal.setAppElement('#root');

function Loja() {
    const { lojaID } = useParams();
    const [loja, setLoja] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [favoritosIds, setFavoritosIds] = useState(() => JSON.parse(localStorage.getItem("favoritosIds")) || [])

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const isDono = usuarioLogado && loja.UsuarioId === usuarioLogado.id;
    const isFavorito = favoritosIds.includes(String(loja.id));
    const navigate = useNavigate();

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

                if (!dados.nomeLoja || dados.nomeLoja.trim() === "" || !dados.bio || dados.bio.trim() === "") {
                    await Swal.fire("Complete sua loja!", "Preencha as informações da loja para continuar.", "info");
                    navigate("/editarloja");
                }
            } catch (e) {
                console.error('Erro: ', e.message)
            }
        }
        carregaLojas()
    }, [lojaID])

    useEffect(() => {
        setFavoritosIds(JSON.parse(localStorage.getItem("favoritosIds")) || []);
    }, []);

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
        <CardProduto
            key={produto.id}
            produto={produto}
            isDono={isDono}
            openProduto={openProduto}
            deleteProduto={deleteProduto}
            loja={loja}
        />
    ))
        : null;



    async function favoritarLoja() {
        if (!usuarioLogado) (
            navigate("/login")
        )

        if (favoritosIds.includes(String(loja.id))) {
            Swal.fire("Atenção", "Esta loja já está nos seus favoritos!", "info");
            return;
        }

        const novosFavoritosIds = [...favoritosIds, String(loja.id)];
        setFavoritosIds(novosFavoritosIds);
        localStorage.setItem("favoritosIds", JSON.stringify(novosFavoritosIds))

        const novosFavoritos = [
            ...(usuarioLogado.favoritos || []),
            { lojaid: loja.id }
        ]
        const usuarioAtualizado = { ...usuarioLogado, favoritos: novosFavoritos }
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado))

        await fetch(`http://localhost:3000/usuarios/${usuarioLogado.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuarioAtualizado)
        })

        Swal.fire("Pronto!", "Loja adicionada aos favoritos!", "success");
    }


    return (
        <>
            <Header />
            <main className="flex md:flex-row flex-col ">
                <div className="bg-salmao/60 py-12 px-6 flex flex-col gap-12 flex-2/8">
                    <div className="flex flex-col justify-center items-center gap-10">
                        <img src={loja.logo} alt="Logo loja" className="rounded-full w-44 h-44 object-cover" />
                        <div className="flex flex-col gap-2">
                            <h2 className=" text-2xl font-bold text-roxo text-center">{loja.nomeLoja}</h2>
                            <ul className="w-full flex gap-2 justify-center">
                                <li className="text-2xl text-preto hover:text-roxo duration-500 ease-in"><a href=""><FaInstagram /></a></li>
                                <li className="text-2xl text-preto hover:text-roxo duration-500 ease-in"><a href=""><FaFacebookSquare /></a></li>
                            </ul>
                        </div>
                        <div>
                            {usuarioLogado && (
                                <button
                                    className="flex items-center gap-2 cursor-pointer hover:scale-110 duration-300 ease-in"
                                    onClick={favoritarLoja}
                                >
                                    {isFavorito ? <FaStar className="text-amber-500" /> : <FaRegStar className="text-roxo" />} <p className="text-roxo font-semibold">{isFavorito ? "Favorito" : "Favoritar"}</p>
                                </button>
                            )}
                        </div>
                        <p className="text-justify text-base">{loja.bio}</p>
                    </div>
                    <ul className="flex items-center md:items-start flex-col  gap-3">
                        <li className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-xl text-roxo" />
                            <span className="text-sm text-preto font-semibold">{loja.endereco}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-xl text-roxo" />
                            <span className="text-sm text-preto font-semibold">{loja.email}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaWhatsapp className="text-xl text-roxo" />
                            <span className="text-sm text-preto font-semibold">{loja.telefone}</span>
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
                    {!listaProdutos || listaProdutos.length === 0 ? <p className="text-xl text-roxo">Não há nenhum produto cadastrado..</p> : listaProdutos}
                </div>
            </main>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Detalhes do produto"
                className="bg-salmao/80 p-8 rounded-lg md:w-[800px] max-h-screen overflow-auto md:overflow-hidden overflow-x-hidden outline-none backdrop-blur-lg"
                overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center"
            >
                {produtoSelecionado && (
                    <div className="flex justify-evenly lg:flex-row flex-col gap-4">
                        <div className="w-[300px] h-[300px] flex items-center justify-center overflow-clip border-2 border-bege rounded-md">
                            <img src={produtoSelecionado.imagem} alt={produtoSelecionado.nome} className="w-[300px] h-[300px] object-cover object-center" />
                        </div>
                        <div className="flex flex-col gap-8 justify-between">
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