const next = require('next');
const { urls } = require('./server/datapoints');
const apiFunction =require('./server/apiroutes')
const mongoose = require('mongoose');
const express = require('express');

//creates a conection to the mongo data base

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

//inits the important values

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

//inits the main rendering and server config functions

const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();


//parses the json data
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.set('trust proxy', true)

//cheaks for any special characters
server.use((req, res, next) => {
    req.error = false
    let json = req.body;
    let format = /[`*[\]{};$'"\\|<>\?~]/
    for (let key in json) {
        if (format.test(json[key])) {
            res.json({status: 'Error: No Special Characters'})
            req.error = true
            break
        }
    }
    next()
})

//singnifies the starting of the server
console.log('Started')

app.prepare().then(() => {
    console.log('App is prepared')
    server.post('/api/:id', (req, res) => {
        //inits the params
        let { id } = req.params;
        let json = req.body;
        console.log(json, id)
        //main respont and server side functions
        if (req.error == false) {
            apiFunction(id, json, res)
        }
    });
    
    //redirects deviceses to designated url
    server.get('/to/:des', (req, res) => {
        let { des } = req.params
        urls.findOne({url: des}).then((toUrl) => {
            if (toUrl !== null) {
                let today = new Date();
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); 
                let yyyy = today.getFullYear();
                let iper = req.header('x-forwarded-for')
                iper = String(iper).split(',');
                iper = iper[0]
                if (!iper) {
                    iper = req.connection.remoteAddress;
                    iper = String(iper).split(',');
                    iper = iper[3]
                }
                today = mm + '/' + dd + '/' + yyyy;
                urls.findOneAndUpdate({url: des}, {"$push": {ips: { date: today , ip: iper }}, "$inc": {count: 1}}, {new: true, useFindAndModify: false}, (err) => {
                    if (err) throw err
                    res.redirect(toUrl['to'])
                })
            } else {
                res.redirect('https://www.google.com')
            }
        });
    })
    
    //handels the frontend web app
    server.all('*', (req, res) => {
        return handle(req, res)
    });
    
    //creates a secure https server with express config
    server.listen(port, () => {
        console.log('app is online, port:' + port);
    });
})