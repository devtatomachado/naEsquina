import Header from '../components/Header';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import InputLoja from '../components/InputLoja';
import { Fa0 } from 'react-icons/fa6';
import { FaBox } from 'react-icons/fa';
import { FiBox } from 'react-icons/fi';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { BsCardText } from 'react-icons/bs';
import { TbLayoutGridAdd } from 'react-icons/tb';

function AdicionarProdutos() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (dados) => {
    try {
      const lojaId = localStorage.getItem("lojaIdLogada");

      if (!lojaId) {
        Swal.fire("Erro", "Nenhuma loja está logada. Faça login para continuar.", "error");
        return;
      }

      const result = await Swal.fire({
        title: "Você tem certeza que quer salvar o produto?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Salvar",
        denyButtonText: `Não salvar`,
      });

      if (result.isConfirmed) {
        const lojaResponse = await fetch(`http://localhost:3000/lojas/${lojaId}`);
        const lojaData = await lojaResponse.json();

        const novoProduto = {
          id: Date.now(),
          nome: dados.nome,
          imagem: dados.imagem,
          descricao: dados.descricao,
          valor: dados.valor,
          disponibilidade: dados.disponibilidade
        };


        const produtosAtualizados = [...(lojaData.produtos || []), novoProduto];



        const updateResponse = await fetch(`http://localhost:3000/lojas/${lojaId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...lojaData, produtos: produtosAtualizados })
        });

        if (!updateResponse.ok) throw new Error('Erro ao salvar produto');

        reset();

        Swal.fire("Salvo!", "Produto adicionado com sucesso.", "success");

      } else if (result.isDenied) {
        Swal.fire("Produto não foi salvo", "", "info");
      }

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar',
        text: 'Tente novamente mais tarde.',
      });
    }
  };

  return (
    <>
      <Header />
      <main className='flex flex-col gap-12 md:px-12 py-8 md:py-8 pb-16 bg-salmao/40'>
        <div className='flex justify-start items-center bg-salmao px-4 w-[17.375rem] h-[3.5625rem] gap-[0.625rem] rounded-r-2xl border-l-[10px] border-l-[var(--Roxo,#685369)]'>
          <TbLayoutGridAdd  className="text-3xl text-roxo"/>
          <h3 className='text-roxo text-xl font-bold'>Adicionar Produtos</h3>
        </div>
        <div className='flex justify-center mx-3 md:mx-0'>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full md:w-[60%] grid grid-cols-1 md:grid-cols-2 md:gap-y-4 md:gap-x-8 gap-y-3' action="">
              <InputLoja
                label="Nome do Produto"
                nome="nome"
                icon={FiBox}
                register={register}
                type="text"
                className="col-span-1"
              />
              <InputLoja
                label="Preço do Produto"
                nome="valor"
                icon={BiMoneyWithdraw}
                register={register}
                type="number"
                className="col-span-1"
                min="1"
                step="0.5"
              />
            <InputLoja
              label="Imagem do Produto"
              nome="imagem"
              icon={MdAddPhotoAlternate}
              register={register}
              type="text"
              className="col-span-1 md:col-span-2"
            />
            <textarea
              className="w-full h-[200px] bg-bege flex items-start gap-2 p-3 rounded-lg border border-salmao text-roxo font-medium text-base outline-0 resize-none md:col-span-2"
              id="descricao"
              minLength={100}
              placeholder="Descrição do Produto" {...register("descricao")}
            ></textarea>
            <div className='flex flex-col gap-2'>
              <p className='text-roxo font-semibold'>Disponibilidade:</p>
              <div className='flex gap-5 items-center'>
                <div className='flex gap-2 items-center'>
                  <input type="radio" id="estoque" value="Em estoque" {...register("disponibilidade")} className='accent-roxo cursor-pointer' />
                  <label htmlFor="estoque" className='text-lg font-medium text-roxo cursor-pointer'>Estoque</label>
                </div>
                <div className='flex gap-2 items-center'>
                  <input type="radio" id="encomenda" value="encomenda" {...register("disponibilidade")} className='accent-roxo cursor-pointer'/>
                  <label htmlFor="encomenda" className='text-lg font-medium text-roxo cursor-pointer'>Encomenda</label>
                </div>
              </div>
            </div>
            <div className='flex flex-col md:flex-row md:gap-9 mt-[0.62rem] gap-[0.62rem] mb-[2.5rem]'>
              <button type="submit" className='bg-salmao cursor-pointer text-roxo font-bold text-[1.25rem] rounded-2xl h-[3.375rem] w-full'>
                Adicionar Produto
              </button>
              <button type="reset" className='bg-roxo cursor-pointer text-salmao font-bold text-[1.25rem] rounded-2xl h-[3.375rem] w-full'>
                Limpar
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AdicionarProdutos;