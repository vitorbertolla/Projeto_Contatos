import { useState } from 'react'
import Create from './componentes/create'
import ListContatos from './componentes/listContatos'
import './App.css'

function App() {
  const [Contatos, setContatos] = useState([])

  const addContato = (name, number) =>{
    const newContato = {
      id: Date.now(),
      name: name, 
      number: number
    }
    setContatos([...Contatos, newContato])

  }




  return (
    <div>
      <div>
        <div>
          {Contatos.map ((contato)=>(
            <ListContatos 
            key = {contato.id}
            contato={contato}/> 
          ))
        }
          
        </div>
        <Create addContato={addContato}/>
      </div>

    </div>
  )
}

export default App
