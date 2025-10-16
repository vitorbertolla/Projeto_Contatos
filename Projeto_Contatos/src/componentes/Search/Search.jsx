const Search = ({ContatosSearch, setSearch,Contatos }) => {
    return(
    <div className="form-control search-control">
      <h1>Seus Contatos</h1>
      <input
        type="text"
        value={ContatosSearch}
        placeholder="Nome ou Número"
        onChange={(e) => setSearch(e.target.value)}
      />
      <h3>Seus Contatos ({Contatos.length})</h3>
    </div>
    )
}
export default Search