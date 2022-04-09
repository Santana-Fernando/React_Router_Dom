//-------------------------------------------------------- useContext --------------------------------------------------------------
import React, { useContext } from "react"
import Paragrafo from "../Paragrafo/Paragrafo"
import Title from "../Title/Title"

const Body = ({ children }) => {
    return (
        <>
            <Title/>
            <Paragrafo/>
        </>
    )
}

export default Body