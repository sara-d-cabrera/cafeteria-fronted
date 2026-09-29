import React, { useEffect, useState } from 'react';
import { api } from '../api'; 
import EditarVenta from './EditarVenta';
function ListaVentas() {
const [ventas, setVentas] = useState([]);
const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
const cargarVentas = () => {
api.get('/ventas')
.then(res => setVentas(res.data))
.catch(err => console.error('Error al obtener ventas:', err));
};
useEffect(() => {
cargarVentas();
}, []);

const eliminarVenta = (id) => {
if (window.confirm('¿Seguro que deseas eliminar esta venta?')) {
api.delete(`/ventas/${id}`)
.then(res => {
alert(res.data.message);
cargarVentas(); // refrescar lista
})
.catch(err => console.error('Error al eliminar venta:', err));
}
};

return (
<div style={{
  fontFamily: 'Arial, sans-serif',
  padding: '30px',
  backgroundColor: '#f4f6f8',
  minHeight: '100vh'
}}>

<h2 style={{
  textAlign: 'center',
  color: '#333',
  marginBottom: '25px'
}}>
Ventas de la Cafetería
</h2>

<table border="1" style={{
  width: '90%',
  margin: 'auto',
  borderCollapse: 'collapse',
  backgroundColor: 'white',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
}}>

<thead>
<tr>
<th style={{
  backgroundColor: '#333',
  color: 'white',
  padding: '12px'
}}>Estudiante</th>

<th style={{
  backgroundColor: '#333',
  color: 'white',
  padding: '12px'
}}>Producto</th>

<th style={{
  backgroundColor: '#333',
  color: 'white',
  padding: '12px'
}}>Cantidad</th>

<th style={{
  backgroundColor: '#333',
  color: 'white',
  padding: '12px'
}}>Precio</th>

<th style={{
  backgroundColor: '#333',
  color: 'white',
  padding: '12px'
}}>Total</th>

<th style={{
  backgroundColor: '#333',
  color: 'white',
  padding: '12px'
}}>Fecha</th>

<th style={{
  backgroundColor: '#333',
  color: 'white',
  padding: '12px'
}}>Acciones</th>
</tr>
</thead>

<tbody>
{ventas.map(v => (
<tr key={v.id}>

<td style={{
  padding: '11px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd'
}}>{v.estudiante}</td>

<td style={{
  padding: '11px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd'
}}>{v.producto}</td>

<td style={{
  padding: '11px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd'
}}>{v.cantidad}</td>

<td style={{
  padding: '11px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd'
}}>${v.precio}</td>

<td style={{
  padding: '11px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd'
}}>${v.total}</td>

<td style={{
  padding: '11px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd'
}}>{v.fecha}</td>

<td style={{
  padding: '11px',
  textAlign: 'center',
  borderBottom: '1px solid #ddd'
}}>

<button
style={{
  padding: '8px 12px',
  margin: '3px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#333',
  color: 'white'
}}
onClick={() =>
setVentaSeleccionada(v)}>Editar</button>

<button
style={{
  padding: '8px 12px',
  margin: '3px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  backgroundColor: '#c0392b',
  color: 'white'
}}
onClick={() =>
eliminarVenta(v.id)}>Eliminar</button>

</td>
</tr>
))}
</tbody>
</table>

{ventaSeleccionada && (
<EditarVenta venta={ventaSeleccionada} onUpdate={cargarVentas} />
)}

</div>
);
}

export default ListaVentas;

