<<<<<<< HEAD
import { useEffect, useMemo } from 'react'
import Form from "./components/Form"
import ActivityList from './components/ActivityList'
import CalorieTracker from './components/CalorieTracker'
import { useActivity } from './hooks/useActivity'

function App() {

    const { state, dispatch } = useActivity()

    useEffect(() => {
        localStorage.setItem('activities', JSON.stringify(state.activities))
    }, [state.activities])

    const canRestartApp = () => useMemo(() => state.activities.length, [state.activities])
    
    return (
        <>
            <header className="bg-lime-600 py-3">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-center text-lg font-bold text-white uppercase">
                        Contador de Calorias
                    </h1>

                    <button
                        className='bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10'
                        disabled={!canRestartApp()}
                        onClick={() => dispatch({type: 'restart-app'})}
                    >
                        Reiniciar App
                    </button>
                </div>
            </header>

            <section className="bg-lime-500 py-20 px-5">
                <div className="max-w-4xl mx-auto">
                    <Form  />
                </div>
            </section>

            <section className='bg-gray-800 py-10'>
                <div className='max-w-4xl mx-auto'>
                    <CalorieTracker />
                </div>
            </section>

            <section className="p-10 mx-auto max-w-4xl">
                <ActivityList  />
            </section>
        </>
    )
=======
import { useEffect, useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"

function App() {  
  const { state } = useBudget() // Importamos el custom hook de useBudget para poder usar ese state. Y como es un hook se debe retornar un objeto a diferencia de como lo hacíamos en otros proyecots anteriores que era como un arreglo.
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]) // Creamos una función para validar ese presupuesto, cada vez que cambie ese state.budget ejecutamos esa función de isValidBudget

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString()) // Como localStorage no acepta numbers lo convertimos a string para almacenarlo en localStorage
    localStorage.setItem('expenses', JSON.stringify(state.expenses)) // Convertimos ese arreglo a string
  }, [state]) // Escuchamos por todos los cambios en el state para que a medida que cambien los gastos o presupuestos se almacene en ese localStorage y se graben.
  
  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-white">
          Planificador de Gastos
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
          {isValidBudget ? <BudgetTracker />  : <BudgetForm />} 
      </div> 

      {isValidBudget && ( // Esto va a crear la ventana modal para registrar o agregar gastos, y agregamos como validación que si se cumplió esa función de isValidBudget se muestren estos componentes
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )} 
    </>
  ) // En caso de que isValidBudget se cumpla, renderizamos el componente de tracker, caso contrario, lo renderizamos al componente que le pide registrar un presupuesto
>>>>>>> fd2db7aa0d80b17efc9e1899ef479beff79a437c
}

export default App
