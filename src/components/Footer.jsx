import { Link } from 'react-router-dom'
import './Titulo.css'

function Titulo() {
    return (
        <>
            <header>
                
                <div>
                    <h1>Clube de Cinema da Família Silva</h1>
                    <h2>Cadastro e Avaliação de Filmes</h2>
                </div>
            </header>
            <nav>
                <Link to="/" className='links'>Home</Link>&nbsp;&nbsp;
                <Link to="/inclusao" className='links'>Inclusão</Link>&nbsp;&nbsp;
                <Link to="/pesquisa" className='links'>Pesquisa</Link>&nbsp;&nbsp;
            </nav>
        </>
    )
}

export default Titulo