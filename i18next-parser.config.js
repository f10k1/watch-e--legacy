module.exports = {
    locales: ['en', 'pl'],
    output: './locales/$LOCALE.json',
    input: ['./views/**/*.pug', './app/**/*.ts'],
    indentation: 4,
    defaultValue: function (namespace, key, value, locale) {
        return value
    },
    verbose: false,
    keepRemoved: false,
    createOldCatalogs: false,
    lexers: {
        ts: [{
            functions: ['t'],
            lexer: 'JavascriptLexer'
        }],
        pug: [{
            functions: ['t'],
            lexer: 'JavascriptLexer'
        }]
    }
};