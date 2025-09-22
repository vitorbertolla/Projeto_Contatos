import { formatarNumber } from "../validarContatos"
const ListContatos = ({contato, removeContato,editContato, setNumeroMensagem})=>{
    
    return (
        <div className="list-contato">
            <div className="list-contato-info">
                <h3>{contato.name}</h3>
                <p>{formatarNumber(contato.number)}</p>
            </div>
            <div className="list-contato-actions">
                <button className="button editar" onClick={() => editContato(contato.id)}>Editar</button>
                <button className="button excluir" onClick={() => removeContato(contato.id)}>X</button>
                <button className="button mensagem" onClick={() => setNumeroMensagem(contato.number)}>Mensagem</button>
            </div>
        </div>

    )
    
}
export default ListContatos