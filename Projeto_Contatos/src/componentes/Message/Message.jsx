import { useState } from "react"
import './message.css'

const Message = ({ enviarMensagem, link, setLink, setNumeroMensagem, numeroMensagem, copiarBotao, setMostrarIATraducao,setMensagem, mensagem, numeroInvalido, setMostrarIACreate, formatarNumber}) => {
  const[mensagemCopiar, setMensagemCopiar] = useState(false)
  const Submit = async (e) => {
    e.preventDefault();
    if (!numeroMensagem) return;
    else {
      const success = enviarMensagem(numeroMensagem, mensagem);
      if (success) {
        setNumeroMensagem("");
        setMensagem("");
      }
    }
  };

  return (
    <div className="message-container">
      <h1>Gerador de Links</h1>
      <form onSubmit={Submit}>

        <div className="form-control">
        <input
            type="text"
            placeholder="Digite sua mensagem..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
        />
        <label>
            <span style={{ transitionDelay: "0ms" }}>M</span>
            <span style={{ transitionDelay: "60ms" }}>e</span>
            <span style={{ transitionDelay: "120ms" }}>n</span>
            <span style={{ transitionDelay: "180ms" }}>s</span>
            <span style={{ transitionDelay: "240ms" }}>a</span>
            <span style={{ transitionDelay: "300ms" }}>g</span>
            <span style={{ transitionDelay: "360ms" }}>e</span>
            <span style={{ transitionDelay: "420ms" }}>m</span>
        </label>
        </div>
        <div className="form-control">
          <input
            type="text"
            value={numeroMensagem}
            maxLength="15"
            placeholder="(44) 91234-5678"
            onChange={(e) => setNumeroMensagem(formatarNumber(e.target.value))}
            required
          />

          <label>
            <span style={{ transitionDelay: "0ms" }}>N</span>
            <span style={{ transitionDelay: "60ms" }}>ú</span>
            <span style={{ transitionDelay: "120ms" }}>m</span>
            <span style={{ transitionDelay: "180ms" }}>e</span>
            <span style={{ transitionDelay: "240ms" }}>r</span>
            <span style={{ transitionDelay: "300ms" }}>o</span>
          </label>
          {numeroInvalido &&(
            <p>Número Inválido</p>
          )}
        </div>

        <button className="buttonAdd" type="submit">Preparar Mensagem</button>

        {link && (
          <div className="link-gerado">
            <p>Link gerado:</p>
            <input type="text" value={link} readOnly />
            <div className="link-buttons">
              {mensagemCopiar && (
                <div className="toast show">Copiado com sucesso!</div>
              )}
              <button
                type="button"
                onClick={() => {
                  copiarBotao(link);
                  setMensagemCopiar(true);
                  setTimeout(() => {
                    setMensagemCopiar(false);
                  }, 2000);
                }}
              >
                📋
              </button>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <button type="button">Abrir WhatsApp</button>
              </a>
            </div>
          </div>
        )}

        <button className="ia-toggle" type="button" onClick={() => setMostrarIATraducao(prev => !prev)}>
          Traduza com IA
        </button>
        <button className="ia-toggle" type="button" onClick={() => setMostrarIACreate(prev => !prev)}>
          Gere com IA
        </button>
      </form>
    </div>
  );
};

export default Message;
