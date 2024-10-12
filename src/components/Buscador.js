import React, { useState } from 'react';

export const Buscador = ({ listadoState, setListadoState }) => {
  const [busqueda, setBusqueda] = useState('');
  const [noEncontrado, setNoEncontrado] = useState(false);

  const buscarPelicula = (e) => {
    // Obtener el valor de búsqueda del input
    const valorBusqueda = e.target.value;
    setBusqueda(valorBusqueda);

    // Si el campo de búsqueda está vacío, obtener todas las películas
    if (valorBusqueda.length === 0) {
      const todasLasPeliculas = JSON.parse(localStorage.getItem('pelis')) || [];
      setListadoState(todasLasPeliculas);
      setNoEncontrado(false);
      return;
    }

    // Filtrar películas por el título
    const pelis_encontradas = listadoState.filter((peli) =>
      peli.titulo.toLowerCase().includes(valorBusqueda.toLowerCase())
    );

    // Verificar si se encontraron películas o no
    if (pelis_encontradas.length === 0) {
      setNoEncontrado(true);
    } else {
      setNoEncontrado(false);
    }

    // Actualizar el estado con las películas encontradas
    setListadoState(pelis_encontradas);
  };

  return (
    <div>
      <div className="search">
        <h3 className="title">Buscador: {busqueda}</h3>

        {/* Mostrar mensaje si no se encuentra ninguna película */}
        {noEncontrado && busqueda.length > 0 && (
          <span className="no-encontrado">No se encontró ninguna película</span>
        )}

        <form>
          <input
            type="text"
            id="search_field"
            name="busqueda"
            autoComplete="off"
            value={busqueda}
            onChange={buscarPelicula} // Actualizar el estado directamente en el evento onChange
          />
        </form>
      </div>
    </div>
  );
};

export default Buscador;
