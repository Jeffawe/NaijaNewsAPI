const axios = require('axios')
const cheerio = require('cheerio')

const getArticles = module.exports = (newspapers, category, keyword, Allarticles) => {
    let articles = []
    let add = ''
    newspapers.forEach(newspaper => {
        if(category != null){
            cat = newspaper.category
            address = newspaper.address
            add = cat.concat(category)
            add = address.concat(add)
            console.log(add)
        }else{
            add = newspaper.address
        }
        console.log(newspapers)
        axios.get(newspaper.address)
            .then((response) => {
                const html = response.data
                const $ = cheerio.load(html)
                

                $(`a:contains(${keyword})`, html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr('href')
                    const image = getImages(url)
                    const article = {
                        title,
                        url,
                        image: image, 
                        source: newspaper.name
                    }

                    if(!articles.includes(article) && WordCount(article.title) > 2 && WordCount(article.title) < 20){
                        articles.push(article)
                    }
                    Allarticles.splice(0, Allarticles.length, ...articles);
                })
            }).catch((err) => {
                console.log(err)
            })
    })
}

const getImages =  (newspaperAddress) => {
    axios.get(newspaperAddress)
        .then((response) => {
            //console.log(newspaperAddress)
            const html = response.data
            const $ = cheerio.load(html)

            $(`img`, html).each(function () {
                const theclass = $(this).attr('class')
                if(theclass != undefined){
                    if (theclass.indexOf("post-image") != -1){
                        //console.log($(this).attr('src'))
                        image = $(this).attr('src')
                    }else{
                        image = " "
                    }
                }else{
                    image = " " 
                }
            })
        }).catch((err) => {
            console.log(err)
            image = " "
        })
}

const WordCount = (str) =>{ 
    return str.match(/(\w+)/g).length;
  }