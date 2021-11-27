import React, {useEffect, useState} from 'react';
import api from '../../services/api'
import Loader from '../../assets/loader.gif';
import {
  FormLabel,
  Input,
  Button

} from '@chakra-ui/react';

const App = () => {
  const [data, setData] = useState({});
  const [allJokes, setAllJokes] = useState({});
  const [isSearch, setIsSearch] = useState(false); 
  const [isLoad, setIsLoad] = useState(false); 
  const [searchJoke, setSearchJoke] = useState('');  

  useEffect(() => { //Responsável por iniciar o ciclo de vida, no array é o que ele vai observar na estrutura
    setIsLoad(true); 
    api.get('random').then(
       response => {
        setData(response.data)
      }
     )
     .catch( e => console.error(e))
     .finally(() => setTimeout(() => {
      setIsLoad(false)
     },2500))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoad(true)
    api.get(`search?query=${searchJoke}`).then(
      response => {
        setIsSearch(true)
        setAllJokes(response.data)
      }
    ).catch(e => console.error(e))
    .finally(() => setIsLoad(false))
  }

  if (isLoad){
    return(
      <div className="loader">
        <img src={Loader} alt="Loader"/>
      </div>
    )
  }

  return(
    <div className="home-component">
      <h1>Joke </h1>
      <div>
        <form onSubmit={handleSubmit}> 
          <FormLabel>Pesquise sua piada </FormLabel>
          <Input type="text" onChange={e => setSearchJoke(e.target.value)} />
          <Button type="submit" colorScheme="blue">Pesquisar</Button>
        </form>
      </div>
      { !isSearch ? (
        <div className="jokes">
          <img src={data?.icon_url} alt={data?.icon_url} />
          <h3>{data?.value}</h3>          
        </div>
      ) : (
        <>
        { allJokes?.result.map((item , index) => (
          <div key={index} className="jokes">
            <img src={item?.icon_url} alt={item?.icon_url} />
            <h3>{item?.value}</h3>          
          </div>
        ))}
        </>
      )}
    </div>
  )
}

export default App