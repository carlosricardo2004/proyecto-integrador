import { useReducer, useState } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activity-reducers"
import ActivityList from "./components/ActivityList"
import Login from "./components/Login"

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState)
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Estado para autenticación

  // Función para manejar el login
  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  return (
    <>
      {!isAuthenticated ? (
        // Si no está autenticado, muestra el componente de login
        <Login onLogin={handleLogin} />
      ) : (
        // Si está autenticado, muestra la aplicación principal
        <>
      <header className="bg-gray-800 py-3">
        <div className="max-w-5x1 mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Proyecto integrador 
          </h1>
        </div>
      </header>
      <section className="bg-gray-700 py-20 px-5">
        <div className="max-w-4x1 mx-auto">
          <Form
            dispatch={dispatch}
            state = {state}
          />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4x1">
         <ActivityList
         activities = {state.activities}
         dispatch={dispatch}
         />
      </section>
    </>
  )}
  </>
)
}
export default App
