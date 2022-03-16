import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../Hooks/useSelectMonedas'
import  { monedas }  from '../data/Monedas'
import Error from './Error'

const InputSubmit = styled.input`
background-color: #9497ff;
border: none;
padding: 10px;
width: 100%;
color: #FFF;
font-weight: 700;
font-size: 20px;
border-radius: 5px;
text-transform: uppercase;
cursor:pointer;
transition: background-color .3s ease;
&:hover {
    background-color: #7a7dfe;

}

`

const API_ENDPOINT = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=ARS`

const Formulario = ({setMonedas}) => {

  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)



  const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas)
  const [ criptoMoneda, SelectCriptoMoneda ] = useSelectMonedas('Elige tu cripto', criptos)
   


useEffect( () => {
  const fetchApi = async function() {
    try {
      const data = await fetch(API_ENDPOINT)
      const dataResult = await data.json()
      

      const arrayCriptos = dataResult.Data.map(cripto => {

        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
       return objeto
      })
      console.log(arrayCriptos);
      setCriptos(arrayCriptos)
    }
   catch (e) {
    console.log("error");
  }
  
}
  
  fetchApi()
},[])

const handleSubmit = (e) => {
  e.preventDefault()

  if([moneda, criptoMoneda].includes('')){
    setError(true)
    return;
  } 
  setError(false)
  setMonedas({moneda, criptoMoneda})
}

  return (
    <form
    onSubmit={handleSubmit}
    >
      { error && <Error>Debes seleccionar una moneda y una cripto</Error>}
        <SelectMonedas/>
        <SelectCriptoMoneda/>
        <InputSubmit type="submit" value="cotizar"/>
    </form>
  )
}

export default Formulario