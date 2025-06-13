import { categories } from "../data/categories"
import { Activity } from "../types"
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { ActivityActions, ActivityState } from "../reducers/activity-reducers"
import {v4 as uuidv4} from 'uuid'

type FormProps ={
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

const initialState: Activity={
  id: uuidv4(),
  category: 1,
  name:'',
  calories:0
}

export default function Form({dispatch, state}: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    useEffect(()=> {
      if(state.activeId){
        const selectActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
        setActivity(selectActivity)
      }
    }, [state.activeId])

    
    const handleChange =(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> )=> {
      const isNumberFiel = ['categoty', 'calories'].includes(e.target.id)
      setActivity({
        ...activity,
        [e.target.id]: isNumberFiel ? +e.target.value :  e.target.value
      })
      console.log(e.target.id)
      console.log(e.target.value)
    }
    const isValidActivity = () => {
      const {name, calories} = activity
      return name.trim() !== '' && calories > 0
    }
    const handleSubmit=(e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch({ type: "save-activity", payload: { newActivity: activity }})

        setActivity({
          ...initialState,
        id:uuidv4()
    })
    }
    return (
      <>
        <header className="bg-gray-800 py-3">
          <div className="max-w-5x1 mx-auto flex justify-between">
            <h1 className="text-center text-lg font-bold text-white uppercase">
              Sistema de estacionamiento
            </h1>
          </div>
        </header>
        <section className="bg-gray-700 py-20 px-5">
          <div className="max-w-4x1 mx-auto">
            <form
              className="space-y-5 bg-white shadow p-10 rounded-lg"
                onSubmit={handleSubmit}
              >
              <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category">Tipo de servicio </label>
                <select
                  className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                  id="category"
                  value={activity.category}
                  onChange={handleChange}
                  >
                    {categories.map(category=>(
                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <label htmlFor="activity" className="font-bold">Automovil</label>
                <input
                  id="name"
                  type="text"
                  className="border border-slate-300 p-2 rounded-lg"
                  placeholder="Carro,Taxi, Camioneta, Moto"
                  value={activity.name}
                  onChange={handleChange}
                  />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <label htmlFor="activity" className="font-bold">Precio:</label>
                <input 
                  id="calories"
                  type="number"
                  className="border border-slate-300 p-2 rounded-lg"
                  placeholder="Calorias. Ej. 300 o 500"
                  value={activity.calories}
                  onChange={handleChange}
                />
                <input 
                  type="submit"
                  className="bg-gray-800 hover:gb-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                  value={activity.category === 1 ? 'Guardar automovil ' : 'Guardar automovil'}
                  disabled={!isValidActivity()}
                />
              </div>
              
              </form>
          </div>
        </section>
      </>
    )
}
  
  
