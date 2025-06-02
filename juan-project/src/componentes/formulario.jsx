import React, { useState } from 'react';
import './formulario.css';

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

function NombreForm() {
  const [nombre, setNombre] = useState('');
  const [respuesta, setRespuesta] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setRespuesta(null);

    try {
      console.log(nombre);

      const res = await fetch(`${baseUrl}/usuario/${nombre}`, {
        method: 'GET',
      });

      if (!res.ok) {
        throw new Error('Error en la petición: ' + res.status);
      }

      // Como el backend no devuelve JSON, mostramos mensaje personalizado
      setRespuesta({ mensaje: "Usuario guardado correctamente" });

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>

      {respuesta && (
        <div>
          <h3>Respuesta del servidor:</h3>
          <pre>{JSON.stringify(respuesta, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
}

export default NombreForm;
