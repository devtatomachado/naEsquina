import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdPerson } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import { GrDocumentUser } from "react-icons/gr";
import { TfiEmail } from "react-icons/tfi";
import { IoLockClosedOutline } from "react-icons/io5";
import Input from "../components/Input";

function Cadastro() {
  const { register, handleSubmit, reset } = useForm();
  const [telaAtiva, setTelaAtiva] = useState("comerciante");

  async function cadastra(data) {
    const { nome, endereco, documento, email, senha, confirma } = data;
    let isStore = false;

    if (documento.length === 0) {
      if (senha !== confirma) {
        alert("As senhas devem ser iguais");
        return;
      } else {
        reset();
        isStore = false;
      }
    } else {
      isStore = true;
    }

    try {
      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          endereco: endereco || "",
          documento: documento || "",
          email,
          senha,
          isStore,
        }),
      });
      if (!resposta.ok) throw new Error("Erro ao cadastrar");

      alert(`Ok!Cadastrado feito com sucesso:`);
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
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="comerciante"
                checked={telaAtiva === "comerciante"}
                onChange={(e) => {
                  setTelaAtiva(e.target.value);
                  reset(); // limpa os campos
                }}
                className="accent-purple-700"
              />
              <span>Comerciante</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="pessoa"
                checked={telaAtiva === "pessoa"}
                onChange={(e) => {
                  setTelaAtiva(e.target.value);
                  reset(); // limpa os campos
                }}
                className="accent-purple-700"
              />
              <span>Consumidor</span>
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit(cadastra)}>
          {telaAtiva === "comerciante" && (
            <>
              <Input
                type="text"
                placeholder="Nome"
                register={register}
                name="nome"
                icon={<MdPerson />}
              />
              <Input
                type="text"
                placeholder="Endereço"
                register={register}
                name="endereco"
                icon={<LuMapPin />}
              />
              <Input
                type="text"
                placeholder="CPF/CNPJ"
                register={register}
                name="documento"
                icon={<GrDocumentUser />}
              />
            </>
          )}

          {telaAtiva === "pessoa" && (
            <Input
              type="text"
              placeholder="Nome"
              register={register}
              name="nome"
              icon={<MdPerson />}
            />
          )}

          <Input
            type="email"
            placeholder="E-mail"
            register={register}
            name="email"
            icon={<TfiEmail />}
          />
          <Input
            type="password"
            placeholder="Senha"
            register={register}
            name="senha"
            icon={<IoLockClosedOutline />}
          />

          {telaAtiva === "pessoa" && (
            <Input
              type="password"
              placeholder="Confirmar Senha"
              register={register}
              name="confirma"
              icon={<IoLockClosedOutline />}
            />
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

        <a
          href="#"
          className="text-sm sm:text-base text-black underline hover:underline mt-2 block text-center"
        >
          Já tem cadastro? Entre
        </a>
      </div>
    </div>
  );
}

export default Cadastro;
