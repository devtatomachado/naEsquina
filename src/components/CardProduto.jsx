import { FaPlusCircle } from "react-icons/fa";

function Produto({ produto }) {
    return (
        <div className="flex flex-col h-fit bg-salmao/50 w-[300px] rounded-2xl overflow-clip shadow-sm shadow-preto/50">
            <img src={produto.imagem} alt="" className="w-[300px]" />
            <div className="p-4 flex flex-col gap-2 items-end">
                <h3 className="w-full text-2xl text-roxo font-bold capitalize">{produto.nome}</h3>
                <p className="text-sm text-justify text-preto ">{produto.descricao.slice(0, 134)}...</p>
                <button className="flex justify-end gap-2 items-center text-salmao cursor-pointer"><FaPlusCircle /><span className="text-preto font-semibold">Ver mais</span> </button>
            </div>
        </div>
    )
}

export default Produto;