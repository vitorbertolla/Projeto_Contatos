import { useState } from "react"

const Message = ({enviarMensagem, link, setLink, setNumeroMensagem, numeroMensagem, copiarBotao, setMostrarIA}) =>{
    const [mensagem, setMensagem] = useState("")

    const Submit = async (e) => {
        e.preventDefault()
        if (!numeroMensagem ) return
        else {
            const success = enviarMensagem(numeroMensagem, mensagem)
                if (success) {
                    setNumeroMensagem("")
                    setMensagem("")
                }
        }
  }

    return(
        <div>
                <form onSubmit={Submit}>
                    <input type="text" placeholder="Qual o Número?" value={numeroMensagem} onChange={(e) => setNumeroMensagem(e.target.value)}/>
                    <input type="text" placeholder="Qual sua mensagem?" value={mensagem} onChange={(e) => setMensagem(e.target.value)}/>
                    <button type="submit">Enviar Mensagem</button>
                    <p> Seu link: {link}
                    <button type="button" onClick={() => copiarBotao(link)}>Copiar Link</button></p>
                    <button type="button"><a href={link} target="_blank" rel="noopener noreferrer">Abrir Whatsapp</a></button>
                    <button onClick={() => setMostrarIA(prev => !prev)}>Gerar com Ia</button>
                </form>

        </div>
    )
}
export default Message