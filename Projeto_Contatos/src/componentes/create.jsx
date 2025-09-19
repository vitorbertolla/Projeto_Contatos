import { useState, useEffect } from "react"

const Create = ({addContato, ContatosEdit}) => {
    
    // to mexendo é pra limitar o numero pra 11 caracteres
    // const HandleChange = (event) => {
    //     const value = event.target.value
        
    //     const onlyNumbers = value.replace(/\D/g, '')

    //     if (onlyNumbers.length <= 11) {
    //         setNumber(prev=> ({...prev, phone: onlyNumbers}))
    //     }   
    // }

    const[name, setName] = useState("")
    const[number, setNumber] = useState("")

    useEffect(() =>{
        if(ContatosEdit){
            setName(ContatosEdit.name)
            setNumber(ContatosEdit.number)
        }else{
            setName("")
            setNumber("")
        }
        
    }, [ContatosEdit])
    // essse é o array de dependência do useEffect para falar quando ele deve rodar (toda vez que o ContatoEdit mudar) sem ele o useeffect fica rodando toda hora e não da para atualizar

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
                <input type="number" placeholder="Número:"value={number} onChange={(e) => HandleChange(e.target.value)}/>
                <button type="submit">{ContatosEdit ? "Salvar Alterações" :"Adicionar Contato" }</button>
            </form>
    </div>
    )
}
export default Create