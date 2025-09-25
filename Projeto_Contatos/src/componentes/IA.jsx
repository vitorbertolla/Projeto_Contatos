import { useState } from "react";
import './IAstyle.css';

const IA = ({setMensagem, setMostrarIA}) => {
  const [prompt, setPrompt] = useState("");
  const [resposta, setResposta] = useState("");
  const [carregando, setCarregando] = useState(false);

  const enviarPrompt = async () => {
    setCarregando(true);
    setResposta("");

    const apikey = import.meta.env.VITE_HF_KEY;

    try {
        const respostaAPI = await fetch(
        "https://api-inference.huggingface.co/models/google-t5/t5-base",
        {
            method: "POST",
            headers: {
            Authorization: `Bearer ${apikey}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: prompt }),
        }
        );


      const dados = await respostaAPI.json();
      console.log("Resposta da API:", dados);

      const conteudo = dados?.[0]?.translation_text || JSON.stringify(dados);
      setResposta(conteudo);

    } catch (erro) {
      setResposta(`Erro na requisição: ${erro}`);
    }

    setCarregando(false);
  };

  return (
    <div className="ia-container">
      <h1 className="ia-title">Solicite uma mensagem personalizada</h1>
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
          {carregando ? "Enviando..." : "Gerar com IA"}
        </button>
        <button onClick={()=> {
            setMensagem(resposta)
            setMostrarIA(prev => !prev)
          }} >Concluir</button>
      </div>
      {resposta && (
        <div className="ia-resposta">
          <p>{typeof resposta === "string" ? resposta : JSON.stringify(resposta)}</p>
        </div>
      )}
    </div>
  );
};

export default IA