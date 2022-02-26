import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDog, getTemperament } from '../actions';


function validate(input){

    let errors = {};

    if(!input.name.trim()) {
        errors.name = 'Write a name, please'; 
    }else if(parseInt(input.name)){
        errors.name = 'Name is invalid, please write only letters'
    }   

    if(input.hmin < 0 || input.hmin > 100){
        errors.hmin = 'Require field, please write a valid number between 1 and 100'
    }
    if(input.hmax < 0 || input.hmax > 100){
        errors.hmax = 'Require field, please write a valid number between 1 and 100'
    }
    if(input.hmax < input.hmin){
        errors.hmin = 'The minimum value cannot be greater than the maximum value'
    }

    if(input.wmin < 0 || input.wmin > 100){
        errors.wmin = 'Require field, please write a valid number between 1 and 100'
    }
    if(input.wmax < 0 || input.wmax > 100){
        errors.wmax = 'Require field, please write a valid number between 1 and 100'    
    }
    if(input.wmax < input.wmin){
        errors.wmin = 'The minimum value cannot be greater than the maximum value'
    }

    if(input.lmin < 0 || input.lmin > 19){
        errors.lmin = 'Require field, please write a valid number between 1 and 19'
    }
    if(input.lmax < 0 || input.lmax > 19){
        errors.lmax = 'Require field, please write a valid number between 1 and 19'
    }
    if(input.lmax < 10 && input.lmax < input.lmin){
        errors.lmin = 'The minimum value cannot be greater than the maximum value'
    }
    return errors;
}



export default function DogCreate(){
    const dispatch = useDispatch()
    const navigate = useNavigate() //se usa para redirigir a alguna ruta //v de react reemplaza a useHistory
    const temperament = useSelector((state) => state.temperament) //me traigo el estado de temperament
    const [errors, setErrors] = useState({});
    //para el formulario
    const[input, setInput] = useState({

        name: '',
        image: '',
        height: '',
        weight: '',
        life_span: '',
        temperament: []

    });
/*
    const [input, SetInput] = useState({
        hmin: 0,
        hmax: 0,
        wmin: 0,
        wmax: 0,
        lmin: 0,
        lmax: 0,
    })
*/

function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value //name seria nombre, imagen, peso, etc; y value el valor de cada uno
    })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }));
    console.log(input)

} 
function handleSelectTemperament(e){
    setInput({
        ...input,
        temperament: [...input.temperament, e.target.value], //lo que ya había mas lo nuevo
    })
}

function handleSubmit(e){ //FORM
    e.preventDefault();
    console.log(input)
    dispatch(postDog(input))
    alert('Dog created 🐶')
    setInput({
        name: '',
        image: '',
        height: '',
        weight: '',
        life_span: '',
        temperament: []
    })
    navigate('/home') //cdo termine de crear el dog, q me redirija al home
}




//va cambiando con los inputs ingresados
//para renderizar los temperamentos
    useEffect(() => {
        dispatch(getTemperament());  
    }, [dispatch]);


    return (
       
        <div>
            <Link to= '/home'><button>HOME</button></Link>
            <h1>BE CREATIVE 🐾</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                <input className='input'
                    placeholder='Dog Name'
                    type= 'text'
                    value= {input.name}
                    name= 'name'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <input className='input'
                    placeholder='Image'
                    type= 'img'
                    value= {input.image}
                    name= 'image'
                    alt= 'not found'
                    onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <input className='input'
                    placeholder='Min height'
                    type= 'number'
                    value= {input.hmin}
                    name= 'hmin'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.hmin && (
                        <p className='error'>{errors.hmin}</p>
                    )}
                </div>
                <div>
                    <input className='input'
                    placeholder='Max height'
                    type= 'number'
                    value= {input.hmax}
                    name= 'hmax'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.hmax && (
                        <p className='error'>{errors.hmax}</p>
                    )}
                </div>
                <div>
                    <input className='input'
                    placeholder='Min weight'
                    type= 'number'
                    value= {input.wmin}
                    name= 'wmin'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.wmin && (
                        <p className='error'>{errors.wmin}</p>
                    )}
                </div>
                <div>
                    <input className='input'
                    placeholder='Max weight'
                    type= 'number'
                    value= {input.wmax}
                    name= 'wmax'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.wmax && (
                        <p className='error'>{errors.wmax}</p>
                    )}
                </div>
                <div>
                    <input className='input'
                    placeholder='Min life years'
                    type= 'number'
                    value= {input.lmin}
                    name= 'lmin'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.lmin && (
                        <p className='error'>{errors.lmin}</p>
                    )}
                </div>
                <div>
                    <input className='input'
                    placeholder='Max life years'
                    type= 'number'
                    value= {input.lmax}
                    name= 'lmax'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.lmax && (
                        <p className='error'>{errors.lmax}</p>
                    )}
                </div>
                <label className='temperament'> Temperaments </label>
                <select onChange={(e) => handleSelectTemperament(e)}>
                {temperament.map(t => (
                        <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                </select>
                <div>
                    <button className='create' type='submit'>CREATE</button>
                  
                </div>
            </form>
        </div>
        
    )
}  
 

