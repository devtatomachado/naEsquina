import { Link } from "react-router-dom";

function CardLojas({ loja }) {
    return (
        <div className='bg-branco  flex flex-col rounded-2xl shadow-sm shadow-preto/50 overflow-clip'>
            <div className="flex gap-3 p-6">
                <img src={loja.logo} alt="" className='w-[9rem] h-[9rem] rounded-xl border border-salmao object-cover' />
                <div className='flex items-center md:items-start md:flex-col px-2'>
                    <h3 className='text-roxo text-xl font-bold'>{loja.nomeLoja}</h3>
                    <p className='hidden md:block line-clamp-1 text-preto text-sm '><span className="line-clamp-5">{loja.bio}</span></p>
                </div>
            </div>
            <Link to={`/loja/${loja.id}`}>
                <div className="group bg-roxo hover:bg-salmao py-1 flex justify-center duration-300 ease-in-out"><p className="text-branco group-hover:text-roxo font-semibold duration-300 ease-in-out">Ver Loja</p></div>
            </Link>
        </div>
    )
}

export default CardLojas;