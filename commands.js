
module.exports = (client, aliases, callback) => {
    if (typeof aliases === 'string') {
        aliases = [aliases]
    }

    client.on('message', (message) => {
        const { content } = message

        aliases.forEach((alias) => {
            const command = `${alias}`

            if (content.includes(command)) {
                console.log(`Running Command ${command}`)

                callback(message)
            }
        })
    })
}