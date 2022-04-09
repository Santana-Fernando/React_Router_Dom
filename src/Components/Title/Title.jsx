//-------------------------------------------------------- useContext --------------------------------------------------------------
import React, { useContext } from "react"
import { GlobalContext } from "../../context/AppContext"

const Title = ({ children }) => {

    const theContext = useContext(GlobalContext)
    const {
        globalContextState: {
        title, conter
        }
    } = theContext
    return <h1>{title} {conter}</h1>
}

export default Title