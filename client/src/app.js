import React, {Component} from 'react';
import FullName from './fullName'
import PersonalDetails from './personDetails'
import Authentication from './Components/Authentication'
import { Route, Redirect } from 'react-router-dom'


class App extends Component {
    state = {
        token: null
    }

    setToken = (token) => {
        this.setState({
            token: token
        })
        console.log(this.state.token, 'App no has token set')
    }

  
    render() {
        let {token} = this.state
        return(
            <React.Fragment>
                <p>test</p>
              
                
                <Route exact render={
                   () => <Authentication setToken={this.setToken.bind(this)}  />
                } path="/login" />

                

                <Route exact path='/' render={() => {
                    if (!token) {return( <Redirect to='/login' />)}

                }
                } />

            </React.Fragment>
        )
    }
}



export default App
