//-------------------------------------------------------- useContext --------------------------------------------------------------
import { useContext } from "react"
import { GlobalContext } from "../../context/AppContext"

const Paragrafo = () => {
    const theContext = useContext(GlobalContext)
    const {
        globalContextState: {
        body, conter
        },
        setContextState
    } = theContext
    return <p onClick={() => setContextState((s) =>  ({...s, conter: s.conter + 1}))}>{body}</p>
}

export default Paragrafo