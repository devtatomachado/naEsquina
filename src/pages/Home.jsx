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
            <main className='bg-salmao/40 md:px-12 md:py-4 '>
                {usuarioLogado ? <h3 className='text-2xl text-end font-semibold text-roxo'>Olá {usuarioLogado.nome}! Bem-vindo(a) de volta!</h3> : <Banner />}
                <section className='py-4md:px-0 '>
                    <h2 className='text-roxo text-[2rem] font-bold py-4 '>Principais Lojas</h2>
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