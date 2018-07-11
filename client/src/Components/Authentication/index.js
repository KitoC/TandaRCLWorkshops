import React, { Component } from 'react'
import Modal from './../../UI/Modal/Modal'
import Form from './../../UI/Form/Form'
import FormField from './../../UI/FormField/FormField'
import axios from 'axios'

let t;

class Authentication extends Component {
    state = {

        email: '',
        password: '',
        token: '',
        name: '',
        login: false,
        formAction: ''
    }

    onSubmit = (e) => {
        const { email, password, register, name, token } = this.state
        
        let endpoint = !register ? 'login' : 'users'
        
        e.preventDefault()
        axios.post(`http://social.workshops.tanda.co/${endpoint}`, { email, password, name }
        ).then(res => {
            
                this.setState({
                    token: res.data.token,
                    register: false
                },() => {
                    if(!register) {
                        this.onSubmit
                    }
                })
                this.props.setToken(this.state.token)
            
        }).catch((e) => {
            console.log(e)
            alert('Login Failed!')
        })
    }

    onEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }


    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    switchAccountAction = () => {
         
        const register = !this.state.register ? true : false
       
        this.setState({
            register: register
        })
    }


    render() {
        const color = t ? 'aliceblue' : 'lightyellow';
        t = !t;
        const { inputFields, register } = this.state
        const buttonText = !register ? 'Login' : 'Create Account'
        const switchText = !register ? 'Create An Account' : 'Login'
        
        return (
            <React.Fragment>
                <Modal>
                    
                    <Form buttonText={buttonText} createAccount={this.switchAccountAction.bind(this)} onSubmit={this.onSubmit.bind(this)} switchText={switchText}>
                    
                        { register && <FormField autoFocus="true" label="Name" type="text" name="name" required="*" onChange={this.onNameChange.bind(this)} /> }
                     

                        <FormField label="Email" type="email" name="email" required="*" onChange={this.onEmailChange.bind(this)} />

                        <FormField label="Password" type="password" name="password" required="*" onChange={this.onPasswordChange.bind(this)} />

                       
                    </Form>
                    {this.state.token && <p style={{ backgroundColor: color }}>You've been logged in!</p>}
                </Modal>
            </React.Fragment>
        )
    }
}

export default Authentication