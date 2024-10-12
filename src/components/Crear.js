import React, { useState } from 'react';
import { guardarEnStorage } from '../helpers/GuadarEnStorage';

export const Crear = ({ setListadoState }) => {
    const tituloComponente = "Añadir Película";

    const [pelisState, setPelisState] = useState({
        titulo: '',
        descripcion: ''
    });

    const { titulo, descripcion } = pelisState;

    const conseguirDatosFormulario = (e) => {
        e.preventDefault();
        let target = e.target;

        // Conseguir los datos del formulario
        let titulo = target.titulo.value;
        let descripcion = target.descripcion.value;

        // Crear el objeto película
        let peli = {
            id: new Date().getTime(),
            titulo,
            descripcion
        };

        // Actualizar el estado de listado de películas
        setListadoState(elemento => {
            return [...elemento, peli];
        });

        // Guardar en el almacenamiento local
        guardarEnStorage("pelis", peli);

        // Limpiar el formulario
        target.reset();

        // Actualizar el estado del formulario a vacío
        setPelisState({
            titulo: '',
            descripcion: ''
        });

        /// alert(titulo+" "+descripcion)
    };

    return (
        <div>
            <div className="add">
                <h3 className="title">{tituloComponente}</h3>

                <form onSubmit={conseguirDatosFormulario}>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setPelisState({ ...pelisState, titulo: e.target.value })}
                    />

                    <textarea
                        id="descripcion"
                        name="descripcion"
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setPelisState({ ...pelisState, descripcion: e.target.value })}
                    ></textarea>

                    <input
                        type="submit"
                        id="save"
                        value="Guardar"
                    />
                </form>
            </div>
        </div>
    );
};
