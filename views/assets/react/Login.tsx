import React from "react";
import Input from './Form/Input'

interface propsType{
    store: any
}

export default class Login extends React.Component<propsType>{

    store: any = this.props.store

    state = {
        page: 'Sign in'
    }

    constructor(props: propsType){
        super(props)

        this.store.subscribe(() => {
            this.setState({
                messages: this.store.getState().messages.messages
            })
        })
 
    }

    render(): React.ReactNode {
        return <div className="container">
            <div className="header">
                <div className="logo">
                    <span className="icon--camera-lens-fill"></span>
                    Watch-E
                </div>
                <h1>{this.state.page}</h1>
            </div>
            <form action="/">
                <Input name="login" type="text" label="Login" />
                <Input name="email" type="email" label="E-mail" />
                <Input name="password" type="password" label="Password" />
                <Input name="password-repeat" type="password" label="Password repeat" />
            </form>
        </div>
    }
}