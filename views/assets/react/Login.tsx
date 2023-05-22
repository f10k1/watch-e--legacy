import React, { ElementRef, useRef, useState } from "react";
import Input from './Form/Input';
import axios from '../ts/helpers/axios';
import t from '../ts/helpers/i18n';
interface propsType {
    loginUrl: string,
    registerUrl: string,
    store: any;
}

type InputType = ElementRef<typeof Input>;

const Login = (props: propsType) => {
    const store: any = props.store;

    const form = useRef<InputType[] | null>([]);
    const animateForm = useRef<HTMLDivElement | null>(null);

    const [loginFormType, setLoginFormType] = useState(true);
    const [messages, setMessages] = useState({});

    store.subscribe(() => {
        setMessages({
            messages: store.getState().messages.messages
        });
    });

    const sendForm = (event: React.FormEvent<HTMLElement>): void => {
        event.preventDefault();
        const data: any = {};
        let validate = true;
        form.current?.map((input: InputType) => {
            data[input.props.name] = input.state.value;
            const tmp = input.validate();
            if (validate) validate = tmp;
        });
        if (validate) axios.post(loginFormType ? props.loginUrl : props.registerUrl, data).then(res => {
            if (res.data.redirect) window.location = res.data.redirect;
        });
    };

    return <div className="container">
        <div className="header">
            <div className="logo">
                <span className="icon--camera-lens-fill"></span>
                Watch-E
            </div>
            <h1>{loginFormType ? t('Sign in') : t('Sign up')}</h1>
        </div>
        <div className="login-module">
            <form onSubmit={sendForm}>
                {!loginFormType ?
                    <>
                        <Input name="login" type="text" label={t('Login')} ref={(el: InputType) => { form.current = []; form.current?.push(el); }} validation={{ required: null, min: 5 }} />
                        <Input name="email" type="email" label={t('E-mail')} ref={(el: InputType) => form.current?.push(el)} validation={{ required: null, email: null }} />
                        <Input name="password" type="password" label={t('Password')} ref={(el: InputType) => form.current?.push(el)} validation={{ required: null, min: 8 }} />
                        <Input name="passwordConfirm" type="password" label={t('Password repeat')} ref={(el: InputType) => form.current?.push(el)} validation={{ required: null, min: 8 }} />
                        <button type="submit" className="btn btn--red" >{t('Submit')}</button>
                    </>
                    :
                    <>
                        <Input name="login" type="text" label={t('Login')} ref={(el: InputType) => { form.current = []; form.current?.push(el); }} validation={{ required: null }} />
                        <Input name="password" type="password" label={t('Password')} ref={(el: InputType) => form.current?.push(el)} validation={{ required: null }} />
                        <button type="submit" className="btn btn--red" >{t('Submit')}</button>
                    </>
                }
            </form>
            <div className="divider"></div>
            <div className="advantages">
                <p className="title">{loginFormType ? t('No account yet?') : t('Has account?')}</p>
                <button onClick={() => setLoginFormType(!loginFormType)}><b>{loginFormType ? t('Sign up for free') : t('Sign in')}</b></button>
                <ul className="clean">
                    <li>
                        {t('Monitoring 24/7')}
                    </li>
                    <li>
                        {t('Save videos')}
                    </li>
                    <li>
                        {t('Automated notifications')}
                    </li>
                    <li>
                        {t('Remote configuration')}
                    </li>
                    <li>
                        {t('Custom notifications')}
                    </li>
                </ul>
            </div>
        </div>
    </div>;
};

export default Login;