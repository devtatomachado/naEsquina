import { Link } from "react-router-dom";

function Banner() {
    return (
        <section className='bg-roxo rounded-none md:rounded-2xl flex justify-evenly overflow-clip'>
            <img src="./shop2.jpg" alt="" className="hidden lg:block md:w-[250px] lg:w-[300px] xl:w-[400px] 2xl:w-[500px]" />
            <div className="flex flex-col gap-8 py-8 w-fit items-center md:items-start">
                <div>
                    <h1 className="text-salmao text-3xl text-center md:text-left md:text-4xl xl:text-5xl font-semibold">Multiplique sua visibilidade com o</h1>
                    <h2 className="text-branco text-4xl text-center md:text-left md:text-4xl xl:text-6xl font-bold">Na<span className="font-semibold">Esquina</span></h2>
                </div>
                <p className="text-branco text-lg tracking-wide text-center md:text-left ">Divulgue com facilidade em uma plataforma poderosa e intuitiva</p>
                <Link to="/cadastro" className="bg-salmao w-40 h-10 items-center flex justify-center text-roxo font-bold rounded-lg">Cadastre-se</Link>
            </div>
        </section>
    )
}

export default Banner;