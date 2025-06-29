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
    } else if (isStoreWatch === "pessoa") {
      isStore = false
    } else {
      Swal.fire({ text: "Preencha o formulário corretamente!", icon: "error" })
      return
    }

    try {
      //Cria o usuario
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

      const usuarioCriado = await resposta.json()

      if (isStoreWatch === "comerciante") {
        //Cria a Loja
        const lojaResp = await fetch("http://localhost:3000/lojas", {
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
        if (!lojaResp.ok) throw new Error("Erro ao criar a loja")
        const lojaCriada = await lojaResp.json()

        //Atualiza o usuario com o Id da Loja 
        //Usei PATCH pq o PUT espera o corpo inteiro. 
        await fetch(`http://localhost:3000/usuarios/${usuarioCriado.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lojaId: lojaCriada.id
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
      <div className="bg-branco bg-opacity-90 p-8 rounded-lg shadow-xl max-w-full md:max-w-sm w-[95%] flex flex-col  py-12">
        <div className="text-center mb-6">
          <img
            src="/logoNaesquina.svg"
            alt="Logo"
            className="mx-auto h-20 mb-4"
          />

          <div className="flex flex-col gap-3 sm:flex-row justify-center items-center">
            <h2 className="text-roxo font-medium">Você é:</h2>
            <div className="flex gap-3">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="comerciante"
                  {...register("radio")}
                  className="accent-roxo"
                  required
                />
                <span>Comerciante</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="pessoa"
                  {...register("radio")}
                  className="accent-roxo"
                  required
                />
                <span>Consumidor</span>
              </label>
            </div>
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
                icon={MdPerson}
                required
                autoComplete="off"
              />
              <InputCadastro
                type="email"
                placeholder="Email"
                register={register}
                name="email"
                icon={FaEnvelope}
                required
                autoComplete="off"
              />
              {telaAtiva === "comerciante" && <InputCadastro
                type="text"
                placeholder="CPF/CNPJ"
                register={register}
                name="documento"
                icon={FaRegIdBadge}
                required
                autoComplete="off"
              />}
              <InputCadastro
                type="password"
                placeholder="Senha"
                register={register}
                name="senha"
                icon={FaLock}
                required
                autoComplete="off"
              />
              <InputCadastro
                type="password"
                placeholder="Confirma Senha"
                register={register}
                name="confirma"
                icon={FaLock}
                required
                autoComplete="off"
              />

            </>
          )}

          {isStoreWatch && <button
            type="submit"
            className="bg-roxo w-full border border-roxo text-white hover:bg-opacity-20 hover:border-black font-bold py-2 sm:py-3 rounded-xl mt-4 text-sm sm:text-base cursor-pointer"
          >
            Cadastrar
          </button>}
        </form>
        <div className="flex flex-col gap-3 py-3">
          <hr className="border-roxo" />
          {isStoreWatch && <Link to="/login"
            className="w-full flex justify-center cursor-pointer bg-transparent border border-roxo text-roxo hover:bg-opacity-20 hover:border-black font-bold py-3 rounded-xl"
          >
            Entrar
          </Link>}
          <Link to="/" className="flex items-center justify-center gap-2"><p className="text-sm text-roxo underline underline-offset-2">Voltar para Página Inicial</p></Link>
        </div>

      </div>
    </div>
  );
}

export default Cadastro;
