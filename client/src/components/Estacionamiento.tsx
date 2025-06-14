// components/Estacionamiento.tsx
import { useEffect, useState } from "react";

type Estacionamiento = {
  id: number;
  nombre: string;
  contrasenia: string;
  // agrega los campos que necesites
};

export default function EstacionamientoComponent() {
  const [datos, setDatos] = useState<Estacionamiento[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/estacionamiento")
      .then((res) => res.json())
      .then((data) => setDatos(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Registros del estacionamiento</h2>
      <ul>
        {datos.map((item) => (
          <li key={item.id}>{item.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
