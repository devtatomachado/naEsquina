import { Link } from "react-router-dom";

function Banner() {
    return (
        <section className='bg-roxo rounded-2xl flex items-center justify-around px-4 py-2'>
            <img
                src="./shop2.jpg"
                alt=""
                className="w-[240px] rounded-md shadow-md shadow-black/50"
            />
            <div>
                <h1 className="text-salmao text-[200%] font-bold text-warp ">Multiplique sua visibilidade com o</h1>
                <h2 className="text-branco font-semibold text-[200%]"><span className="font-bold">Na</span>Esquina</h2>
                <h3 className="text-branco text-base">Divulgue com facilidade em uma plataforma poderosa e intuitiva</h3>
            </div>
            <Link to="/" className="bg-salmao text-roxo text-xl px-4 py-2 rounded-xl font-semibold">Cadastre-se</Link>
        </section>
    )
}

export default Banner;