import React, { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Botao from './Botao';
import { FaXmark } from 'react-icons/fa6';
import Menu from './Menu';


function Header() {

    const [searchMobile, setSearchMobile] = useState("hidden")
    // const [btnMobile, setBtnMobile] = useState(true)
    const [usuarioLogado, setUsuarioLogado] = useState(() => {
        const user = localStorage.getItem("usuarioLogado")
        return user ? JSON.parse(user) : null
    })

    const isStore = usuarioLogado?.isStore

    // function onSearch() {
    //     setSearchMobile("block")
    //     setBtnMobile(false)
    // }

    // function offSearch() {
    //     setSearchMobile("hidden")
    //     setBtnMobile(true)
    // }

    //Esse use Effect atualizar o Header quando o localStorage mudar
    useEffect(() => {
        function handleStorage() {
            const user = localStorage.getItem("usuarioLogado")
            setUsuarioLogado(user ? JSON.parse(user) : null)
        }
        window.addEventListener("storage", handleStorage)
        return () => window.removeEventListener("storage", handleStorage)
    }, []);

    function logout() {
        localStorage.removeItem("usuarioLogado")
        setUsuarioLogado(null)
    }


    return (
        <>
            <header className='w-full flex justify-between items-center py-5 px-12 bg-salmao font-inter'>
                <Link to="/" className='flex items-center gap-2'>
                    <img
                        src="../iconeNaEsquina.svg"
                        alt="Icone NaEsquina"
                        className='w-12 '
                    />
                    <h1 className='text-4xl text-branco/80 font-semibold font-poppins hidden md:block '><span className='text-roxo font-boldn'>Na</span>Esquina</h1>
                </Link>
                <form className='w-[50%] hidden md:block'>
                    <div className='flex justify-between gap-2 bg-branco py-3 px-4 rounded-full'>
                        <input
                            type="text"
                            placeholder='Procurar Lojas'
                            className='w-full outline-0'
                        />
                        <button><FiSearch className='text-black/50 text-xl cursor-pointer' /></button>
                    </div>
                </form>
                {usuarioLogado ? (
                    <>
                        <button onClick={logout}>Deslogar</button>
                    </>
                ) : (
                    <>

                        <Link to="/login"><Botao text="Entrar" /></Link>
                    </>
                )
                }
                <form className={`${searchMobile} w-[60%]`}>
                    <div className='flex justify-between gap-2 bg-branco py-3 px-4 rounded-full'>
                        <input
                            type="text"
                            placeholder='Procurar'
                            className='w-full outline-0'
                        />
                        <button><FiSearch className='text-black/50 text-xl cursor-pointer' /></button>
                    </div>
                </form>
                {/* <div className='flex items-center md:hidden'>
                {btnMobile && <button onClick={onSearch}><FiSearch className='text-2xl text-roxo block md:hidden' /></button>}
                {!btnMobile && <button onClick={offSearch}><FaXmark className='text-2xl text-roxo block md:hidden' /></button>}
            </div> */}
            </header>
            {isStore && <Menu />}
        </>
    );
}

export default Header;