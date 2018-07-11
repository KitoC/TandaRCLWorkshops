import React, {Component} from 'react'

class PersonalDetails extends Component {
    state = {
        name: 'Kito',
        email: 'Kito@Taanda'
    }

    updateName = (e) => {  
        this.setState({
            name: e.target.value
        })
    }

    render() {
      
        return(
            this.props.children(this.state, this.updateName)
        )
    }

}

export default PersonalDetails
