import { FaEdit } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";

function editarLoja() {
    return(
        <>
            <Header/>
            <main className="flex flex-col gap-12 md:px-12 md:py-16 pb-16">
                <div className='w-fit flex justify-center items-center py-2 px-2 bg-salmao border-l-6 border-l-roxo rounded-r-2xl'>
                    <FaEdit className="text-2xl text-roxo"/>
                    <h3 className='text-roxo text-[1.375rem] font-bold'>Editar Loja</h3>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default editarLoja;