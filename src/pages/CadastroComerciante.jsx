import { useForm } from "react-hook-form";
import RadioButton from "../components/RadioButton";

function CadastroPessoa() {
  const { register, handleSubmit } = useForm();

  async function cadastra(data) {
    const nome = data.nome;
    const endereco = data.endereco;
    const documento = data.documento;
    const email = data.email;
    const senha = data.senha;

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
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-sm w-11/12 mx-auto my-8">
        <div className="text-center mb-6">
          <img src="/logoNaesquina.svg" alt="" className="mx-auto h-20 mb-4" />
        </div>

        <form onSubmit={handleSubmit(cadastra)}>
          <div className="mb-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img
                  src="/BsEnvelope.svg"
                  alt="Ícone de E-mail"
                  className="h-5 w-5 text-gray-400"
                />
              </span>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nome da loja"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("nome")}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img
                  src="/BsEnvelope.svg"
                  alt="Ícone de E-mail"
                  className="h-5 w-5 text-gray-400"
                />
              </span>

              <input
                type="text"
                id="endereco"
                name="endereco"
                placeholder="Endereço"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("endereco")}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img
                  src="/BsEnvelope.svg"
                  alt="Ícone de E-mail"
                  className="h-5 w-5 text-gray-400"
                />
              </span>

              <input
                type="text"
                id="documento"
                name="documento"
                placeholder="CPF/CNPJ"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("documento")}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img
                  src="/BsEnvelope.svg"
                  alt="Ícone de E-mail"
                  className="h-5 w-5 text-gray-400"
                />
              </span>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("email")}
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img
                  src="/BiLockAlt.svg"
                  alt="Ícone de E-mail"
                  className="h-5 w-5 text-gray-400"
                />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Senha"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("senha")}
              />
            </div>
          </div>
        </form>

        <button className="bg-roxo w-full border border-roxo text-white hover:bg-opacity-20 hover:border-black font-bold py-3 rounded-xl">
          Continuar
        </button>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-roxo"></div>

          <div className="flex-grow border-t border-roxo"></div>
        </div>
        <a
          href="#"
          className="text-sm text-black underline hover:underline mt-2 block text-center"
        >
          Já tem cadastro? Entre
        </a>
      </div>
    </div>
  );
}

export default CadastroPessoa;
