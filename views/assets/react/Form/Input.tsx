import React from "react"

interface propsType{
    name: string,
    type: string,
    label: string,
    messages?: {
        [key: string]: {
            status: boolean,
            message: string
        }
    }
}

class Input extends React.Component<propsType>{

    state: any = {
        messages: []
    }

    render(){
        return <div className="form-row">
            <input type={this.props.type} name={this.props.name} placeholder=" " id={this.props.name} />
            <label htmlFor={this.props.name}>{this.props.label}</label>
        </div> 
    }
}

export default Input