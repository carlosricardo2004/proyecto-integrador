import { useEffect } from "react";

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/api/estacionamiento");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error al obtener datos:", error);
  }
}

export default function SomeComponent() {
  useEffect(() => {
    fetchData();
  }, []);

  return <div>Consulta realizada (ver consola)</div>;
}