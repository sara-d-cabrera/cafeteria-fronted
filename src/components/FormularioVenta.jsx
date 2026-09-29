import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FormularioVenta() {
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
axios.get('http://localhost:3000/estudiantes')
.then(res => setEstudiantes(res.data))
.catch(err => console.error(err));

axios.get('http://localhost:3000/productos')
.then(res => setProductos(res.data))
.catch(err => console.error(err));
}, []);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = (e) => {
e.preventDefault();
axios.post('http://localhost:3000/ventas', formData)
.then(res => {
alert(res.data.message);
setFormData({ estudiante_id: '', producto_id: '', cantidad: '',
fecha: '' });
})
.catch(err => console.error('Error al registrar venta:', err));
};

return (
<div style={{
background:'#f5f5fa',
minHeight:'100vh',
padding:'40px',
fontFamily:'Arial'
}}>

<div style={{
background:'#fff',
maxWidth:'500px',
margin:'auto',
padding:'35px',
borderRadius:'16px',
boxShadow:'0 8px 25px #ccc'
}}>

<h2 style={{
textAlign:'center',
color:'#4b3fc7',
marginBottom:'30px'
}}>
🛒 Registrar Nueva Venta
</h2>

<form onSubmit={handleSubmit} style={{
display:'flex',
flexDirection:'column',
gap:'18px'
}}>

<select
name="estudiante_id"
value={formData.estudiante_id}
onChange={handleChange}
required
style={{
padding:'13px',
border:'1px solid #ccc',
borderRadius:'8px',
fontSize:'15px',
color:'#333',
background:'#fff'
}}>
<option value="">Seleccione estudiante</option>
{estudiantes.map(e => (
<option key={e.id} value={e.id}>{e.nombre} -
{e.grupo}</option>
))}
</select>

<select
name="producto_id"
value={formData.producto_id}
onChange={handleChange}
required
style={{
padding:'13px',
border:'1px solid #ccc',
borderRadius:'8px',
fontSize:'15px',
color:'#333',
background:'#fff'
}}>
<option value="">Seleccione producto</option>
{productos.map(p => (
<option key={p.id} value={p.id}>{p.nombre} -
${p.precio}</option>
))}
</select>

<input
type="number"
name="cantidad"
placeholder="Cantidad"
value={formData.cantidad}
onChange={handleChange}
required
style={{
padding:'13px',
border:'1px solid #ccc',
borderRadius:'8px',
fontSize:'15px',
color:'#333'
}}
/>

<input
type="date"
name="fecha"
value={formData.fecha}
onChange={handleChange}
required
style={{
padding:'13px',
border:'1px solid #ccc',
borderRadius:'8px',
fontSize:'15px',
color:'#333'
}}
/>

<button
type="submit"
style={{
background:'#5b4bdb',
color:'#fff',
border:'none',
padding:'13px',
borderRadius:'8px',
fontSize:'16px',
fontWeight:'bold',
cursor:'pointer'
}}>
Registrar Venta
</button>

</form>

</div>
</div>
);
}

export default FormularioVenta;