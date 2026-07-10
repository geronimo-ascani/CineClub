import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); // evita que recargue la página al hacer submit del form

    const trimmed = query.trim();
    if (!trimmed) return; // no buscar si está vacío

    onSearch(trimmed);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Buscar película..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;