import { BsBox, BsBox2 } from "react-icons/bs";
import { TbLayoutGridAdd } from "react-icons/tb";
import { Link } from "react-router-dom";


function Menu () {
    return (
        <>
        <nav>
            <ul className="flex justify-center items-center h-[3rem] text-[0.9375rem] gap-5.5 bg-roxo text-white">
                <Link to="/" className="flex items-center justify-center gap-1.5">
                    <BsBox2 className="text-xl text-salmao"/>
                    <p>Todos os Produtos</p>
                </Link>
                <Link to="/adicionar" className="flex items-center justify-center gap-1.5">
                    <TbLayoutGridAdd className="text-2xl text-salmao" />
                    <p>Adicionar Produtos</p>
                </Link>
            </ul>
        </nav>
        </>
    )
}

export default Menu;