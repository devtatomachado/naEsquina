import { FaEdit, FaStore } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";

function editarLoja() {
    return (
        <>
            <Header />
            <main className="flex flex-col gap-12 md:px-12 md:py-16 pb-16 bg-salmao/40">
                <div className='w-fit flex justify-center items-center py-2 px-4 bg-salmao border-l-6 border-l-roxo rounded-r-2xl'>
                    <FaEdit className="text-2xl text-roxo" />
                    <h3 className='text-roxo text-[1.375rem] font-bold'>Editar Loja</h3>
                </div>
                <form action="">
                    <div className="w-80 flex items-center gap-2 bg-bege text-roxo py-4 px-3 rounded-lg">
                        <FaStore className="text-2xl"/>
                        <input
                            type="text"
                            placeholder="Nome da Loja"
                            className="outline-0 font-semibold "
                        />
                    </div>
                </form>
            </main>
            <Footer />
        </>
    )
}

export default editarLoja;