import { useEffect, useState } from 'react';
import Card from './card'; 

export default function MainSection() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const limit = 16;

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
        setTotalPokemon(data.count);
      });
  }, [currentPage]);

  const totalPages = Math.ceil(totalPokemon / limit);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="main-section">
      <p className="text-lg mb-4">Here you can find a list of all Pokémon.</p>
      {pokemonList.length > 0 ? (
        <div className="grid grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
          {pokemonList.map((pokemon, index) => (
            <Card key={index} title={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}>
              <a href={pokemon.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Link to Pokémon
              </a>
            </Card>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 bg-gray-300 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 bg-gray-300 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}