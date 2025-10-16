const Search = ({ContatosSearch, setSearch,Contatos }) => {
    return(
    <div className="form-control search-control">
      <h1>Seus Contatos ({Contatos.length})</h1>
      <input
        type="text"
        value={ContatosSearch}
        placeholder="Nome ou Número"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
    )
}
export default Search