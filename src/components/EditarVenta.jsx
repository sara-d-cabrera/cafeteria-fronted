import React, { useState, useEffect } from 'react';
import { api } from '../api'; // Usamos la instancia centralizada de Axios

function EditarVenta({ venta, onUpdate }) {
  const [formData, setFormData] = useState({
    estudiante_id: venta.estudiante_id,
    producto_id: venta.producto_id,
    cantidad: venta.cantidad,
    fecha: venta.fecha
  });

  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

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
    api.put(`/ventas/${venta.id}`, formData)
      .then(res => {
        alert(res.data.message || 'Venta actualizada correctamente');
        onUpdate(); // Refresca la lista de ventas
      })
      .catch(err => console.error('Error al actualizar venta:', err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '8px' }}>
      <h3>Editar Venta</h3>

      <div>
        <label>Estudiante: </label>
        <select 
          name="estudiante_id" 
          value={formData.estudiante_id}
          onChange={handleChange} 
          required
        >
          <option value="">Seleccione un estudiante</option>
          {Array.isArray(estudiantes) && estudiantes.map(e => (
            <option key={e.id} value={e.id}>{e.nombre} - {e.grupo}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Producto: </label>
        <select 
          name="producto_id" 
          value={formData.producto_id}
          onChange={handleChange} 
          required
        >
          <option value="">Seleccione un producto</option>
          {Array.isArray(productos) && productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Cantidad: </label>
        <input 
          type="number" 
          name="cantidad" 
          value={formData.cantidad}
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Fecha: </label>
        <input 
          type="date" 
          name="fecha" 
          value={formData.fecha}
          onChange={handleChange} 
          required 
        />
      </div>

      <button type="submit" style={{ marginTop: '10px' }}>Actualizar Venta</button>
    </form>
  );
}

export default EditarVenta;