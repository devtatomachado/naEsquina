import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import { useEffect, useState } from 'react';
import CardLojas from '../components/CardLojas';

function Home() {

    const [lojas, setLojas] = useState([]);

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
        <CardLojas key={loja.id} loja={loja} setLoja={setLojas}/>
    ))

    return (
        <>
            <Header />
            <main className='bg-salmao/40 md:px-12 md:py-16 '>
                <Banner />
                <section className='py-10 md:px-0 px-3'>
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