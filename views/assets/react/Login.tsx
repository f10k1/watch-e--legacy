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
        const data: any = {}
        let validate = true
        registerForm.current?.map((input: InputType) => {
            data[input.props.name] = input.state.value
            const tmp = input.validate()
            if (validate) validate = tmp
        })
        console.log(validate)
        if (validate) axios.post(props.registerUrl, data).then(res => {
            if (res.data.redirect) window.location = res.data.redirect
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
            <Input name="login" type="text" label={t('Login')} ref={(el: InputType) => registerForm.current?.push(el)} validation={{ required: null, min: 5 }} />
            <Input name="email" type="email" label={t('E-mail')} ref={(el: InputType) => registerForm.current?.push(el)} validation={{ required: null, email: null }} />
            <Input name="password" type="password" label={t('Password')} ref={(el: InputType) => registerForm.current?.push(el)} validation={{ required: null, min: 8 }} />
            <Input name="passwordConfirm" type="password" label={t('Password repeat')} ref={(el: InputType) => registerForm.current?.push(el)} validation={{ required: null, min: 8 }} />
            <button type="submit" className="btn btn--red">{t('Submit')}</button>
        </form>
    </div>
}

export default Login