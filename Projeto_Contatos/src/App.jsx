import { useState } from 'react'
import Create from './componentes/Create'
import ListContatos from './componentes/ListContatos'
import Search from './componentes/Search'
import './App.css'
import './theme.css'
import './global.css'

function App() {
  const [Contatos, setContatos] = useState([])
  const [ContatosEdit, setEdit] = useState(null)
  const [ContatosSearch, setSearch] = useState('')

  const addContato = (name, number) =>{

    // o some percorre todos os elementos e devolve true ou false
    const numeroExiste = Contatos.some(
    (contato) => contato.number === number)
    if (numeroExiste){
      alert("Número já adicionado na sua lista de Contatos ")
      return
    }
    
    if(ContatosEdit){
      const edit = Contatos.map((contato) => contato.id === ContatosEdit.id ?
    // essa linha copia todas as propriedades do contato e sobrescrevem com as novas propriedades 
    {...contato, name, number}
    :contato)

    setContatos(edit)
    setEdit(null)
    }else{
      
      const newContato = {
      id: Date.now(),
      name: name, 
      number: number
    }
    setContatos([...Contatos, newContato])
    }



  }

  const removeContato = (id) => {
    const atualizada = Contatos.filter((contato) => contato.id != id)
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
    || contato.number.includes(ContatosSearch) )
  }




  return (
    <div className='container'>

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

      <div>
          {searchContato().map ((contato)=>(
            <ListContatos 
            key = {contato.id}
            contato={contato}
            removeContato={removeContato}
            editContato={editContato}/> 
          ))
        }
          
      </div>

    </div>
  )
}

export default App
