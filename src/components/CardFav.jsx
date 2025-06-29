import { Link } from "react-router-dom";

function CardFav({ loja }) {
    return (
        <Link to={`/loja/${loja.id}`}>
            <div className=' bg-branco flex flex-col items-center gap-3 p-4 rounded-2xl shadow-sm shadow-preto/50 overflow-clip hover:bg-bege duration-300 ease-in'>
                <img src={loja.logo} alt="" className='w-[5rem] h-[5rem] rounded-xl border border-salmao object-cover' />
            </div >
        </Link>
    )
}

export default CardFav;