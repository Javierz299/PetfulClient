import React from 'react';
import { Link } from 'react-router-dom';

class adopt extends React.Component {
    state = {
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
        peopleInLine: 1,
    }

getCat = () => {
    const URL = ``;
    fetch(URL)
    .then(res => {
      if (!res.ok) {
        throw new Error (res.statusText);
      }
      return res.json();
    })
    .then(cat => {
      this.setState({
        currentCat: cat,
      });
    })
    .catch(err => {
      this.setState({
        error: 'Sorry could not find that',
      });
    })
}

getDog = () => {
    const URL = ``;
    fetch(URL)
    .then(res => {
      if (!res.ok) {
        throw new Error (res.statusText);
      }
      return res.json();
    })
    .then(dog => {
      this.setState({
        currentDog: dog,
      });
    })
    .catch(err => {
      this.setState({
        error: 'Sorry could not find that',
      });
    })
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
               <button>Adopt me!</button>
           </section>
           <section className='petDisplay' id='dogDisplay'>
               <h3>{this.state.currentDog.name}</h3>
               <img src={this.state.currentDog.imageURL} className="petPicture"></img>
               <li>sex: {this.state.currentDog.sex} </li>
               <li>age: {this.state.currentDog.age}</li>
               <li>breed: {this.state.currentDog.breed} </li>
               <li>story: {this.state.currentDog.story}</li>
               <button>Adopt Me!</button>
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