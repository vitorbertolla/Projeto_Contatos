const ListContatos = ({contato})=>{
    return(
        <div>
            <p>Nome:{contato.name}</p>
            <p>Número:{contato.number}</p>
        </div>
    )
    
}
export default ListContatos