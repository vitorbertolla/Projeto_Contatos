import { useState } from "react"
import './IAstyle.css'

const IA = ({ setMensagem, setMostrarIA }) => {
  const [prompt, setPrompt] = useState("")
  const [resposta, setResposta] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [idioma, setIdioma] = useState("en") // en, es, fr

  const enviarPrompt = async () => {
    setCarregando(true)
    setResposta("")

    const apikey = import.meta.env.VITE_HF_KEY

    // dicionário de modelos por idioma
    const modelos = {
      en: "Helsinki-NLP/opus-mt-pt-en",
      es: "Helsinki-NLP/opus-mt-pt-es",
      fr: "Helsinki-NLP/opus-mt-pt-fr",
    }

    try {
      const respostaAPI = await fetch(
        `https://api-inference.huggingface.co/models/${modelos[idioma]}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apikey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
          }),
        }
      )

      const dados = await respostaAPI.json()
      console.log("Resposta da API:", dados)

      // para os modelos Helsinki, a saída vem em translation_text
      const conteudo = dados?.[0]?.translation_text || JSON.stringify(dados)
      setResposta(conteudo)

    } catch (erro) {
      setResposta(`Erro na requisição: ${erro}`)
    }

    setCarregando(false)
  }

  return (
    <div className="ia-container">
      <h1 className="ia-title">Tradutor com IA</h1>
      <div className="ia-texto-botao">
        <input
          type="text"
          placeholder="Digite o texto em português"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="ia-input"
        />

        <select value={idioma} onChange={(e) => setIdioma(e.target.value)}>
          <option value="en">Inglês</option>
          <option value="es">Espanhol</option>
          <option value="fr">Francês</option>
        </select>

        <button
          disabled={!prompt || carregando}
          onClick={enviarPrompt}
          className="ia-button"
        >
          {carregando ? "Traduzindo..." : "Traduzir"}
        </button>

        <button
          onClick={() => {
            setMensagem(resposta)
            setMostrarIA((prev) => !prev)
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

export default IA
