

function Menu () {
    return (
        <>
        <nav>
            <ul className="flex justify-center items-center h-[3rem] text-[0.9375rem] gap-5.5 bg-roxo text-white">
                <div className="flex items-center justify-center gap-1.5">
                    <img src="./IconeMenu1.svg" alt="" />
                    <li><a href="">Todos os Produtos</a></li>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                    <img src="./iconeMenu.svg" alt="" />
                    <li><a href="">Adicionar Produtos</a></li>
                </div>
            </ul>
        </nav>
        </>
    )
}

export default Menu;