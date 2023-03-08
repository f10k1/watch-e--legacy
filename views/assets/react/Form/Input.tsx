import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react"
import validators from '../../ts/helpers/validators'
interface propsType {
    name: string,
    type: string,
    value?: string,
    ref?: any,
    label: string,
    validation?: {
        [key: string]: number | string | null
    }
    messages?: {
        [key: string]: {
            status: boolean,
            message: string
        }
    }
}

type InputHandle = {
    validate: () => void
}

type state = {
    value: string,
    error: string
}

class Input extends React.Component<propsType>{

    state: state = {
        value: this.props.value ?? '',
        error: ''
    }

    constructor(props: propsType) {
        super(props)
    }

    validate = () => {
        let validation = false
        if (this.props.validation) {
            Object.keys(this.props.validation).every((key: string) => {
                if (typeof (validators[key] as any) === 'function') {
                    const tmp: any = validators[key](this.state.value, this.props.validation && this.props.validation[key])
                    this.setState(state => ({ ...state, error: tmp.msg ?? '' }))
                    validation = tmp.status

                    return tmp.status
                }
            })
        }
        return validation
    }

    render(): React.ReactNode {
        return <div className={`form-row ${(this.state.error != '' || this.props.messages) && 'error'}`}>
            <div className="input-helper">
                <input type={this.props.type} name={this.props.name} placeholder=" " id={this.props.name} />
                <label htmlFor={this.props.name}>{this.props.label}</label>
            </div>
            {this.state.error != '' && <span>{this.state.error}</span>}
            {this.props.messages && Object.entries(this.props.messages).map((value) => <span key={value[0]}>{value[1].message}</span>)}
        </div>
    }
}


export default Input