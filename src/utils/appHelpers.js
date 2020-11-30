// create a Showdown instance to parse issue/pr body content
const showdown = require('showdown')

// Showdown parameters to jive well with Github flavored markdown
export const converter = new showdown.Converter({
    tables: true,
    strikethrough: true,
    ghCompatibleHeaderId: true,
    literalMidWordUnderscores: true,
    ghCodeBlocks: true,
    tasklists: true,
    ghMentions: true,
    ghMentionsLink: 'https://github.com/{u}'
})

// helper function to properly encode query string for fetch
export const encodeQueryString = (params) => {
    const keys = Object.keys(params)
    return keys.length ?
        "?" + keys
        .map(key => encodeURIComponent(key) +
            "=" + encodeURIComponent(params[key]))
        .join("&") :
        ""
}