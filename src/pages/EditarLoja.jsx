import { FaEdit, FaEnvelope, FaImage, FaMapMarkerAlt, FaPhoneAlt, FaStore } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import InputLoja from "../components/InputLoja";
import { useForm } from "react-hook-form";
import { MdDescription } from "react-icons/md";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function EditarLoja() {
    const { register, handleSubmit, reset } = useForm()
    const [lojaSelecionada, setLojaSelecionada] = useState([])

    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
    const navigate = useNavigate()

    useEffect(() => {
        async function carregaDados() {
            try {
                const resposta = await fetch(`http://localhost:3000/lojas?UsuarioId=${usuarioLogado.id}`)
                if (!resposta) throw new Error("Fatal Error!")
                const dados = await resposta.json();
                setLojaSelecionada(dados[0])
                reset(dados[0])
            } catch (e) {
                console.error("Error", e.message)
            }
        }
        carregaDados();
    }, [])

    async function salvarAlteracoes(data) {
        if (!data.nomeLoja || !data.endereco || !data.logo || !data.telefone || !data.email || !data.bio) {
        Swal.fire("Atenção", "Preencha todos os campos obrigatórios!", "warning");
        return;
    }
        try {
            const result = await Swal.fire({
                title: "Você tem certeza que quer salvar o produto?",
                showCancelButton: true,
                confirmButtonText: "Salvar",
                denyButtonText: `Não salvar`,
            });

            if (result.isConfirmed) {
                const resposta = await fetch(`http://localhost:3000/lojas/${lojaSelecionada.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...lojaSelecionada,
                        ...data,
                        UsuarioID: usuarioLogado.id
                    })
                })
                if (!resposta) throw new Error("Erro ao salvar altarações!")
                await Swal.fire("Salvo!", "Produto adicionado com sucesso.", "success");
                navigate("/")
                
            } 

        } catch (e) {
            console.error("Error", e.message)
        }
    }

    return (
        <>
            <Header />
            <main className='flex flex-col gap-12 md:px-12 py-8 md:py-8 pb-16 bg-salmao/40'>
                <div className='flex justify-start items-center bg-salmao px-4 w-[17.375rem] h-[3.5625rem] gap-[0.625rem] rounded-r-2xl border-l-[10px] border-l-[var(--Roxo,#685369)]'>
                    <FaEdit className="text-2xl text-roxo" />
                    <h3 className='text-roxo text-xl font-bold'>Editar Loja</h3>
                </div>
                <div className="flex justify-center mx-3 md:mx-0">
                    <form onSubmit={handleSubmit(salvarAlteracoes)} className='w-full md:w-[60%] grid grid-cols-1 md:grid-cols-2 md:gap-y-4 md:gap-x-8 gap-y-3'>
                        <InputLoja
                            label="Nome da Loja"
                            nome="nomeLoja"
                            icon={FaStore}
                            register={register}
                            type="text"
                            className="md:col-span-2"
                        />
                        <InputLoja
                            label="Endereço"
                            nome="endereco"
                            icon={FaMapMarkerAlt}
                            register={register}
                            type="text"
                            className="md:col-span-2"
                        />
                        <InputLoja
                            label="Link da imagem"
                            nome="logo"
                            icon={FaImage}
                            register={register}
                            type="text"
                            className="md:col-span-2"
                        />
                        <InputLoja
                            label="Telefone"
                            nome="telefone"
                            icon={FaPhoneAlt}
                            register={register}
                            type="text"
                        />
                        <InputLoja
                            label="Email"
                            nome="email"
                            icon={FaEnvelope}
                            register={register}
                            type="email"
                        />
                        <label htmlFor="bio" className="sr-only">descrição</label>
                        <textarea
                            id="bio"
                            {...register("bio")}
                            placeholder="Descrição da Loja"
                            minLength={150}
                            className="w-full h-[200px] bg-bege flex items-start gap-2 p-3 rounded-lg border border-salmao text-roxo font-medium text-base outline-0 resize-none md:col-span-2"
                        />
                        <div className='flex flex-col md:col-span-2 md:flex-row md:gap-9 mt-[0.62rem] gap-[0.62rem] mb-[2.5rem]'>
                            <button type="submit" className='bg-salmao cursor-pointer text-roxo font-bold text-[1.25rem] rounded-2xl h-[3.375rem] w-full'>
                                Salvar
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}

export default EditarLoja;