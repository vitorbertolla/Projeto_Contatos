import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {supabase} from './supabaseClient'
import Create from "./componentes/Create/Create";
import ListContatos from "./componentes/listContatos/listContatos";
import Search from "./componentes/Search/Search";
import { validarNumber, formatarNumber } from "./componentes/ValidarContatos/validarContatos";
import Message from "./componentes/Message/Message";
import IATraducao from "./componentes/IA/IATraducao";
import IACreate from "./componentes/IA/IACreate";
import "./GeneralCSS/theme.css";
import "./GeneralCSS/global.css";
import "./componentes/Create/Create.css"
import "./componentes/Search/Search.css"



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
    // Validação
    if (!validarNumber(number)) {
      setNumeroInvalidoCreate(true);
      setTimeout(() => setNumeroInvalidoCreate(false), 3000);
      return false;
    }

    // Se estiver editando
    if (ContatosEdit) {
      const { error } = await supabase
        .from("contatos")
        .update({ name, number })
        .eq("id", ContatosEdit.id);

      if (!error) {
        await getContatos();
        setEdit(null);
      }
      return true;
    }

    // Se for novo contato
    const numeroExiste = Contatos.some((contato) => contato.number === number);
    if (numeroExiste) {
      setNumeroRepetido(true);
      setTimeout(() => setNumeroRepetido(false), 3000);
      return false;
    }

    const { data, error } = await supabase
      .from("contatos")
      .insert([{ name, number }])
      .select();

    if (!error && data && data.length > 0) {
      await getContatos();
    }

    return true;
  };

  const removeContato = async (id) => {
    const { error } = await supabase.from("contatos").delete().eq("id", id);
    if (!error) {
      await getContatos();
      // perguntar para o professor se é melhor atualizar assim ou de forma manual, com filter e map por exemplo
    }
  };

  const editContato = (id) => {
    const edit = Contatos.find((contato) => contato.id === id);
    if (edit) setEdit(edit);
  };

  const searchContato = () => {
    if (!ContatosSearch) return Contatos;
    return Contatos.filter(
      (c) =>
        c.name.toLowerCase().includes(ContatosSearch.toLowerCase()) ||
        c.number.replace(/\D/g, "").includes(ContatosSearch) ||
        c.number.includes(ContatosSearch)
    );
  };

  const enviarMensagem = (numeroMensagem, mensagem) => {
    if (!validarNumber(numeroMensagem)) {
      setNumeroInvalido(true);
      setTimeout(() => setNumeroInvalido(false), 3000);
      return false;
    }
    const numeroLimpo = numeroMensagem.replace(/\D/g, "");
    const novoLink = `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
    setLink(novoLink);
    return true;
  };

  const copiarBotao = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => true)
      .catch(() => false);
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
          <div className="ia-popup">
            <IATraducao
              setMensagem={setMensagem}
              setMostrarIATraducao={setMostrarIATraducao}
              setMostrarIACreate={setMostrarIACreate}
            />
          </div>
        )}

        {mostrarIACreate && (
          <div className="ia-popup">
            <IACreate
              setMensagem={setMensagem}
              setMostrarIACreate={setMostrarIACreate}
              setMostrarIATraducao={setMostrarIATraducao}
            />
          </div>
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
      </div>
      <div className="container-3">
        <Search ContatosSearch={ContatosSearch} 
        setSearch={setSearch} 
        Contatos={Contatos}/>
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
