import React from 'react';
import config from './config';


export default class Adopt extends React.Component {
  state = {
    allCats: [],
    allDogs: [],
    currentCat: {},
    currentDog: {},
    placeInLine: 1,
    peopleInLine: [],
  }

  componentDidMount() {
    this.getCats();
    this.getDogs();
    this.getLine();
  }

  //Get statement to get LIST of cats
  getCats = () => {
    const URL = `${config.REACT_APP_API_ENDPOINT}api/cats`;
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(cats => {
        this.setState({
          allCats: cats,
        });
      })
      .then(e => { this.setCurrentCat(); })
      .catch(err => {
        throw err;
      });
  };

  //Get statement to get LIST of dogs
  getDogs = () => {
    const URL = `${config.REACT_APP_API_ENDPOINT}api/dogs`;
    fetch(URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(dogs => {
        this.setState({
          allDogs: dogs,
        });
      })
      .then(e => { this.setCurrentDog(); })
      .catch(err => {
        throw err;
      });
  }

  //Get Statement to get LIST of people
  getLine = () => {
    console.log('getLine reached');
    const events = new EventSource(`${config.REACT_APP_API_ENDPOINT}api/updateEvent`);
    events.addEventListener('message', (event) => {
      // console.log('message', event.data);
      const people = JSON.parse(event.data);
      // console.log('people is', people);
      this.setState({
        peopleInLine: people,
      });
    })
    events.addEventListener('open', (e) => {
      console.log('eventsource opened', e);
      console.log('eventsource opened data', e.data);
    })
    events.onerror = (e) => {
      console.log('eventsource error', e)
      console.log('eventsource opened error', e.data);
    };
  }

  // getLine = () => {
  //   const URL = `${config.REACT_APP_API_ENDPOINT}api/humans`;
  //   fetch(URL)
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error(res.statusText);
  //       }
  //       return res.json();
  //     })
  //     .then(people => {
  //       console.log('people is', people);
  //       this.setState({
  //         peopleInLine: people,
  //       });
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       throw err;
  //     })
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = e.target;
    console.log('name is', name);
    const URL = `${config.REACT_APP_API_ENDPOINT}api/humans`;
    return fetch(URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name.value })
    })
      .then((res) => {
        return this.getLine();
      });
  }

  //Delete statements for cats and dogs
  deleteCat = () => {
    const URL = `${config.REACT_APP_API_ENDPOINT}api/cats`;
    return fetch(URL, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(() => {
        return this.getCats();
      });
  }
  deleteDog = () => {
    const URL = `${config.REACT_APP_API_ENDPOINT}api/dogs`;
    return fetch(URL, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(() => {
        return this.getDogs();
      });
  }

  // Function to delete people from line



  //Functions to reset the current pets after
  //the last one was adopted or at first load


  setCurrentCat = () => {
    this.setState({
      currentCat: this.state.allCats[0],
    })
  }
  setCurrentDog = () => {
    this.setState({
      currentDog: this.state.allDogs[0],
    });
  }
  setCurrentPlace = () => {
    const position = '';
    for (let i = 0; i < this.state.peopleInLine.length; i++) {
      if (this.state.peopleInLine[i] === 'You') {
        position.concat(i + 1);
        console.log(this.state.peopleInLine[i]);
      }
    }
    this.setState({
      placeInLine: position
    })
  }
  // <img src={this.state.currentDog.imageURL} className="petPicture" alt={this.state.currentCat.imageDescription}></img>
  //  <img src={this.state.currentDog.imageURL} className="petPicture" alt={this.state.currentCat.imageDescription}></img>

  autoChoosePet = () => {
    let randomNames = ['Robot the dog', 'Squirrel the cat', 'Bowser the dog', 'Simba the cat', 'Snickers the cat', 'Spider the cat', 'Mortimer the dog', 'Squeeze the dog', 'Sunny the cat', 'Nero the dog', 'Zero the dog'];
    let randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    console.log('randomname is', randomName)
    return `${randomName}`;
  }

  render() {
    return (
      <section id='adoptContainer'>
        <div id='petContainers'>
          <section className='petDisplay' id='catDisplay'>
            <h3>{this.state.currentCat.name}</h3>
            <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCzlHLJKr26CEObJqwo8Tv4uWIurtQV7ox_CJytmjr35zvmQS2g&s'} className="petPicture" alt={this.state.currentCat.imageDescription}></img>
            <li>sex: {this.state.currentCat.sex} </li>
            <li>age: {this.state.currentCat.age}</li>
            <li>breed: {this.state.currentCat.breed} </li>
            <li>story: {this.state.currentCat.story}</li>
            {this.state.placeInLine === 1 && <button id='adoptCat' onClick={this.deleteCat} >Adopt me!</button>}
          </section>
          <section className='petDisplay' id='dogDisplay'>
            <h3>{this.state.currentDog.name}</h3>
            <img src={'https://www.publicdomainpictures.net/pictures/160000/nahled/maine-coon-cat.jpg'} className="petPicture" alt={this.state.currentCat.imageDescription}></img>
            <li>sex: {this.state.currentDog.sex} </li>
            <li>age: {this.state.currentDog.age}</li>
            <li>breed: {this.state.currentDog.breed} </li>
            <li>story: {this.state.currentDog.story}</li>
            {this.state.placeInLine === 1 && <button id='adoptDog' onClick={this.deleteDog} >Adopt Me!</button>}
          </section>
        </div>
        <section id='getInLineFormContainer'>
          <form id='getInLine'
            onSubmit={this.handleSubmit}>
            <label htmlFor='lineUp'>
              Enter your name to get in line <br />
            </label>
            <input
              type='text'
              name='name'
              id='lineUpInput'
              placeholder='first name'>
            </input>
            <button
              type='submit'
              id='lineUpButton'>
              Line up!
            </button>
          </form>
        </section>

        <section className='userLine'>
          <p>You are currently number <span id='yellow'>{this.state.placeInLine}</span> in line.</p>
          <p>People currently in line to adopt:</p>
          <p id='lineOfPeople'>
            {
              this.state.peopleInLine.map((person) => {
                return <p>{person.name}</p>;
              })
            }
          </p>
          <p id='adoptionPairs'>Recent adoptions:</p>
          <p>{this.state.peopleInLine[0]} took {this.autoChoosePet()} home.</p>

        </section>
      </section >
    )
  }
}
