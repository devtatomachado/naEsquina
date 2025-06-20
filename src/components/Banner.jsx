import { Link } from "react-router-dom";

function Banner() {
    return (
        <section className='bg-roxo flex md:flex-row flex-col justify-between md:gap-0 gap-4 items-center md:rounded-xl py-5 md:px-12'>
            <img src="./shop.png" alt="Foto entrega de compra" className='w-[17rem] hidden md:block' />
            <div className='flex flex-col justify-center items-center gap-4'>
                <h1 className='text-salmao text-2xl md:text-5xl font-bold text-center md:text-left '>Multiplique sua visibilidade com o <span className='text-branco'>NaEsquina</span></h1>
                <h2 className='text-branco text-xl font-light w-full md:block hidden'>Divulgue com facilidade em uma plataforma poderosa e intuitiva</h2>
            </div>
            <Link to="/"><p className='bg-salmao py-3 px-10 rounded-xl text-roxo font-bold hover:brightness-110 duration-300 ease-in-out'>Cadastre-se</p></Link>
        </section>
    )
}

export default Banner;