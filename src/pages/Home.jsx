import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import { useEffect, useState } from 'react';
import CardLojas from '../components/CardLojas';

function Home() {

    const [lojas, setLojas] = useState([]);

    const [usuarioLogado, setUsuarioLogado] = useState(() => {
        const user = localStorage.getItem("usuarioLogado")
        return user ? JSON.parse(user) : null
    })

    useEffect(() => {
        function handleStorage() {
            const user = localStorage.getItem("usuarioLogado");
            setUsuarioLogado(user ? JSON.parse(user) : null);
        }
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    useEffect(() => {
        async function carregaLojas() {
            try {
                const resposta = await fetch("http://localhost:3000/lojas")
                if (!resposta.ok) throw new Error("Erro ao carregar as lojas!")
                const dados = await resposta.json()
                setLojas(dados)
                console.log(dados)
            } catch (e) {
                console.error('Erro: ', e.message)
            }
        }
        carregaLojas()
    }, [])

    const listaDeLojas = lojas.map(loja => (
        <CardLojas key={loja.id} loja={loja} setLoja={setLojas} />
    ))

    return (
        <>
            <Header setUsuarioLogado={setUsuarioLogado}/>
            <main className='bg-salmao/40 flex flex-col gap-12 md:px-12 md:py-16 pb-16'>
                {usuarioLogado ? <h3 className='text-2xl text-center font-semibold text-roxo bg-bege py-2 px-2 rounded-md'>Olá {usuarioLogado.nome}! Bem-vindo(a) de volta!</h3> : <Banner />}
                <section className='flex flex-col gap-3 md:p-0 px-3'>
                    <h2 className='text-roxo text-[2rem] font-bold '>Principais Lojas</h2>
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-12'>
                        {listaDeLojas}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Home;