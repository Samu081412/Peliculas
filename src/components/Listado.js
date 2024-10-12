import React, { useEffect, useState } from 'react'
import { Editar } from './Editar';

export const Listado = ({ listadoState, setListadoState }) => {
    // Estado para controlar qué película está en edición
    const [editar, setEditar] = useState(0);

    // Función para obtener las películas desde el localStorage
    const conseguirPeliculas = () => {
        let peliculas = JSON.parse(localStorage.getItem("pelis"));
        setListadoState(peliculas);

        return peliculas;
    };

    // Hook para cargar las películas al montar el componente
    useEffect(() => {
        console.log("Componente de listado de pelicula cargado...!!");
        conseguirPeliculas();
    }, []);

    // Función para eliminar una película
    const borrarPeli = (id) => {
        // Obtener las películas almacenadas
        let pelis_almacenadas = conseguirPeliculas();

        // Filtrar las películas que no tengan el id eliminado
        let nuevo_array_peliculas = pelis_almacenadas.filter(peli => peli.id !== parseInt(id, 10));

        // Actualizar el estado con las películas filtradas
        setListadoState(nuevo_array_peliculas);

        // Guardar los nuevos datos en el localStorage
        localStorage.setItem('pelis', JSON.stringify(nuevo_array_peliculas));

        // Mostrar un mensaje de confirmación
        alert(`Pelicula eliminada ${id}`);
    };

    return (
        <div id="content" className="content">
            {listadoState != null ? (
                listadoState.map(peli => (
                    <article key={peli.id} className="peli-item">
                        <h3 className="title">{peli.titulo}</h3>
                        <p className="description">{peli.descripcion}</p>

                        <button className="edit" onClick={() => setEditar(peli.id)}>Editar</button>
                        <button className="delete" onClick={() => borrarPeli(peli.id)}>Borrar</button>

                        {/* Mostrar el formulario de edición si la película está en edición */}
                        {editar === peli.id && (
                            <Editar
                                peli={peli}
                                conseguirPeliculas={conseguirPeliculas}
                                setEditar={setEditar}
                                setListadoState={setListadoState}
                            />
                        )}
                    </article>
                ))
            ) : (
                <h2>No hay peliculas para mostrar</h2>
            )}
        </div>
    );
};
