import React, { ElementRef, useRef, useState } from "react";
import Input from './Form/Input'
import axios from '../ts/helpers/axios'
import t from '../ts/helpers/i18n'
interface propsType {
    lognUrl: string,
    registerUrl: string,
    store: any
}

type InputType = ElementRef<typeof Input>

const Login = (props: propsType) => {
    const store: any = props.store

    const registerForm: React.RefObject<InputType[] | null> = useRef([])

    const [login, setLogin] = useState(true)
    const [messages, setMessages] = useState({})

    store.subscribe(() => {
        setMessages({
            messages: store.getState().messages.messages
        })
    })

    const register = (event: React.FormEvent<HTMLElement>): void => {
        event.preventDefault()
        registerForm.current?.forEach((input: InputType) => {
            console.log(input.validate())
        })
    }

    return <div className="container">
        <div className="header">
            <div className="logo">
                <span className="icon--camera-lens-fill"></span>
                Watch-E
            </div>
            <h1>{login ? t('Sign in') : t('Sign up')}</h1>
        </div>
        <form onSubmit={register}>
            <Input name={t('login')} type="text" label="Login" ref={(el: InputType) => registerForm.current?.push(el)} validation={{ required: null, min: 0 }} />
            <Input name="email" type="email" label="E-mail" />
            <Input name="password" type="password" label="Password" />
            <Input name="password-repeat" type="password" label="Password repeat" />
            <button type="submit" className="btn btn--red">{t('Submit')}</button>
        </form>
    </div>
}

export default Login