import { formatarNumber } from "../validarContatos"
const ListContatos = ({contato, removeContato,editContato})=>{
    return(
        <div>
            <div>
                <h3>Nome:{contato.name}</h3>
                <p>Número: {formatarNumber(contato.number)}</p>
            </div>
            <div>
                <button onClick={()=>editContato(contato.id)}>editar</button>
                <button onClick={()=>removeContato(contato.id)}>X</button>
            </div>
        </div>
    )
    
}
export default ListContatos