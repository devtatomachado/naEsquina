import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

function Cadastro() {
  const { register, handleSubmit } = useForm();
  const [telaAtiva, setTelaAtiva] = useState("comerciante");

  async function cadastra(data) {
    console.log(data);
    const nome = data.nome;
    let endereco = data.endereco;
    let documento = data.documento;
    const email = data.email;
    const senha = data.senha;
    let isStore = false;
    const confirma = data.confirma;

    if (documento.length == 0) {
      if (senha != confirma) {
        alert("As senhas devem ser iguais");
        return;
      } else {
        endereco = "";
        documento = "";
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
          endereco,
          documento,
          email,
          senha,
          isStore,
        }),
      });
      if (!resposta.ok) throw new Error("Erro ao cadastrar");
      const novoCadastro = await resposta.json();
      alert(`Ok! jogo Cadastrado com Código: ${novoCadastro.id}`);
    } catch (erro) {
      console.log(`Erro: ${erro.massage}`);
    }
  }

  return (
    <div className="bg-[url('/bg_Login.png')] bg-cover bg-center bg-fixed min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-xl w-96 max-w-lg">
        <div className="text-center mb-6">
          <img
            src="/logoNaesquina.svg"
            alt="Logo"
            className="mx-auto h-20 mb-4"
          />

          <div className="flex justify-center space-x-6">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="comerciante"
                checked={telaAtiva === "comerciante"}
                onChange={(e) => setTelaAtiva(e.target.value)}
                className="accent-purple-700"
              />
              <span>Comerciante</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="pessoa"
                checked={telaAtiva === "pessoa"}
                onChange={(e) => setTelaAtiva(e.target.value)}
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
                placeholder="Nome da loja"
                register={register}
                name="nome"
                icon="/BsEnvelope.svg"
              />
              <Input
                type="text"
                placeholder="Endereço"
                register={register}
                name="endereco"
                icon="/BsEnvelope.svg"
              />
              <Input
                type="text"
                placeholder="CPF/CNPJ"
                register={register}
                name="documento"
                icon="/BsEnvelope.svg"
              />
            </>
          )}

          <Input
            type="email"
            placeholder="E-mail"
            register={register}
            name="email"
            icon="/BsEnvelope.svg"
          />
          <Input
            type="password"
            placeholder="Senha"
            register={register}
            name="senha"
            icon="/BiLockAlt.svg"
          />

          {telaAtiva === "pessoa" && (
            <Input
              type="password"
              placeholder="Confirmar Senha"
              register={register}
              name="confirma"
              icon="/BiLockAlt.svg"
            />
          )}

          <button
            type="submit"
            className="bg-roxo w-full border border-roxo text-white hover:bg-opacity-20 hover:border-black font-bold py-3 rounded-xl mt-4"
          >
            {telaAtiva === "comerciante" ? "Continuar" : "Cadastrar"}
          </button>
        </form>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-roxo"></div>
        </div>

        <a
          href="#"
          className="text-sm text-preto underline hover:underline mt-2 block text-center"
        >
          Já tem cadastro? Entre
        </a>
          
      </div>
    </div>
  );
}

function Input({ type, placeholder, register, name, icon }) {
  return (
    <div className="mb-4">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <img src={icon} alt="" className="h-5 w-5 text-gray-400" />
        </span>
        <input
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          {...register(name)}
        />
      </div>
    </div>
  );
}

export default Cadastro;
