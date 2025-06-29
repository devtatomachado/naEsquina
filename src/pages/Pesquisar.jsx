import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import CardLojas from "../components/CardLojas";

function Pesquisar() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const termo = params.get('termo')
    const [resultadoLoja, setResultadoLoja] = useState([])

    useEffect(() => {
        async function pesquisarLojas(termo) {
            try {
                const resposta = await fetch("http://localhost:3000/lojas")
                if (!resposta) throw new Error("Erro ao procurar lojas.")
                const dados = await resposta.json()
                const pesquisa = termo.toUpperCase()
                const dadosFiltrados = dados.filter(loja => (
                    loja.nomeLoja.toUpperCase().includes(pesquisa)
                ))
                setResultadoLoja(dadosFiltrados)
            } catch (e) {
                console.log("Erro:", e.message)
            }
        }
        pesquisarLojas(termo)
    }, [termo])

    const loja = resultadoLoja.map(loja => (
        <CardLojas key={loja.id} loja={loja} />
    ))

    return (
        <>
            <Header />
            <main className='bg-salmao/40 px-3 pb-16 md:px-12 md:pt-10 min-h-screen'>
                <section className=' md:pb-5 md:px-0 '>
                    <h2 className='text-roxo text-lg md:text-[2rem] font-bold py-4 '>Resultados da pesquisa: <span className="italic font-normal md:text-2xl text-lg">"{termo}"</span></h2>
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-12'>
                        {resultadoLoja.length > 0 ? (loja) : (
                            <div>
                                <h1 className="text-xl">Nenhuma loja foi encontrada</h1>
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Pesquisar;