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
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Buscar película..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none focus:border-orange-500"
      />
      <button 
        type="submit"
        className="rounded-lg bg-orange-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-orange-500"
      >Buscar</button>
    </form>
  );
}

export default SearchBar;