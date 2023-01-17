const express = require('express')
const newspapers = require('./data.js');
const searches = require('./data2.js')
const getArticles = require('./functions.js');

const PORT = process.env.PORT || 3000

const app = express()

const articles = []
const specific_articles = []

app.get('/', (req, res) => {
    res.json("Welcome to Naija News API")
})

app.get('/news', (req, res) => {
    getArticles(newspapers, null, "Nigeria", articles)
    res.json(articles)
})

app.get('/news/:newspaper_id', (req, res) => {
    const newspaper_id = req.params.newspaper_id

    const newspaper = newspapers.filter(newspaper => newspaper.name === newspaper_id)
    getArticles(newspaper, null, "Nigeria", specific_articles)
    res.json(specific_articles)
})

app.get('/news/category/:categories', (req, res) => {
    const category = String(req.params.categories)

    
    getArticles(newspapers, category, "Nigeria", specific_articles)
    res.json(specific_articles)
})

app.get('/news/term/:term', (req, res) => {
    const term = String(req.params.term)

    
    getArticles(newspapers, null, term, specific_articles)
    res.json(specific_articles)
})

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
})