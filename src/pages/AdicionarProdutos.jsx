import Header from '../components/Header';
import Footer from '../components/Footer';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


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
        disponibilidade: "Em estoque" 
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
            <Header/>
            <main className='px-[2.94rem] bg-[rgba(239,164,139,0.39)] pt-[3.75rem] pb-[3.75rem]'>
                
                <div className='flex md:ml-8.5 justify-center items-center bg-salmao w-[17.375rem] mb-[2.5rem]  h-[3.5625rem] gap-[0.625rem] rounded-tr-[0.9375rem] rounded-br-[0.9375rem] border-l-[10px] border-l-[var(--Roxo,#685369)]'>
                    <img src="./iconeprodutoroxo.svg" alt="" />
                    <h3 className='text-roxo text-[1.375rem] font-bold'>Adicionar Produtos</h3>
                </div>
                <div className='md:flex md:justify-center md:items-center md:w-full'>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col md:gap-[2.2rem] md:justify-center md:w-[69rem] gap-[0.62rem]' action="">
                        <div className='flex flex-col md:flex-row space-y-[0.62rem] md:space-y-0 md:gap-[2.62rem]'>
                            <div className='flex items-center gap-1.5 bg-bege border border-salmao rounded-[0.625rem] h-[3.375rem] px-[0.625rem] w-full'>
                                <img src="./nomeproduto.svg" alt="" />
                                <input className='placeholder-roxo text-roxo outline-none' type="text"
                                id="nome"
                                placeholder= 'Nome do Produto' {...register("nome")} required />
                            </div>
                            <div className='flex items-center gap-1.5 bg-bege border border-salmao rounded-[0.625rem] h-[3.375rem] px-[0.625rem] w-full'>
                                <img src="./iconeprecoproduto.svg" alt="" />
                                <input className='placeholder-roxo text-roxo outline-none' type="text"
                                id="valor"
                                placeholder= 'Preço do Produto' {...register("valor")} required/>
                            </div>
                        </div>
                        <div className='flex items-center gap-1.5 bg-bege border border-salmao rounded-[0.625rem] h-[3.375rem] px-[0.625rem] w-full'>
                            <img src="./iconeimagemproduto.svg" alt="" />
                            <input className='placeholder-roxo text-roxo outline-none' 
                            type="text"
                            id="imagem"
                            placeholder= 'Imagem do Produto' {...register("imagem")} required />
                        </div>
                        <div className="flex items-start bg-bege border border-salmao rounded-[0.625rem] p-[0.625rem] w-full gap-[0.625rem]">
                          <img src="./iconedescricaoproduto.svg" alt="ícone descrição" className="w-5 h-5 mt-1" />
                          <textarea
                             className="bg-transparent outline-none text-roxo placeholder-roxo font-normal w-full h-[6.9375rem] resize-none"
                             id="descricao"
                             placeholder="Descrição do Produto" {...register("descricao")} 
                          ></textarea>
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
            <Footer/>
        </>
    );
}

export default AdicionarProdutos;