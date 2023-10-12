// https://stackoverflow.com/questions/52138767/react-api-how-to-parse-and-map-an-array-inside-of-api-response

// https://apilist.fun/api/cats
// https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR
// https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t

import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const API_URL = 'https://api.thecatapi.com/v1/images/search?'
const API_KEY = 'live_1MsEjGuVZWkRnZCP2yfgTFsZk702IS191Zgiw9dJNJRfeEdgsiDgF4S3bgn3JXjK'

function App() {
    const [amount, setAmount] = useState(5)
  
    const numbers = new Array(100).fill(null).map((_,i) => i+1);
    const [data, setData] = useState([])
    const [names, setNames] = useState([])
    const address = API_URL + 'limit=' + amount + '&has_breeds=1' + '&api_key=' + API_KEY;

    function fetchPics() {
      axios.get(address).then((response) => {
        setData(response.data)  
      }).catch((error) => {
        alert(error)
      })
    }
  
    return(
        <div className='p-5 container-fluid'>
          <div className='header text-center'>
            <h1>Kissakuvia!</h1>
          </div>      
            <div className='d-flex flex-wrap justify-content-center align-items-center kuvia'>
              <label className = 'm-2'>
                Montako haluat?
              </label>
              <select className='m-2' defaultValue={amount} onChange={e => setAmount(e.target.value)}>
                {
                  numbers.map(number => (
                    <option value={number}>{number} kpl</option>
                  ))
                }
              </select>
              <button type='button' className='btn btn-info m-2' onClick={(fetchPics)}>Hajeppa kuvia</button>
            </div>
          <div className='d-flex flex-wrap mb-3 justify-content-center'>
          {data.map(d => (
            <div className='card m-2 bg-secondary'>
              <img className='p-2 rounded card-img-top' alt='kissakuva' src={d.url} />
              <div className='m-2 p-2 bg-light rounded card-text text-center'>            
                <a href={d.breeds[0].wikipedia_url} target='#'>{d.breeds[0].name}</a>
                <p><b>Alkuperämaa:</b> {d.breeds[0].origin}</p>           
              </div>
            </div>
          ))}
          </div>
        </div>
    ) 
 }
 
export default App;