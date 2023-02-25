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
            functions: ['__'],
            lexer: 'JavascriptLexer'
        }],
        pug: [{
            functions: ['__'],
            lexer: 'JavascriptLexer'
        }]
    }
};