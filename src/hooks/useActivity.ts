import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

// Acá vamos a tener nuestro custom hook useActivity, para acceder a lo que tenemos en ActivityContext, esto para hacer más sencillo importar state y dispatch en los demás componentes, importamos este hook en los otros componentes cada vez que vayamos a usar state y dispatch y de esa forma accedemos a ellos y nos ahorramos trabajo.

export const useActivity = () => {
    const context = useContext(ActivityContext)
    if(!context) { // Si no está siendo llamado desde un context mostramos el error, es decir, tiene que ser utilizado dentro de ese <ActivityContext.Provider, y no puede ser utilizado por fuera porque si no se perdería esa referencia.
        throw new Error('el hook useActivity debe ser utilizado en un ActivityProvider')
    }
    return context
}