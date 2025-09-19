import { useState, useEffect } from "react"

const Create = ({ addContato, ContatosEdit }) => {

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")

    const handleNumberChange = (event) => {
        let value = event.target.value;

        value = value.replace(/\D/g, "");

        // Limita a 11 caracteres
        if (value.length <= 11) {
            setNumber(value);
        }
    }

    useEffect(() => {
        if (ContatosEdit) {
            setName(ContatosEdit.name)
            setNumber(ContatosEdit.number.replace(/\D/g, "")) 
        } else {
            setName("")
            setNumber("")
        }
    }, [ContatosEdit])

    const Submit = async (e) => {
        e.preventDefault()
        if (!name || !number) return
        else {
            const success = addContato(name, number)
            if (success) {
                setName("")
                setNumber("")
            }
        }
    }

    return (
        <div className="container-add">
            <h1>Adicionar Contato</h1>
            <form onSubmit={Submit}>
                <input 
                    type="text" 
                    placeholder="Nome:" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Número:" 
                    value={number} 
                    onChange={handleNumberChange} 
                />
                <button type="submit">{ContatosEdit ? "Salvar Alterações" : "Adicionar Contato" }</button>
            </form>
        </div>
    )
}

export default Create
