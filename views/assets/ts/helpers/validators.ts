import t from './i18n'

interface returnObj {
    status: boolean,
    msg?: string
}

interface validatorsType {
    readonly [key: string]: Function
}

const validators: validatorsType = {
    min: (value: string, min: number): returnObj => {
        if (value.length > 0 && value.length < min) return {
            status: false,
            msg: t('Value is too short')
        }

        return {
            status: true,
        }
    },
    max: () => (value: string, max: number): returnObj => {
        if (value.length > max) return {
            status: false,
            msg: t('Value is too long')
        }

        return {
            status: true
        }
    },
    required: (value: string) => {
        if (value.length === 0) return {
            status: false,
            msg: t('Input is required')
        }
        return {
            status: true
        }
    },
    email: () => { 
        return {
            status: true
        }
    }
}

export default validators