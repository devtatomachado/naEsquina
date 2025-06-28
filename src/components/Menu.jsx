import { BiSolidEdit } from "react-icons/bi";
import { BsBox, BsBox2 } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { RiStore2Line } from "react-icons/ri";
import { TbLayoutGridAdd } from "react-icons/tb";
import { Link } from "react-router-dom";


function Menu () {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
    console.log(usuarioLogado.lojaId)

    return (
        <>
        <nav>
            <ul className="flex justify-center items-center h-[3rem] text-[0.9375rem] gap-5.5 bg-roxo text-white">
                <Link to={`/loja/${usuarioLogado.lojaId}`} className="flex items-center justify-center gap-1.5">
                    <RiStore2Line className="text-xl text-salmao"/>
                    <p className="hidden md:block">Minha Loja</p>
                </Link>
                <Link to="/adicionar" className="flex items-center justify-center gap-1.5">
                    <TbLayoutGridAdd className="text-2xl text-salmao" />
                    <p className="hidden md:block">Adicionar Produtos</p>
                </Link>
                <Link to="/editarloja" className="flex items-center justify-center gap-1.5">
                    <BiSolidEdit className="text-2xl text-salmao" />
                    <p className="hidden md:block">Editar Loja</p>
                </Link>
            </ul>
        </nav>
        </>
    )
}

export default Menu;