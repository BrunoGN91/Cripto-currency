import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Image from "./img/imagen-criptos.png";
import Formulario from './Components/Formulario'
import Result from './Components/Result'
import Spinner from './Components/Spinner'



const Imagen = styled.img`
max-width: 400px;
width: 80%;
margin: 100px auto 0 auto;
display: block;
`

const Contenedor = styled.div`
max-width: 900px;
margin: 0 auto;
width: 90%;

@media (min-width: 992px) {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 2rem
}
`

const Heading = styled.h1`
font-family: 'Lato', sans-serif;
color: #FFF;
text-align: center;
font-weight: 700;
margin-top: 80px;
margin-bottom: 50px;
font-size:34px;

&::after {
  content: '';
  width: 300px;
  height: 1px;
  background-color: #66a2fe;
  display: block;
  margin: 10px auto 0 auto
}
`

const App = () => {


  const [monedas, setMonedas] = useState({})
  const [cotizacion, setCotizacion] = useState({})
  const [cargando, setCargando] = useState(false)




  useEffect(() => {
    if(Object.keys(monedas).length > 0) {
      
       const cotizarCripto = async () => {
         setCargando(true)
         setCotizacion({})

         const { moneda, criptoMoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
        const data = await fetch(url)
        const result = await data.json()
        setCotizacion(result.DISPLAY[criptoMoneda][moneda])
       }
      
       cotizarCripto()
       setTimeout(() => setCargando(false), 300)
    }
  }, [monedas])

  return (
    <>
    <Contenedor>
    
      <Imagen
      src={Image}
      alt="Imagenes criptomonedas"
      />
      <div>
    <Heading>Cotiza Criptomonedas al Instante</Heading>
    <Formulario
    setMonedas={setMonedas}
    />
    {cargando ? <Spinner/> : ''}
    {cotizacion.PRICE && <Result cotizacion={cotizacion}/>}
      </div>
    </Contenedor>
    </>
  )
}

export default App
