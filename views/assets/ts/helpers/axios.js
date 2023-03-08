import axios from 'axios'

const instance = axios.create({headers:{
    'CSRF-Token': window.token
}})

export default instance