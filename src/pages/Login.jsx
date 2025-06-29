import { useForm } from "react-hook-form";
import { BsEnvelope } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineLock } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    async function fazerLogin(data) {
        const email = data.email
        const senha = data.senha

        const resposta = await fetch(`http://localhost:3000/usuarios?email=${email}`)
        const usuarios = await resposta.json()

        if (usuarios.length > 0 && usuarios[0].senha === senha) {
            const usuarioLogado = usuarios[0];
            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
            const favoritosIds = usuarioLogado.favoritos?.map(fav => String(fav.lojaid)) || [];
            localStorage.setItem("favoritosIds", JSON.stringify(favoritosIds));

            if (usuarioLogado.isStore && usuarioLogado.lojaId) {
                localStorage.setItem("lojaIdLogada", usuarioLogado.lojaId)
            } else {
                localStorage.removeItem("lojaIdLogada")
            }
            navigate("/")
        } else {
            Swal.fire({ text: "Email ou senha inválidos", icon: "warning" })
        }
    }

    return (
        <div className="bg-[url('/bg_Login.png')] bg-cover bg-center bg-fixed min-h-screen flex items-center justify-center">
            <div className="bg-branco bg-opacity-90 p-8 rounded-lg shadow-xl max-w-full md:max-w-sm w-[95%] flex flex-col gap-12 py-12 relative">
                <div className="flex flex-col gap-3">
                    <img src='/logoNaesquina.svg' alt="" className="mx-auto h-20" />
                    <h1 className="text-xl font-semibold text-center text-roxo">Seja bem-vindo(a)!</h1>
                    <p className="text-sm text-preto text-center">Faça login e continue a sua jornada para encontrar produtos incríveis ou para crescer seu negócio local.</p>
                </div>
                <form onSubmit={handleSubmit(fazerLogin)} className="flex flex-col gap-4">
                    <label htmlFor="email" className="sr-only">Email</label>
                    <div className="flex flex-col gap-3">
                        <div className={`flex items-center gap-2 border border-roxo/50 rounded-xl py-2 px-3`}>
                            <BsEnvelope className="text-roxo text-lg" />
                            <input
                                type="email"
                                id="email"
                                placeholder="E-mail"
                                className="text-roxo placeholder:text-roxo outline-0"
                                {...register("email", { required: true })}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <label htmlFor="password" className="sr-only">Senha</label>
                        <div className="flex items-center gap-2 border border-roxo/50 rounded-xl py-2 px-3">
                            <MdOutlineLock className="text-roxo text-lg" />
                            <input
                                type="password"
                                id="password"
                                placeholder="Senha"
                                className={`text-roxo placeholder:text-roxo outline-0`}
                                {...register("senha", { required: true })}
                                autoComplete="off"
                                required
                            />
                        </div>

                    </div>

                    <a href="" className="text-sm font-light text-center underline underline-offset-2 decoration-1">Esqueceu a senha?</a>
                    <div className="flex flex-col gap-5">
                        <button type="submit" className="w-full cursor-pointer bg-roxo hover:bg-roxo text-white font-bold py-3 rounded-xl transition duration-200 ease-in-out">
                            Entrar
                        </button>
                        <hr className="border-roxo" />
                        <Link to="/cadastro"
                            className="w-full flex justify-center cursor-pointer bg-transparent border border-roxo text-roxo hover:bg-opacity-20 hover:border-black font-bold py-3 rounded-xl"
                        >
                            Cadastre-se
                        </Link>
                        <Link to="/" className="flex items-center justify-center gap-2"><p className="text-sm text-roxo underline underline-offset-2">Voltar para Página Inicial</p></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Login;