import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';



async function getNewDogImageUrl() {
  const randomDog = await Axios.get('https://dog.ceo/api/breeds/image/random')

  return randomDog.data.message
}


function App() {

  const [dogImage, setDogImage] = useState('hi');

  const [isLoading, setIsLoading] = useState(false);

  const requestNewDog = useCallback(async () => {
    setIsLoading(true);
    const imageUrl = await getNewDogImageUrl()
    setDogImage(imageUrl);
    setIsLoading(false);
  }, [])

  useEffect(() => {
    requestNewDog();
  }, [requestNewDog]);

  return (
    <div className="App">
      <header className="App-header">
        {!isLoading && (
          <>
          <StarRatingComponent emptyStarColor="#e0e0e0"/>
         <img src={dogImage} className="App-logo" alt="logo" />
         <br />
         <br />
         <button className="button1" onClick={requestNewDog}>Get me a new Puppy!</button>
        </>
        )}
      </header>
    </div>
  );
}

export default App;
