import React from 'react';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <header className='w-full flex justify-between py-5 px-12 bg-salmao'>
            <Link to="/">
                <img
                    src="./iconeNaEsquina.svg"
                    alt="Icone NaEsquina"
                    className='w-12'
                />
            </Link>
            <form>
                <div>
                    <input type="text" />
                    <button> 

                    </button>
                </div>
            </form>
            <button>Entrar</button>
        </header>
    );
}

export default Header;