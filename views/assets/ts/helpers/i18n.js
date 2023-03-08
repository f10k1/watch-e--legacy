const t = (key) => {
    return window.i18n && window.i18n[key] ? window.i18n[key] : key
}

export default t