import styled from "@emotion/styled"

const Resultado = styled.div`
color:  #FFF;
font-family: 'Lato', sans-serif;
display: flex;
align-items: center;
gap: 2rem;
margin-top: 30px;
`

const Texto = styled.p`
font-size: 18px;
span{
    font-weight: 700
}
`

const Price = styled.p`
font-size: 24px;

span{font-weight: 700}
`

const Imagen = styled.img`
width: 120px;
display: block;
`

const Result = ({cotizacion}) => {

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = cotizacion

  return (
   <>
    <Resultado>
        <Imagen 
        src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen cripto" />
        <div>
        <Price>El precio es de <span>{PRICE}</span></Price>
        <Texto>El precio más alto del día es de <span>{HIGHDAY}</span></Texto>
        <Texto>El precio más bajo del día es de <span>{LOWDAY}</span></Texto>
        <Texto>Variación en las últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
        <Texto>Ultima actualización: <span>{LASTUPDATE}</span></Texto>
        </div>
    </Resultado>
   </>
  )
}

export default Result