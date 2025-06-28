import { Link } from "react-router-dom";

function CardFav({ loja }) {
    return (
        <Link to={`/loja/${loja.id}`}>
            <div className=' bg-branco flex flex-col items-center gap-3 p-4 rounded-2xl shadow-sm shadow-preto/50 overflow-clip hover:bg-bege duration-300 ease-in'>
                <img src={loja.logo} alt="" className='w-[4rem] h-[4rem] rounded-xl border border-salmao' />
                <h3 className='w-[4rem] text-roxo text-sm font-bold text-center'>{loja.nome}</h3>
            </div >
        </Link>
    )
}

export default CardFav;