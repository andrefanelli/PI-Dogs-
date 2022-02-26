import React from 'react';
import './pagination.css'




export default function Pagination({dogsPerPage, allDogs, pagination}) {
    const pageNumbers = [] //declaro arreglo vacio

    for (let i = 0; i <=Math.ceil(allDogs/dogsPerPage); i++) { //todos los perros dividido perros por pagina
        pageNumbers.push(i+1)  //pusheo en el arreglo
    }
    return (
        <nav>
            <div className='pagination_container'> 
                { pageNumbers && pageNumbers.map(number => (
                     <a key={number} href onClick={() => pagination(number)}>{number}</a>
                ))}
            </div>

        </nav>
    )

    
}