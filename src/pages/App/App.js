import React, {Component} from 'react';
import './App.css';
import {Route, NavLink} from 'react-router-dom';
// The following imports all named exports attached to puppyAPI
import * as puppyAPI from '../../utils/puppyService';
import AddPuppyPage from '../../pages/AddPuppyPage/AddPuppyPage';
import EditPuppyPage from '../../pages/EditPuppyPage/EditPuppyPage';
import PuppyDetailPage from '../../pages/PuppyDetailPage/PuppyDetailPage';
import PuppyListPage from '../../pages/PuppyListPage/PuppyListPage';
//User sign in and log in pages
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';
import userService from '../../utils/userService';


class App extends Component {
  state = {
    puppies: []
  };

  /*--- Puppy CRUD ---*/
  handleAddPuppy = async newPupData => {
    const newPup = await puppyAPI.create(newPupData);
    this.setState(state => ({
      puppies: [...state.puppies, newPup]
    }),
    // Using cb to wait for state to update before rerouting
    () => this.props.history.push('/'));
  }

  handleUpdatePuppy = async updatedPupData => {
    const updatedPuppy = await puppyAPI.update(updatedPupData);
    // Using map to replace just the puppy that was updated
    const newPuppiesArray = this.state.puppies.map(p => 
      p._id === updatedPuppy._id ? updatedPuppy : p
    );
    this.setState(
      {puppies: newPuppiesArray},
      // This cb function runs after state is updated
      () => this.props.history.push('/')
    );
  }

  handleDeletePuppy= async id => {
    await puppyAPI.deleteOne(id);
    this.setState(state => ({
      // Yay, filter returns a NEW array
      puppies: state.puppies.filter(p => p._id !== id)
    }), () => this.props.history.push('/'));
  }


  /*--- User Auth ---*/
  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
    console.log(this.state.user);
  }

  /*--- Lifecycle Methods ---*/

  async componentDidMount() {
    const puppies = await puppyAPI.getAll();
    this.setState({puppies});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          React Puppies CRUD
          <nav>
            <NavLink exact to='/'>PUPPIES LIST</NavLink>
            &nbsp;&nbsp;&nbsp;
            <NavLink exact to='/add'>ADD PUPPY</NavLink>
            &nbsp;&nbsp;&nbsp;
            <NavLink exact to='/login'>LOG IN</NavLink>
            &nbsp;&nbsp;&nbsp;
            <NavLink exact to='/signup'>SIGN UP</NavLink>
          </nav>
        </header>
        <main>
          <Route exact path='/' render={() => 
            <PuppyListPage
              puppies={this.state.puppies}
              handleDeletePuppy={this.handleDeletePuppy}
            />
          } />
          <Route exact path='/add' render={() => 
            <AddPuppyPage
              handleAddPuppy={this.handleAddPuppy}
            />
          } />
          <Route exact path='/details' render={({location}) => 
            <PuppyDetailPage location={location}/>
          } />
          <Route exact path='/edit' render={({location}) => 
            <EditPuppyPage
              handleUpdatePuppy={this.handleUpdatePuppy}
              location={location}
            />
          } />
          <Route exact path='/signup' render={({history}) => 
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}     
            />
          } />
           <Route exact path='/login' render={({history}) => 
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}     
            />
          } />
        </main>
      </div>
    );
  }
}

export default App;
