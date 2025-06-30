import { Link } from "react-router-dom";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";

function CardProduto({ produto, isDono, openProduto, deleteProduto, loja }) {return (
        <div className="flex flex-col bg-salmao/50 w-[300px] h-[592px] rounded-2xl overflow-clip shadow-sm shadow-preto/50">
            <div className="h-[300px] overflow-clip flex items-center">
                <img src={produto.imagem} alt="" className="w-[300px] h-[300px]" />
            </div>
            <div className="p-4 h-full flex flex-col justify-between gap-4 ">
                <h3 className="w-full text-xl text-roxo font-bold capitalize">
                    {produto.nome.length > 26 ? produto.nome.slice(0,26) + "..." : produto.nome}
                </h3>
                <p className="text-sm text-justify text-preto h-full wrap-break-word">
                    {produto.descricao.length > 110 ? produto.descricao.slice(0, 110) + "..." : produto.descricao}
                </p>
                <div className="w-full flex justify-between items-center capitalize ">
                    {(produto.disponibilidade === "Em estoque") ? (
                        <p className="text-roxo text-lg font-semibold">
                            {Number(produto.valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                    ) : null}
                    <p className="text-roxo font-semibold bg-branco py-1 px-2 rounded-full">{produto.disponibilidade}</p>
                </div>
                <button onClick={() => openProduto(produto)} className="flex justify-end gap-1 items-center text-salmao cursor-pointer">
                    <FaPlusCircle className="text-roxo" /><span className="text-preto font-semibold">Ver mais</span>
                </button>
            </div>
            {isDono && (
                <div className="flex justify-between items-center">
                    <Link
                        to="/editarproduto"
                        className="flex justify-center items-center w-[50%] bg-roxo p-2"
                        onClick={() => {
                            localStorage.setItem("produtoEditando", JSON.stringify(produto));
                            localStorage.setItem("lojaId", loja.id);
                        }}
                    >
                        <BiSolidEdit className="text-branco text-base" />
                    </Link>
                    <button onClick={() => deleteProduto(produto.id)} className="flex justify-center items-center w-[50%] bg-red-400 p-2 cursor-pointer">
                        <FaTrash className="text-branco text-base" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default CardProduto;