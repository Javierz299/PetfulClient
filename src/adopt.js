import React from 'react';
import config from './config';


export default class Adopt extends React.Component {
  state = {
    allCats: [],
    allDogs: [],
    currentCat: {},
    currentDog: {},
    peopleInLine: [],
    adoptionsPets: [],
    adoptersHumans: [],
    myTurn: false
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
        console.log("server gave us all dogs:", dogs)
        this.setState({
          allDogs: dogs,
        });
      })
      .then(e => { this.setCurrentDog(); })
      .catch(err => {
        console.error("error with getting all dogs", err)
        throw err;
      });
  }

  //Get Statement to get LIST of people
  getLine = () => {
    console.log('getLine reached');
    const events = new EventSource(`${config.REACT_APP_API_ENDPOINT}api/updateEvent`);
    events.addEventListener('message', (event) => {
      console.log('message', event.data);
      const people = JSON.parse(event.data);
      console.log('people is', people);
      this.setState({
        peopleInLine: people.humans,
        myTurn: people.isItYourTurn
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

  // enqueue the user into adoption line 
  handleSubmit = (e) => {
    e.preventDefault();
    const { name } = e.target;

    console.log('name is', name.value);
    const URL = `${config.REACT_APP_API_ENDPOINT}api/humans`;
    return fetch(URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name.value,
        followUser: true
      })
    })
      .then(res => res.json())
      .then((list) => {
        console.log('list is', list);
        this.setState({
          peopleInLine: list
        })
        return this.getLine();
      });
  }

  // Dequeue cats, dogs, humans after a successful adoption
  deleteCat = () => {
    const URL = `${config.REACT_APP_API_ENDPOINT}api/cats`;
    return fetch(URL, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((adoptedPetInfo) => {
        this.setState({
          adoptionsPets: [...this.state.adoptionsPets, adoptedPetInfo.name]
        });
        this.deleteHuman();
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
      .then((res) => res.json())
      .then((adoptedPetInfo) => {
        this.setState({
          adoptionsPets: [...this.state.adoptionsPets, adoptedPetInfo.name]
        });
        this.deleteHuman();
        return this.getDogs();
      });
  }

  deleteHuman = () => {
    const URL = `${config.REACT_APP_API_ENDPOINT}api/humans`;
    return fetch(URL, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((res) => res.json())
      .then((adopter) => {
        this.setState({
          adoptersHumans: [...this.state.adoptersHumans, adopter.name]
        });
        return this.getCats();
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
    console.log("setting current dog: ", this.state.allDogs[0]);
    this.setState({
      currentDog: this.state.allDogs[0],
    });
  }

  showAdoptions = () => {
    let adoptionPairs = [];
    for (let i = 0; i < this.state.adoptionsPets.length; i++) {
      adoptionPairs.push(<p>{this.state.adoptersHumans[i]} took {this.state.adoptionsPets[i]} home.</p>)
    }
    return adoptionPairs;
  }

  // <img src={this.state.currentDog.imageURL} className="petPicture" alt={this.state.currentCat.imageDescription}></img>
  //  <img src={this.state.currentDog.imageURL} className="petPicture" alt={this.state.currentCat.imageDescription}></img>

  autoChoosePet = () => {
    let randomNames = ['Robot the dog', 'Squirrel the cat', 'Bowser the dog', 'Simba the cat', 'Snickers the cat', 'Spider the cat', 'Mortimer the dog', 'Squeeze the dog', 'Sunny the cat', 'Nero the dog', 'Zero the dog'];
    let randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    console.log('randomname is', randomName)
    return `${randomName}`;
  }

  getCurrentDog() {
    if (this.state.currentDog) {
      return <div>
        <h3>{this.state.currentDog.name}</h3>
        <img src={this.state.currentDog.imageURL} className="petPicture" alt={this.state.currentDog.imageDescription}></img>
        <li>sex: {this.state.currentDog.sex} </li>
        <li>age: {this.state.currentDog.age}</li>
        <li>breed: {this.state.currentDog.breed} </li>
        <li>story: {this.state.currentDog.story}</li>
      </div>
    }
    return <div>Loading!</div>;
  }

  render() {
    console.log('this state people in line', this.state.peopleInLine)
    return (
      <section id='adoptContainer'>
        <div id='petContainers'>
          <section className='petDisplay' id='catDisplay'>
            <h3>{this.state.currentCat.name}</h3>
            <img src={this.state.currentCat.imageURL} className="petPicture" alt={this.state.currentCat.imageDescription}></img>
            <li>sex: {this.state.currentCat.sex} </li>
            <li>age: {this.state.currentCat.age}</li>
            <li>breed: {this.state.currentCat.breed} </li>
            <li>story: {this.state.currentCat.story}</li>
            {this.state.myTurn === true && <button id='adoptCat' onClick={this.deleteCat} >Adopt me!</button>}
          </section>
          <section className='petDisplay' id='dogDisplay'>
            {this.getCurrentDog()}
            {this.state.myTurn === true && <button id='adoptDog' onClick={this.deleteDog} >Adopt Me!</button>}
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
          <p>People currently in line to adopt:</p>
          {(this.state.peopleInLine.length === 0) && <p>no one is in line</p>}
          {
            this.state.peopleInLine.map((person) => {
              console.log('person is', person);
              return <p>{person}</p>;
            })
          }

          <p id='adoptionPairs'>Recent adoptions:</p>
          {this.showAdoptions()}

        </section>
      </section >
    )
  }
}
