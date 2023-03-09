import axios from 'axios'

const instance = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data'
    }, transformRequest: [(data) => {
        return {
            csrf: window.csrf ?? '', ...data
        }
    }, ...axios.defaults.transformRequest
    ]
})

export default instance