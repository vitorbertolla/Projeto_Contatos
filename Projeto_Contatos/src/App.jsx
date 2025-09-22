import { useState } from 'react'
import Create from './componentes/create'
import ListContatos from './componentes/listContatos'
import Search from './componentes/Search'
import { validarNumber, formatarNumber } from './validarContatos'
import Message from './componentes/Message'
import './theme.css'
import './global.css'
import './buttonAdd.css'
import './inputValores.css'
import './listContatos.css'

function App() {
  const [Contatos, setContatos] = useState([])
  const [ContatosEdit, setEdit] = useState(null)
  const [ContatosSearch, setSearch] = useState('')
  const [link, setLink] = useState("") 
  const [numeroMensagem, setNumeroMensagem] = useState("")


  const addContato = (name, number) =>{

    // valida o número
    if(!validarNumber(number)){
      alert("Número Inválido")
      return false
    }

    // formata o número
    const numberFormatado = formatarNumber(number)


    
    if(ContatosEdit){
      const update = Contatos.map((contato) => contato.id === ContatosEdit.id ?
    // essa linha copia todas as propriedades do contato e sobrescrevem com as novas propriedades 
    {...contato, name, number: numberFormatado}
    :contato)

    setContatos(update)
    setEdit(null)
    }else{
    // o some percorre todos os elementos e devolve true ou false
    const numeroExiste = Contatos.some(
    (contato) => contato.number === numberFormatado)
    if (numeroExiste){
      alert("Número já adicionado na sua lista de Contatos ")
      return false
    }
      
      const newContato = {
      id: Date.now(),
      name: name, 
      number: numberFormatado
    }
    setContatos([...Contatos, newContato])
    }
    return true


  }

  const removeContato = (id) => {
    const atualizada = Contatos.filter((contato) => contato.id !== id)
    setContatos(atualizada)
  }


  const editContato = (id) => {
    // .find retorna apenas o primeiro elemento que satisfaça a condição, usado quanto só precisa encontrar um elemento
    const edit = Contatos.find((contato) => contato.id === id)
    if (edit) setEdit(edit) 
  }

  const searchContato = () => {
    if(!ContatosSearch) return Contatos
    return Contatos.filter((contato) => contato.name.toLowerCase().includes(ContatosSearch.toLowerCase())
    || contato.number.replace(/\D/g, "").includes(ContatosSearch)
    || contato.number.includes(ContatosSearch) )
    // para poder pesquisar com ele formatado ou não
  }

  const enviarMensagem = (numeroMensagem, mensagem) =>{
    const numeroLimpo = numeroMensagem.replace(/\D/g, "")
    const novoLink = `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`
    setLink(novoLink)
    return true
  }



  return (
    <div className='container'>
      <div>
        <Message
        enviarMensagem={enviarMensagem}
        link={link}
        setNumeroMensagem={setNumeroMensagem}
        numeroMensagem={numeroMensagem}
        setLink={setLink} />
      </div>
      <div>
        <Create 
        addContato={addContato}
        ContatosEdit={ContatosEdit}/>
      </div>

      <div>
        <Search 
        CotatosSearch={ContatosSearch}
        setSearch={setSearch}/>
      </div>

      <div className='containerList'>
          {searchContato().map ((contato)=>(
            <ListContatos 
            key = {contato.id}
            contato={contato}
            removeContato={removeContato}
            editContato={editContato}
            setNumeroMensagem={setNumeroMensagem}/> 
          ))
        }
          
      </div>

    </div>
  )
}

export default App
