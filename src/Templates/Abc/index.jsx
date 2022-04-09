import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

export const Abc = () => {
    const params = useParams()
    const location = useLocation()
    const history = useNavigate()

    console.log(params)
    console.log(location)
    
    useEffect(() => {
        setTimeout(function () {
            history('/')
        }, 2000)
    }, [history])

    return (
        <h1> tu joga pra trás tu encosta encosta {params['*']}</h1>
    )
}