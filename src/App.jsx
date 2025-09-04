import { useState } from "react"
import Calculadora from "./components/Calculadora"
import Header from "./components/Header"

function App() {

  // hook para atuaizar numero na tela
  const [resultado,setresultado] = useState(0)
 



  return (
    <>
     <Header/>
     <Calculadora/>
     
    </>
  )
}

export default App
