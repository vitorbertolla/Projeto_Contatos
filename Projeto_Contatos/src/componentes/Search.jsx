const Search = ({ContatosSearch, setSearch}) => {
    return(
    <div className="form-control search-control">
      <input
        type="text"
        value={ContatosSearch}
        placeholder="Nome ou Número"
        onChange={(e) => setSearch(e.target.value)}
        required
      />
      <label>
        <span style={{ transitionDelay: "0ms" }}>P</span>
        <span style={{ transitionDelay: "40ms" }}>e</span>
        <span style={{ transitionDelay: "80ms" }}>s</span>
        <span style={{ transitionDelay: "120ms" }}>q</span>
        <span style={{ transitionDelay: "160ms" }}>u</span>
        <span style={{ transitionDelay: "200ms" }}>i</span>
        <span style={{ transitionDelay: "240ms" }}>s</span>
        <span style={{ transitionDelay: "280ms" }}>a</span>
      </label>
    </div>
    )
}
export default Search