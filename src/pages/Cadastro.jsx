import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { GrDocumentUser } from "react-icons/gr";
import { TfiEmail } from "react-icons/tfi";
import { IoLockClosedOutline } from "react-icons/io5";
import Input from "../components/InputCadastro";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock, FaRegIdBadge } from "react-icons/fa6";
import InputCadastro from "../components/InputCadastro";
import { Link, useNavigate } from "react-router-dom";

function Cadastro() {
  const { register, handleSubmit, watch } = useForm();
  const [telaAtiva, setTelaAtiva] = useState("");
  const navigate = useNavigate()

  let isStoreWatch = watch("radio")

  // useEffect(() => {
  //   setTelaAtiva("comerciante")
  // })

  useEffect(() => {
    setTelaAtiva(isStoreWatch)
  }, [isStoreWatch])

  console.log(isStoreWatch)

  async function cadastra(data) {

    const { nome, endereco, documento, email, senha, confirma } = data;

    const docNormalziado = (documento || "").replace(/[\s.-]/g, '');

    let isStore

    if (senha !== confirma) {
      Swal.fire({ text: "As senhas devem ser iguais", icon: "warning" });
      return;
    }

    if (isStoreWatch === "comerciante") {
      isStore = true
    } else if(isStoreWatch === "pessoa") {
      isStore = false
    } else {
      Swal.fire({text:"Preencha o formulário corretamente!", icon:"error"})
      return
    }

    try {
      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          endereco: endereco || "",
          documento: docNormalziado || "",
          email,
          senha,
          isStore,
          favoritos: []
        }),
      });
      if (!resposta.ok) throw new Error("Erro ao cadastrar");

      const usuarioCriado = await resposta.json

      if (isStoreWatch === "comerciante") {
        await fetch("http://localhost:3000/lojas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nomeLoja: "",
            endereco,
            UsuarioId: usuarioCriado.id,
            logo: "",
            bio: "",
            produtos: []
          })
        })
      }

      if (isStore) {
        Swal.fire({ title: "Comerciante cadastrado com sucesso!", text: "Agora edite sua loja para concluir o cadastro", icon: "success" })
      } else {
        Swal.fire({ title: "Usuário cadastrado com sucesso!", text: "Aproveite o NaEsquina", icon: "success" })
      }

      navigate("/login")

    } catch (erro) {
      console.log(`Erro: ${erro.message}`);
    }
  }

  return (
    <div className="bg-[url('/bg_Login.png')] bg-cover bg-center bg-fixed min-h-screen flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-90 p-6 sm:p-10 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src="/logoNaesquina.svg"
            alt="Logo"
            className="mx-auto h-20 mb-4"
          />

          <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 space-y-2 sm:space-y-0">
            <h2 className="text-roxo font-medium">Você é:</h2>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="comerciante"
                {...register("radio")}
                className="accent-purple-700"
                required
              />
              <span>Comerciante</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="pessoa"
                {...register("radio")}
                className="accent-purple-700"
                required
              />
              <span>Consumidor</span>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit(cadastra)}>
          {isStoreWatch && (
            <>
              <InputCadastro
                type="text"
                placeholder="Nome"
                register={register}
                name="nome"
                icon={<MdPerson />}
                required
              />
              <InputCadastro
                type="email"
                placeholder="Email"
                register={register}
                name="email"
                icon={<FaEnvelope />}
                required
              />
              {telaAtiva === "comerciante" && <InputCadastro
                type="text"
                placeholder="CPF/CNPJ"
                register={register}
                name="documento"
                icon={<FaRegIdBadge />}
                required
              />}
              <InputCadastro
                type="password"
                placeholder="Senha"
                register={register}
                name="senha"
                icon={<FaLock />}
                required
              />
              <InputCadastro
                type="password"
                placeholder="Confirma Senha"
                register={register}
                name="confirma"
                icon={<FaLock />}
                required
              />

            </>
          )}

          <button
            type="submit"
            className="bg-roxo w-full border border-roxo text-white hover:bg-opacity-20 hover:border-black font-bold py-2 sm:py-3 rounded-xl mt-4 text-sm sm:text-base"
          >
            Cadastrar
          </button>
        </form>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-roxo"></div>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/login"
            className="text-sm sm:text-base text-black underline hover:underline mt-2 block text-center"
          >
            Já tem cadastro? Entre
          </Link>
          <Link to="/" className="flex items-center justify-center gap-2"><p className="text-sm text-roxo underline underline-offset-2">Voltar para Página Inicial</p></Link>
        </div>

      </div>
    </div>
  );
}

export default Cadastro;
