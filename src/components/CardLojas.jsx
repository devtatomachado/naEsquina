import { Link } from "react-router-dom";

function CardLojas({ loja }) {
    return (
        <div className='bg-branco  flex flex-col gap-3 rounded-2xl shadow-sm shadow-preto/50 overflow-clip'>
            <div className="flex p-6">
                <img src={loja.logo} alt="" className='w-[9rem] h-[9rem] rounded-xl border border-salmao' />
                <div className='flex items-center md:items-start md:justify-start md:flex-col px-2'>
                    <h3 className='text-roxo text-2xl font-bold'>{loja.nome}</h3>
                    <p className='text-preto text-base hidden md:block text-justify'>{loja.bio}</p>
                </div>
            </div>
            <Link to={`/loja/${loja.id}`}>
                <div className="group bg-roxo hover:bg-salmao py-1 flex justify-center duration-300 ease-in-out"><p className="text-branco group-hover:text-roxo font-semibold duration-300 ease-in-out">Ver Loja</p></div>
            </Link>
        </div>
    )
}

export default CardLojas;