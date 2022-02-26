import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'; //hooks
import { getDogs, getTemperament, filterDogsByTemperament, filterCreated, orderByName } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Pagination from './Pagination';
import Loader from './Loader';
import SearchBar from './SearchBar';
import './home.css'


export default function Home(){  //todo lo de abajo sería como hacer un mapStateToProps
    const dispatch = useDispatch() 
    const allDogs = useSelector((state) => state.dogs) //me lo trae del reducer
    const allTemperament = useSelector((state) => state.temperament)
//Paginado: un estado con la pag actual y un estado que me setee la pag actual    
    const[currentPage, setCurrentPage] = useState(1) //use State xq es un estado local. Es 1 xq siempre voy a arrancar en la 1er pag
    const[dogsPerPage, setDogsPerPage] = useState(8)
    const [order, setOrder] = useState('')

    const indexOfLastDog = currentPage * dogsPerPage // 1 * 8 = 8   mas que un index se refiere a cantidad
    const indexOfFirstDog = indexOfLastDog - dogsPerPage // 8 - 8 = 0
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    // pag 1 -----------0--------------8
    // pag 2 -----------9--------------17

    const pagination = (pageNumber) => { //esto va a ser en renderizado
      setCurrentPage(pageNumber)    // setear la pag en ese numero de pagina
    }

 //traemos del estado los dogs cdo el componente se monta


 useEffect (() => {
     dispatch(getTemperament());
 }, [dispatch]);

 useEffect (()=> {
    dispatch(getDogs());
}, [dispatch]);

if(!allDogs.length) {
   return <Loader/>;
}

 function handleClick(e){ //e es evento
     e.preventDefault();
     dispatch(getDogs()); //me lo resetea
 }

 function handleFilterTemperament(e){
     e.preventDefault();
     dispatch(filterDogsByTemperament(e.target.value));
     setCurrentPage(1);
     setOrder(e.target.value)
};

 function handleFilterCreated(e){
     e.preventDefault();
     dispatch(filterCreated(e.target.value));//el payload
     setCurrentPage(1);
     setOrder(e.target.value);
};

 function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));//el payload
    setCurrentPage(1); //seteo la pag actual 1
    setOrder(e.target.value);//aca se setea el ordenamiento
 }

 
 return (
     <div>
         <Link to= '/dog'>Create Dog</Link>
         <button onClick={e=> {handleClick(e)}}>Reload Dogs</button>
         <div>
             <select onClick={e=> {handleSort(e)}}>
                 <option value='Asc'>A-Z</option>
                 <option value='Desc'>Z-A</option>
             </select>
             <select onChange={(e) => handleFilterTemperament(e)}>
                 <option>Temperament</option>
                 <option value='All'>All</option>

                 {allTemperament.map((temperament) => (
                     <option key={temperament.name} value={temperament.name}>
                     {temperament.name}
                 </option>
                 ))}
             </select>

             <select>
                 <option>Weight</option>
             </select>
             <select onChange={(e) => handleFilterCreated(e)}>
                 <option>All Dogs</option>
                 <option value='All'>All</option>
                 <option value='Created'>Created</option>
                 <option value='Api'>Existent</option>
             </select>

            <SearchBar/> 
            
            <Pagination
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            pagination={pagination}
            />
         <ul className='card_grid'>
            {currentDogs?.map((el) => {
                return (
                   <Link to={'/home/' + el.id}>
                     <Card
                        id={el.id}
                        name={el.name}
                        image={el.image}
                        temperament={el.temperament}
                        key={el.id}
                        weight={el.weight}
                    />
                    </Link> 
                    );
                  })}
         </ul>
        
           

         </div>

     </div>
 )
}

