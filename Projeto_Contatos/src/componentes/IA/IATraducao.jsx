import { useState } from "react"
import './IAstyle.css'
import { GoogleGenerativeAI } from "@google/generative-ai"


const IATraducao = ({ setMensagem, setMostrarIATraducao}) => {
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
        `Traduza o seguinte texto para (passe apenas uma tradução) ${idioma}: ${prompt}`
      )

      setResposta(response.response.text())
    } catch (error) {
      console.error("Erro ao traduzir:", error)
    } finally {
      setCarregando(false)
    }
  }


  return (
    <div className="ia-container">
      <h1 className="ia-title">Tradutor de mensagens</h1>
      <div className="ia-texto-botao">
      <div className="form-control">
        <input
          type="text"
          placeholder="Digite o texto em português"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
          className="ia-input"
        />
        <label>
          <span style={{ transitionDelay: "0ms" }}>M</span>
          <span style={{ transitionDelay: "60ms" }}>e</span>
          <span style={{ transitionDelay: "120ms" }}>n</span>
          <span style={{ transitionDelay: "180ms" }}>s</span>
          <span style={{ transitionDelay: "240ms" }}>a</span>
          <span style={{ transitionDelay: "300ms" }}>g</span>
          <span style={{ transitionDelay: "360ms" }}>e</span>
          <span style={{ transitionDelay: "400ms" }}>m</span>
        </label>
      </div>


        <select className="ia-select" value={idioma} onChange={(e) => setIdioma(e.target.value)}>
          <option value="inglês">Inglês</option>
          <option value="espanhol">Espanhol</option>
          <option value="frances">Francês</option>
          <option value="alemão">Alemão</option>
          <option value="japones">Japonês</option>
        </select>

        <button
          disabled={!prompt || carregando}
          onClick={enviarPrompt}
          className="ia-button"
        >
          {carregando ? "Traduzindo..." : "Traduzir"}
        </button>

        <button className="ia-concluir"
          onClick={() => {
            setMensagem(resposta)
            setMostrarIATraducao((prev) => !prev)
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

export default IATraducao
