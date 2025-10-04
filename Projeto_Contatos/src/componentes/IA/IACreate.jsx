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
        <h1 className="ia-title">Gerador de mensagens</h1>
        <div className="ia-texto-botao">
            <div className="form-control">
            <input
                type="text"
                placeholder="Digite sua solicitação"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
                className="ia-input"
            />
            <label>
                <span style={{ transitionDelay: "0ms" }}>S</span>
                <span style={{ transitionDelay: "60ms" }}>o</span>
                <span style={{ transitionDelay: "120ms" }}>l</span>
                <span style={{ transitionDelay: "180ms" }}>i</span>
                <span style={{ transitionDelay: "240ms" }}>c</span>
                <span style={{ transitionDelay: "300ms" }}>i</span>
                <span style={{ transitionDelay: "360ms" }}>t</span>
                <span style={{ transitionDelay: "400ms" }}>a</span>
                <span style={{ transitionDelay: "450ms" }}>ç</span>
                <span style={{ transitionDelay: "500ms" }}>ã</span>
                <span style={{ transitionDelay: "550ms" }}>o</span>
            </label>
            </div>


            <button
            disabled={!prompt || carregando}
            onClick={enviarPrompt}
            className="ia-button"
            >
            {carregando ? "Gerando..." : "Gerar"}
            </button>

            <button className="ia-concluir"
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
  