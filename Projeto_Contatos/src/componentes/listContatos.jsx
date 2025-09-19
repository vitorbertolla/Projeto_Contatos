const ListContatos = ({contato, removeContato,editContato})=>{
    return(
        <div>
            <div>
                <p>Nome:{contato.name}</p>
                <p>Número:{contato.number}</p>
            </div>
            <div>
                <button onClick={()=>editContato(contato.id)}>editar</button>
                <button onClick={()=>removeContato(contato.id)}>X</button>
            </div>
        </div>
    )
    
}
export default ListContatos