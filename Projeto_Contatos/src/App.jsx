import { useState } from "react";
import Create from "./componentes/Create/Create";
import ListContatos from "./componentes/listContatos/listContatos";
import Search from "./componentes/Search/Search";
import {validarNumber,formatarNumber} from "./componentes/ValidarContatos/validarContatos";
import Message from "./componentes/Message/Message";
import IATraducao from "./componentes/IA/IATraducao";
import IACreate from "./componentes/IA/IACreate";
import "./GeneralCSS/theme.css";
import "./GeneralCSS/global.css";

function App() {
  const [Contatos, setContatos] = useState([]);
  const [ContatosEdit, setEdit] = useState(null);
  const [ContatosSearch, setSearch] = useState("");
  const [link, setLink] = useState("");
  const [numeroMensagem, setNumeroMensagem] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [mostrarIATraducao, setMostrarIATraducao] = useState(false);
  const [mostrarIACreate, setMostrarIACreate] = useState(false);
  const [numeroRepetido, setNumeroRepetido] = useState(false);
  const [numeroInvalido, setNumeroInvalido] = useState(false);
  const [numeroInvalidoCreate, setNumeroInvalidoCreate] = useState(false);

  const addContato = (name, number) => {
    // valida o número
    if (!validarNumber(number)) {
      setNumeroInvalidoCreate(true);
      setTimeout(() => {
        setNumeroInvalidoCreate(false);
      }, 3000);
      return false;
    }


    if (ContatosEdit) {
      const update = Contatos.map((contato) =>
        contato.id === ContatosEdit.id
          ? // essa linha copia todas as propriedades do contato e sobrescrevem com as novas propriedades
            { ...contato, name, number: number }
          : contato
      );

      setContatos(update);
      setEdit(null);
    } else {
      // o some percorre todos os elementos e devolve true ou false
      const numeroExiste = Contatos.some(
        (contato) => contato.number === number
      );
      if (numeroExiste) {
        setNumeroRepetido(true);
        setTimeout(() => {
          setNumeroRepetido(false);
        }, 3000);
        return false;
      }

      const newContato = {
        id: Date.now(),
        name: name,
        number: number,
      };
      setContatos([...Contatos, newContato]);
    }
    return true;
  };

  const removeContato = (id) => {
    const atualizada = Contatos.filter((contato) => contato.id !== id);
    setContatos(atualizada);
  };

  const editContato = (id) => {
    // .find retorna apenas o primeiro elemento que satisfaça a condição, usado quanto só precisa encontrar um elemento
    const edit = Contatos.find((contato) => contato.id === id);
    if (edit) setEdit(edit);
  };

  const searchContato = () => {
    if (!ContatosSearch) return Contatos;
    return Contatos.filter(
      (contato) =>
        contato.name.toLowerCase().includes(ContatosSearch.toLowerCase()) ||
        contato.number.replace(/\D/g, "").includes(ContatosSearch) ||
        contato.number.includes(ContatosSearch)
    );
    // para poder pesquisar com ele formatado ou não
  };

  const enviarMensagem = (numeroMensagem, mensagem) => {
    if (!validarNumber(numeroMensagem)) {
      setNumeroInvalido(true);
      setTimeout(() => {
        setNumeroInvalido(false);
      }, 3000);
      return false;
    }
    const numeroLimpo = numeroMensagem.replace(/\D/g, "");
    const novoLink = `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(
      mensagem
    )}`;
    setLink(novoLink);
    return true;
  };

  const copiarBotao = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        return true;
      })
      .catch((err) => {
        return false;
      });
  };

  return (
    <div className="container">
      {/* Coluna esquerda - Gerador de Links */}
      <div className="container-message">
        <Message
        formatarNumber={formatarNumber}
          numeroInvalido={numeroInvalido}
          setMensagem={setMensagem}
          mensagem={mensagem}
          setMostrarIATraducao={setMostrarIATraducao}
          setMostrarIACreate={setMostrarIACreate}
          copiarBotao={copiarBotao}
          enviarMensagem={enviarMensagem}
          link={link}
          setNumeroMensagem={setNumeroMensagem}
          numeroMensagem={numeroMensagem}
          setLink={setLink}
        />
        {mostrarIATraducao && (
          <IATraducao
            setMensagem={setMensagem}
            setMostrarIATraducao={setMostrarIATraducao}
          />
        )}
        {mostrarIACreate && (
          <IACreate
            setMensagem={setMensagem}
            setMostrarIACreate={setMostrarIACreate}
          />
        )}
      </div>

      {/* Coluna direita - Agenda */}
      <div className="container-agenda">
        <Create
          formatarNumber={formatarNumber}
          addContato={addContato}
          numeroRepetido={numeroRepetido}
          ContatosEdit={ContatosEdit}
          numeroInvalidoCreate={numeroInvalidoCreate}
        />
        <Search ContatosSearch={ContatosSearch} setSearch={setSearch} />
        <div className="containerList">
          {searchContato().map((contato) => (
            <ListContatos
              key={contato.id}
              contato={contato}
              removeContato={removeContato}
              editContato={editContato}
              setNumeroMensagem={setNumeroMensagem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
