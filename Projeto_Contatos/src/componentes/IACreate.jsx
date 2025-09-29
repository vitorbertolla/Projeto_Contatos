import { useState } from "react"
import './IAstyle.css'
import { GoogleGenerativeAI } from "@google/generative-ai"

const IACreate = ({ setMensagem, setMostrarIACreate })=>{
    const [prompt, setPrompt] = useState("")
    const [resposta, setResposta] = useState("")
    const [carregando, setCarregando] = useState(false)
    const [idioma, setIdioma] = useState("en")
    const apikey = import.meta.env.VITE_API_KEY

    const enviarPrompt = async () => {
        if (!prompt) return;
        setCarregando(true)
        setResposta("")

        try {
        const genAI = new GoogleGenerativeAI(apikey)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const response = await model.generateContent(
            `gere uma mensagem em português para o seguinte comando (passe apenas a resposta): ${prompt}`
        )

        setResposta(response.response.text())
        } catch (error) {
        console.error("Erro ao gerar:", error)
        } finally {
        setCarregando(false)
        }
    }



    return (
        <div className="ia-container">
        <h1 className="ia-title">Tradutor com IA</h1>
        <div className="ia-texto-botao">
            <input
            type="text"
            placeholder="Digite sua solicitação"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="ia-input"
            />


            <button
            disabled={!prompt || carregando}
            onClick={enviarPrompt}
            className="ia-button"
            >
            {carregando ? "Gerando..." : "Gerar"}
            </button>

            <button
            onClick={() => {
                setMensagem(resposta)
                setMostrarIACreate((prev) => !prev)
            }}
            >
            Concluir
            </button>
        </div>

        {resposta && (
            <div className="ia-resposta">
            <p>{resposta}</p>
            </div>
        )}
        </div>
    )
}
export default IACreate
  