import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Botao from './Botao';
import { FaBars } from 'react-icons/fa6';
import Menu from './Menu';
import { RiLoginBoxFill, RiLogoutBoxLine } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
import { useForm } from 'react-hook-form';


function Header({ setUsuarioLogado }) {
    const [menuMobile, setMenuMobile] = useState(false)
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()

    const isStore = usuarioLogado?.isStore

    //Esse use Effect atualizar o Header quando o localStorage mudar
    useEffect(() => {
        function handleStorage() {
            const user = localStorage.getItem("usuarioLogado")
            setUsuarioLogado(user ? JSON.parse(user) : null)
        }
        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, [setUsuarioLogado]);

    function logout() {
        localStorage.removeItem("usuarioLogado")
        if (setUsuarioLogado) setUsuarioLogado(null)
        setMenuMobile(false)
        navigate("/")
    }

    function mobileMenu() {
        menuMobile ? setMenuMobile(false) : setMenuMobile(true)
    }

    function pesquisar(data) {
        navigate(`/pesquisar?termo=${encodeURIComponent(data.pesquisa)}`)
    }

    return (
        <>
            <header className='w-full flex justify-between items-center py-5 md:px-12 px-6 bg-salmao font-inter'>
                <Link to="/" className='flex items-center gap-2'>
                    <img
                        src="../iconeNaEsquina.svg"
                        alt="Icone NaEsquina"
                        className='w-12 '
                    />
                    <h1 className='md:text-4xl text-2xl text-branco/80 font-semibold font-poppins '><span className='text-roxo font-boldn'>Na</span>Esquina</h1>
                </Link>
                <form className='w-[50%] hidden md:block' onSubmit={handleSubmit(pesquisar)}>
                    <div className='flex justify-between items-center gap-3 bg-branco py-3 px-4 rounded-full overflow-clip'>
                        <Link to="/" className=''><AiFillHome className='text-gray-500 text-xl' /></Link>
                        <input
                            type="text"
                            placeholder='Procurar Lojas'
                            className='w-full outline-0 border-l border-gray-300 pl-3'
                            {...register("pesquisa")}
                            autoComplete='off'
                        />
                        <button type='submit'><FiSearch className='text-black/50 text-xl cursor-pointer' /></button>
                    </div>
                </form>
                {usuarioLogado ? (
                    <>
                        <button onClick={logout} className='items-center gap-2 bg-bege py-2 px-5 rounded-full cursor-pointer hidden md:flex'>
                            <RiLogoutBoxLine className='text-roxo text-2xl' />
                            <p className='font-bold text-preto'>Sair</p>
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className='md:block hidden'><Botao text="Entrar" /></Link>
                    </>
                )
                }
                <button className='text-2xl md:hidden block  text-roxo' onClick={mobileMenu}><FaBars /></button>
            </header>
            {menuMobile && (
                <div className='flex flex-col'>
                    <nav className='bg-roxo/80 flex justify-around items-center px-6 py-2'>
                        <Link to="/" className='flex items-center gap-1 text-base text-bege'><AiFillHome className='text-branco text-lg' /> Página inicial</Link>
                        {usuarioLogado ?
                            <button onClick={logout} className='flex text-base items-center gap-1 text-bege'><RiLogoutBoxLine className='text-branco text-lg' /> Sair</button>
                            : <Link to="/login" className='flex text-base items-center gap-1 text-bege'><RiLoginBoxFill className='text-branco text-lg' /> Entrar</Link>}
                    </nav>
                    <form className='w-full' onSubmit={handleSubmit(pesquisar)}>
                        <div className='flex justify-between items-center gap-3 bg-branco py-3 px-4 rounded-full overflow-clip'>
                            <input
                                type="text"
                                placeholder='Procurar Lojas'
                                className='w-full outline-0 '
                                {...register("pesquisa")}
                                autoComplete='off'
                            />
                            <button type='submit'><FiSearch className='text-black/50 text-xl cursor-pointer' /></button>
                        </div>
                    </form>
                </div>
            )}
            {isStore && <Menu />}
        </>
    );
}

export default Header;