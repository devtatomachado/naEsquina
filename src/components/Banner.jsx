import { Link } from "react-router-dom";

function Banner() {
    return (
        <section className='bg-roxo rounded-2xl flex justify-evenly'>
            <img src="./shop2.jpg" alt="" className="w-[550px]" />
            <div className="flex flex-col gap-8 py-8 w-fit">
                <div>
                    <h1 className="text-salmao text-5xl font-semibold">Multiplique sua visibilidade com o</h1>
                    <h2 className="text-branco text-6xl font-bold">Na<span className="font-semibold">Esquina</span></h2>
                </div>
                <p className="text-branco text-lg tracking-wide ">Divulgue com facilidade em uma plataforma poderosa e intuitiva</p>
                <Link to="/cadastro" className="bg-salmao w-40 h-10 items-center flex justify-center text-roxo font-bold rounded-lg">Cadastre-se</Link>
            </div>
        </section>
    )
}

export default Banner;