import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";

function Loja() {
    const { lojaID } = useParams();
    const [loja, setLoja] = useState([])

    useEffect(() => {
            async function carregaLojas() {
                try {
                    const resposta = await fetch(`http://localhost:3000/lojas/${lojaID}`)
                    if (!resposta.ok) throw new Error("Erro ao carregar as lojas!")
                    const dados = await resposta.json()
                    setLoja(dados)
                    console.log(dados)
                } catch (e) {
                    console.error('Erro: ', e.message)
                }
            }
            carregaLojas()
        }, [])
    



    return (
        <>
            <Header />
            <main>
                <h1>{loja.nome}</h1>
            </main>
            <Footer />
        </>
    )
}

export default Loja;