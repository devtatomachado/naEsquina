import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

function AdicionarProdutos() {
    return (
        <>
            <Header/>
            <Menu/>
            <main className='px-[2.94rem] bg-[rgba(239,164,139,0.39)] pt-[3.75rem] pb-[3.75rem]'>
                
                <div className='flex justify-center items-center bg-salmao w-[17.375rem] mb-[2.5rem]  h-[3.5625rem] gap-[0.625rem] rounded-tr-[0.9375rem] rounded-br-[0.9375rem] border-l-[10px] border-l-[var(--Roxo,#685369)]'>
                    <img src="./iconeprodutoroxo.svg" alt="" />
                    <h3 className='text-roxo text-[1.375rem] font-bold'>Adicionar Produtos</h3>
                </div>
                <form className='flex flex-col gap-1.5' action="">
                    <div className='flex flex-col gap-[1.25rem]'>
                        
                        <input type="text" className='border bg-bege text-roxo border-salmao rounded-[0.625rem] h-[3.375rem] px-[0.625rem]' placeholder= 'Nome do Produto' />
                    </div>
                    <div className='flex flex-col gap-[1.25rem] '>
                    
                        <input type="text" className='border bg-bege text-roxo border-salmao rounded-[0.625rem] h-[3.375rem] px-[0.625rem]' placeholder='Preço do Produto' />
                    </div>
                    <div className='flex flex-col gap-[1.25rem] '>
                    
                        <input type="text" className='border bg-bege text-roxo border-salmao rounded-[0.625rem] h-[3.375rem] px-[0.625rem]' placeholder='Imagem do Produto' />
                    </div>
                    <textarea className='h-[6.9375rem] p-[0.62rem] font-normal w-full border text-roxo border-salmao bg-bege' name="" id="">
                        Descrição do Produto
                    </textarea>
                    <div className='flex flex-col gap-[1.25rem] mb-[2.5rem]'>
                        <button type="submit" className='bg-salmao text-roxo font-bold text-[1.25rem] rounded-2xl h-[3.375rem] w-full'>
                            Adicionar Produto
                        </button>
                        <button type="reset" className='bg-roxo text-salmao font-bold text-[1.25rem] rounded-2xl h-[3.375rem] w-full'>
                            Limpar
                        </button>
                    </div>
                </form>
            </main>
            <Footer/>
        </>
    );
}

export default AdicionarProdutos;