import React, { useState } from "react"

function Login({ onLogin }: { onLogin: () => void }) {
  const [usuario, setUsuario] = useState("")
  const [contrasena, setContrasena] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    
    // Aquí puedes agregar lógica de autenticación básica

    if (usuario === "Gabo" && contrasena === "123")
      {
      onLogin() // El usuario ha iniciado sesión correctamente
    } else {
      alert("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  )
}

export default Login
