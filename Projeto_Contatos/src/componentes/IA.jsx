import { useState } from "react"
import './IAstyle.css'  

const IA = () => {
  const [prompt, setPrompt] = useState("")
  const [resposta, setResposta] = useState("")
  const [carregando, setCarregando] = useState(false)

  const enviarPrompt = async () => {
    setCarregando(true)
    setResposta("")

    const apikey = import.meta.env.VITE_DEEPAI_KEY 

    try {
      const respostaAPI = await fetch(
        "https://api.deepai.org/api/text-generator",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Api-key": apikey,
          },
          body: JSON.stringify({
            text: prompt,
          }),
        }
      )

      const dados = await respostaAPI.json()
      const conteudo = dados.output
      setResposta(conteudo || "Erro ao obter resposta de IA")
    } catch (erro) {
      setResposta(`Erro na requisição: ${erro}`)
    }

    setCarregando(false)
  }

  return (
    <div className="ia-container">
      <h1 className="ia-title">Solicite uma mensagem para a IA</h1>
      <div className="ia-texto-botao">
        <input
          type="text"
          placeholder="Digite sua solicitação:" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="ia-input"
        />
        <button
          disabled={!prompt || carregando}
          onClick={enviarPrompt}
          className="ia-button"
        >
          {carregando ? "Enviando" : "Gerar com IA"}
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
