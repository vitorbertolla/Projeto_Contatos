import { useState } from "react"
const Create = ({addContato}) => {
    const[name, setName] = useState("")
    const[number, setNumber] = useState("")

    const Submit = async(e) =>{
        e.preventDefault()
        if(!name || !number) return
        else{
            addContato(name,number)
        }
        setName("")
        setNumber("")

    }

    return(
        <div className="container-add">
            <h1>Adicionar Contato</h1>
            <form onSubmit={Submit}>
                <input type="text" placeholder="Nome:" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="number" placeholder="Número:"value={number} onChange={(e) => setNumber(e.target.value)}/>
                <button type="submit">Adicionar</button>
                <button type="button">Editar</button>
            </form>
    </div>
    )
}
export default Create