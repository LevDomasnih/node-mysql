const express = require('express')
const app = express()
const { graphqlHTTP } = require('express-graphql')
const PORT = process.env.PORT || 3001
const path = require('path')
const sequelize = require('./utils/database')
const schema = require('./graphql/schema')
const resolver = require('./graphql/resolver')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.use(graphqlHTTP({
  schema: schema,
  rootValue: resolver
}))

app.use((req, res, next) => {
  res.sendFile('/index.html')
})
async function start() {
  try {
    await sequelize.sync()
  } catch (e) {
    console.log(e)
  }
}

start()
app.listen(PORT)