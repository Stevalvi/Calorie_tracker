import { Dispatch, ReactNode, createContext, useMemo, useReducer } from "react";
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/activity-reducer";
import { categories } from "../data/categories";
import { Activity } from "../types";

type ActivityProviderProps = {
    children: ReactNode // Va a ser de tipo ReactNode
}

type ActivityContextProps = { // Este type tiene que coincidir con lo que estamos retornando en el ActivityContext.Provider
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesBurned: number
    netCalories: number
    categoryName: (category: Activity['category']) => string[]
    isEmptyActivities: boolean
}

export const ActivityContext = createContext<ActivityContextProps>(null!) // Le pasamos nuestro context

export const ActivityProvider = ({children} : ActivityProviderProps) => { // Le decimos que tiene que tener esos props de ActivityProviderProps

    const [state, dispatch] = useReducer(activityReducer, initialState) // Ya sabemos que ese reducer toma el reducer y el state inicial como parámetros

    // Contadores
    // Usamos el state. para que tome el state del reducer y no tome el state que se le había pasado por via props
    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [state.activities])

    const caloriesBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [state.activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [state.activities])
    
    const categoryName = useMemo(() => 
        (category: Activity['category']) => categories.map( cat => cat.id === category ? cat.name : '' )
    , [state.activities])

    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])


    return ( // Dos veces llaves porque es un objeto lo que retornamos, todo esto toma children porque son los hijos del componente, y como ese children es de tipo any le asignamos un valor arriba. 
        <ActivityContext.Provider value={{ 
            state,
            dispatch,
            caloriesConsumed,
            caloriesBurned,
            netCalories,
            categoryName,
            isEmptyActivities
        }}>
            {children}
        </ActivityContext.Provider>
    )
}