import { useState, useEffect } from "react"

const Create = ({ addContato, numeroInvalidoCreate, ContatosEdit, numeroRepetido, formatarNumber}) => {
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")

  useEffect(() => {
    if (ContatosEdit) {
      setName(ContatosEdit.name);
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
      const success = await addContato(name, number)
      if (success) {
        setName("")
        setNumber("")
      }
    }
  }

  return (
    <div className="container-add">
      <h1>Agenda de Contatos</h1>
      <form onSubmit={Submit}>
        <div className="form-control">
          <input
            type="text"
            value={name}
            placeholder="Digite o nome do contato"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>
            <span style={{ transitionDelay: "0ms" }}>N</span>
            <span style={{ transitionDelay: "60ms" }}>o</span>
            <span style={{ transitionDelay: "120ms" }}>m</span>
            <span style={{ transitionDelay: "180ms" }}>e</span>
          </label>
        </div>
        <div className="form-control">
          <input
            maxLength="15"
            type="text"
            placeholder="(44) 91234-5678"
            value={number}
            onChange={(e) => setNumber(formatarNumber(e.target.value))}
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
            {numeroInvalidoCreate && (
              <p className="error-msg">Número inválido</p>
            )}
            {numeroRepetido && (
              <p className="error-msg">Número já adicionado</p>
            )}

        </div>
        <button className="buttonAdd" type="submit">
          {ContatosEdit ? "Salvar Alterações" : "Adicionar Contato"}
        </button>
      </form>
    </div>
  );
};

export default Create;
