import React from 'react';
import config from './config';


class adopt extends React.Component {
    state = {
        allCats:[],
        allDogs:[],
        currentCat: {
            imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
            imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
            name: 'Fluffy',
            sex: 'Female',
            age: 2,
            breed: 'Bengal',
            story: 'Thrown on the street'
          },
        currentDog: {
            imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
            imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
            name: 'Zeus',
            sex: 'Male',
            age: 3,
            breed: 'Golden Retriever',
            story: 'Owner Passed away'
          },
        placeInLine: 1,
        peopleInLine: [],
    }

//Get statement to get LIST of cats
getCats = () => {
    const URL = `${config.API_ENDPOINT}api/cats`;
    fetch(URL)
    .then(res => {
      if (!res.ok) {
        throw new Error (res.statusText);
      }
      return res.json();
    })
    .then(cats => {
      this.setState({
        allCats: cats,
      });
    })
    .then(e => {this.setCurrentCat();})
    .catch(err => {
      this.setState({
        error: 'Sorry could not find that',
      });
    })
}
//Get statement to get LIST of dogs
getDogs = () => {
    const URL = `${config.API_ENDPOINT}api/dogs`;
    fetch(URL)
    .then(res => {
      if (!res.ok) {
        throw new Error (res.statusText);
      }
      return res.json();
    })
    .then(dogs => {
      this.setState({
        allDogs: dogs,
      });
    })
    .then(e => {this.setCurrentDog();})
    .catch(err => {
      this.setState({
        error: 'Sorry could not find that',
      });
    })
}
//Get Statement to get LIST of people
getLine = () => {
    const URL = `${config.API_ENDPOINT}api/humans`;
    fetch(URL)
    .then(res => {
      if (!res.ok) {
        throw new Error (res.statusText);
      }
      return res.json();
    })
    .then(people => {
      this.setState({
        peopleInLine: people,
      });
    })
    .catch(err => {
      this.setState({
        error: 'Sorry could not find that',
      });
    })
}

//Delete statements for cats and dogs
deleteCat = () => {
    const URL = `${config.API_ENDPOINT}api/cats`;
    fetch(URL, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.currentCat.name)
    })
    .then(e => this.setCurrentCat());
}
deleteDog = () => {
    const URL = `${config.API_ENDPOINT}api/cats`;
    fetch(URL, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.currentDog.name)
    })
    .then(e => this.setCurrentDog());
}

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



componentDidMount() {
   this.getCats();
   this.getDogs();
   this.getLine();
  }


render(){
    return (
       <section>

           <section className='petDisplay' id='catDisplay'>
               <h3>{this.state.currentCat.name}</h3>
               <img src={this.state.currentCat.imageURL} className="petPicture"></img>
               <li>sex: {this.state.currentCat.sex} </li>
               <li>age: {this.state.currentCat.age}</li>
               <li>breed: {this.state.currentCat.breed} </li>
               <li>story: {this.state.currentCat.story}</li>
               <button id='adoptCat' onClick={this.deleteCat}>Adopt me!</button>
           </section>
           <section className='petDisplay' id='dogDisplay'>
               <h3>{this.state.currentDog.name}</h3>
               <img src={this.state.currentDog.imageURL} className="petPicture"></img>
               <li>sex: {this.state.currentDog.sex} </li>
               <li>age: {this.state.currentDog.age}</li>
               <li>breed: {this.state.currentDog.breed} </li>
               <li>story: {this.state.currentDog.story}</li>
               <button id='adoptDog' onClick={this.deleteDog}>Adopt Me!</button>
           </section>

           <section className='userLine'>
               <p>You are currently number {this.state.placeInLine} in line.</p>
               <p>Wait until your turn before you can adopt</p>
           </section>
       </section>
    )
}
}

export default adopt;