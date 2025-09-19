const Search = ({ContatosSearch, setSearch}) => {
    return(
        <div>
            <input type="text"
            value={ContatosSearch}
            placeholder="Buscar"
            onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}
export default Search