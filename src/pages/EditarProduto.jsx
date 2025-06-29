import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FiBox } from "react-icons/fi";
import { BiMoneyWithdraw, BiSolidEdit } from "react-icons/bi";
import { MdAddPhotoAlternate } from "react-icons/md";
import InputLoja from "../components/InputLoja";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function EditarProduto() {
    const { register, handleSubmit, reset } = useForm();

    const produtoSelecionado = JSON.parse(localStorage.getItem("produtoEditando"))
    const lojaId = localStorage.getItem("lojaId")
    const navigate = useNavigate()


    useEffect(() => {
        if (produtoSelecionado) {
            reset(produtoSelecionado)
        }
    }, [])


    async function salvarAlteracoes(data) {
        try {
            const resposta = await fetch(`http://localhost:3000/lojas/${lojaId}`)
            const loja = await resposta.json()


            const result = await Swal.fire({
                title: "Você tem certeza que quer salvar o produto?",
                showCancelButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: `Não salvar`,
            });

            if (result.isConfirmed) {

                const produtosAtualizados = loja.produtos.map(prod => prod.id === produtoSelecionado.id ? { ...prod, ...data } : prod)

                const update = await fetch(`http://localhost:3000/lojas/${lojaId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...loja,
                        produtos: produtosAtualizados,
                    })
                })
                if (!update) throw new Error("Erro ao salvar altarações!")

                await Swal.fire("Salvo!", "Produto adicionado com sucesso.", "success");

                navigate(`/loja/${lojaId}`)
            }

        } catch (e) {
            console.error("Error", e.message)
        }
    }

    function cancel() {
        navigate(`/loja/${lojaId}`)
    }

    return (
        <>
            <Header />
            <main className='flex flex-col gap-12 md:px-12 py-8 md:py-8 pb-16 bg-salmao/40'>
                <div className='flex justify-start items-center bg-salmao px-4 w-[17.375rem] h-[3.5625rem] gap-[0.625rem] rounded-r-2xl border-l-[10px] border-l-[var(--Roxo,#685369)]'>
                    <BiSolidEdit className="text-3xl text-roxo" />
                    <h3 className='text-roxo text-xl font-bold'>Editar Produtos</h3>
                </div>
                <div className='md:flex md:justify-center mx-3 md:items-center md:w-full'>

                    <form onSubmit={handleSubmit(salvarAlteracoes)} className='w-full md:w-[60%] grid grid-cols-1 md:grid-cols-2 md:gap-y-4 md:gap-x-8 gap-y-3' action="">
                        <InputLoja
                            label="Nome do Produto"
                            nome="nome"
                            icon={FiBox}
                            register={register}
                            type="text"
                            className="col-span-2"
                        />
                        <InputLoja
                            label="Preço do Produto"
                            nome="valor"
                            icon={BiMoneyWithdraw}
                            register={register}
                            type="number"
                            className="col-span-2"
                            min="1"
                            step="0.5"
                        />
                        <InputLoja
                            label="Imagem do Produto"
                            nome="imagem"
                            icon={MdAddPhotoAlternate}
                            register={register}
                            type="text"
                            className="col-span-2"
                        />
                        <textarea
                            className="w-full h-[200px] bg-bege flex items-start gap-2 p-3 rounded-lg border border-salmao text-roxo font-medium text-base outline-0 resize-none col-span-2"
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
                                    <input type="radio" id="encomenda" value="encomenda" {...register("disponibilidade")} className='accent-roxo cursor-pointer' />
                                    <label htmlFor="encomenda" className='text-lg font-medium text-roxo cursor-pointer'>Encomenda</label>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row md:gap-9 mt-[0.62rem] gap-[0.62rem] mb-[2.5rem]'>
                            <button type="submit" className='bg-salmao cursor-pointer text-roxo font-bold text-[1.25rem] rounded-2xl h-[3.375rem] w-full'>
                                Salvar
                            </button>
                            <button onClick={cancel} className='bg-roxo cursor-pointer text-salmao font-bold text-[1.25rem] rounded-2xl h-[3.375rem] w-full'>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />

        </>
    )
}

export default EditarProduto;