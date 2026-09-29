import React, { useState, useEffect } from 'react';
import { api } from '../api'; // Usa la instancia configurada de Axios

function FormularioVenta({ onVentaCreada }) {
  const [formData, setFormData] = useState({
    estudiante_id: '',
    producto_id: '',
    cantidad: '',
    fecha: ''
  });

  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  // Cargar listas de estudiantes y productos al iniciar
  useEffect(() => {
    api.get('/estudiantes')
      .then(res => setEstudiantes(res.data))
      .catch(err => console.error('Error al cargar estudiantes:', err));

    api.get('/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/ventas', formData)
      .then(res => {
        alert(res.data.message || 'Venta registrada con éxito');
        setFormData({
          estudiante_id: '',
          producto_id: '',
          cantidad: '',
          fecha: ''
        });
        if (onVentaCreada) onVentaCreada(); // Refresca la tabla si se pasa la función
      })
      .catch(err => console.error('Error al registrar venta:', err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px auto', maxWidth: '400px' }}>
      <h3>Registrar Venta</h3>
      
      <div>
        <label>Estudiante:</label>
        <select 
          name="estudiante_id" 
          value={formData.estudiante_id} 
          onChange={handleChange}
          required
        >
          <option value="">Seleccione estudiante</option>
          {Array.isArray(estudiantes) && estudiantes.map(e => (
            <option key={e.id} value={e.id}>{e.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Producto:</label>
        <select 
          name="producto_id" 
          value={formData.producto_id} 
          onChange={handleChange}
          required
        >
          <option value="">Seleccione producto</option>
          {Array.isArray(productos) && productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Cantidad:</label>
        <input 
          type="number" 
          name="cantidad" 
          value={formData.cantidad} 
          onChange={handleChange}
          required 
        />
      </div>

      <div>
        <label>Fecha:</label>
        <input 
          type="date" 
          name="fecha" 
          value={formData.fecha} 
          onChange={handleChange}
          required 
        />
      </div>

      <button type="submit" style={{ marginTop: '10px' }}>Registrar</button>
    </form>
  );
}

export default FormularioVenta;