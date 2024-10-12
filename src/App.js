import React, { useState, useEffect } from 'react';
import { Listado } from './components/Listado';
import { Buscador } from './components/Buscador';
import { Crear } from './components/Crear';

const App = () => {

  const [listadoState, setListadoState] = useState([]);

  // Cargar películas desde localStorage cuando el componente se monta
  useEffect(() => {
    let peliculas = JSON.parse(localStorage.getItem('pelis')) || [];
    setListadoState(peliculas);
  }, []);

  return (
    <div className="layout">
      {/* Cabecera */}
      <header className="header">
        <div className="logo">
          <div className="play"></div>
        </div>
        <h1>MisPelis</h1>
      </header>

      {/* Barra de navegación */}
      <nav className="nav">
        <ul>
          <li><a href="/#">Inicio</a></li>
          <li><a href="/#">Películas</a></li>
          <li><a href="/#">Blog</a></li>
          <li><a href="/#">Contacto</a></li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <section id="content" className="content">
        {/* Listado de películas */}
        <Listado listadoState={listadoState} setListadoState={setListadoState} />
      </section>

      {/* Barra lateral */}
      <aside className="lateral">
        <Buscador listadoState={listadoState} setListadoState={setListadoState} />
        <Crear setListadoState={setListadoState} />
      </aside>

      {/* Pie de página */}
      <footer className="footer">
        &copy; Curso de React - <a href="https://manuelhernandez.com.edu">manuelhernandez.com.edu</a>
      </footer>
    </div>
  );
}

export default App;
