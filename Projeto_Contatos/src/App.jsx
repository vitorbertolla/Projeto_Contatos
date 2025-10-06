import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Create from "./componentes/Create/Create";
import ListContatos from "./componentes/listContatos/listContatos";
import Search from "./componentes/Search/Search";
import { validarNumber, formatarNumber } from "./componentes/ValidarContatos/validarContatos";
import Message from "./componentes/Message/Message";
import IATraducao from "./componentes/IA/IATraducao";
import IACreate from "./componentes/IA/IACreate";
import "./GeneralCSS/theme.css";
import "./GeneralCSS/global.css";

// Inicialize o Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

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

  // Buscar contatos do Supabase ao carregar o app
  useEffect(() => {
    getContatos();
  }, []);

  async function getContatos() {
    const { data, error } = await supabase.from("contatos").select();
    if (!error && data) {
      setContatos(data);
    }
  }

  const addContato = async (name, number) => {
    if (!validarNumber(number)) {
      setNumeroInvalidoCreate(true);
      setTimeout(() => {
        setNumeroInvalidoCreate(false);
      }, 3000);
      return false;
    }

    if (ContatosEdit) {
      // Atualiza no Supabase
      const { error } = await supabase
        .from("contatos")
        .update({ name, number })
        .eq("id", ContatosEdit.id);
      if (!error) {
        const update = Contatos.map((contato) =>
          contato.id === ContatosEdit.id
            ? { ...contato, name, number }
            : contato
        );
        setContatos(update);
        setEdit(null);
      }
    } else {
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

      // Insere no Supabase
      const { data, error } = await supabase
        .from("contatos")
        .insert([{ name, number }])
        .select();
      if (!error && data && data.length > 0) {
        setContatos([...Contatos, data[0]]);
      }
    }
    return true;
  };

  const removeContato = async (id) => {
    // Remove do Supabase
    const { error } = await supabase.from("contatos").delete().eq("id", id);
    if (!error) {
      const atualizada = Contatos.filter((contato) => contato.id !== id);
      setContatos(atualizada);
    }
  };

  const editContato = (id) => {
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
      .catch(() => {
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
