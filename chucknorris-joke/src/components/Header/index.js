import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {   
    Grid,
    GridItem,
    Container,    
    FormControl,
    FormLabel,
    Select
} from '@chakra-ui/react'
import Logo from '../../assets/logo.jpg';
import api from '../../services/api';

const Header = () => {
    const [main, setMain] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('categories').then(
            response => {
                setMain(response.data)
            }
        )
    }, [])
    const handleCategory = (e) => {       
        navigate(`/categories/${e.target.value}`)
    }
    return(
        <nav>   
            <Container maxW="container.xl">
                <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                    <GridItem colStart={1} colEnd={4}>
                        <Link to ='/'>        
                            <img src={Logo} className="logo" alt ="Logo"/>
                        </Link>
                    </GridItem>
                    <FormControl>
                        <FormLabel>Selecione a categoria da piada </FormLabel>
                        <Select onChange={ handleCategory }>                        
                            {main?.map( (item, index) => (                                
                                <option key={index} value={item}> {item} </option>   
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
           </Container>
        </nav>
    )
}

export default Header;