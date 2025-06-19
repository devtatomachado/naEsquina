import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';

function Home() {
    return (
        <>
            <Header />
            <main className='bg-salmao/40 md:px-12 md:py-16 '>
                <Banner />
                <section className='py-10 md:px-0 px-3'>
                    <h2 className='text-roxo text-[2rem] font-bold py-4 '>Principais Lojas</h2>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-12'>
                        <div className='bg-branco p-2 flex gap-3 rounded-2xl shadow-sm shadow-preto/50'>
                            <img src="https://img.freepik.com/vetores-premium/conceito-realista-de-logotipo-de-negocio-corporativo-de-tipo-diferente_1286368-70511.jpg" alt="" className='w-[9rem] h-[9rem] rounded-xl border border-salmao' />
                            <div className='py-4 flex items-center md:block p-2'>
                                <h3 className='text-roxo text-2xl font-bold'>Loja 1</h3>
                                <p className='text-preto text-base hidden md:block text-justify '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad sint cumque nobis consequatur dolorum, neque beatae soluta perferendis atque, non accusamus rerum. Praesentium id vitae soluta eveniet, cumque ducimus explicabo.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Home;