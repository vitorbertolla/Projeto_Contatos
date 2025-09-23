import { useState } from "react"
import './IA.css'

    const [prompt, setPrompt] = useState("")
    const [resposta, setResposta] = useState("")
    const [carregando, setCarregando] = useState(false)

const enviarPrompt = () => {
    setCarregando(true)
    setResposta("")

    const apikey = import.meta.env.VITE_DEEPAI_KEY 

    try{
        const respostaAPI = await fetch(
            "https://api.deepai.org/api/text-generator",
            {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                     "Api-key": apikey,
                },
                body: JSON.stringify({
                    text: prompt,
                }),
            },

        ),
        const dados = await respostaAPI.json()
        const conteudo = dados.output
        // verifica se existe uma resposta, para que ela não seja undefined
        setResposta(conteudo || "Erro ao obter resposta de IA")
    }catch (erro){
        setResposta(`Erro na requiisão, ${erro}`)
    }
    setCarregando(false)

    
    return(
        <div className="container">
            <h1>Solicite uma mensagem para a IA</h1>
            <div className="texto-botao">
                <input type="text"
                placeholder="Digite sua solicitação:" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}/>
                <button disabled={!pergunta || carregando} onClick={() => enviarPrompt()}>{carregando? "Enviando":"Gerar com IA"}</button>
            </div>
            {resposta &&(
                <div>
                    <p>Resposta: {resposta}</p>
                </div>
            )}
        </div>
    )
}

