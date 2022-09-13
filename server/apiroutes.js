const { urls, users } = require('./datapoints');
const axios = require('axios');


function apiFunctions (id, json, res) {
    switch (id) {
        //user login
        case 'login':
            users.findOne({email:json['email']}).then( user => {
                if (user == null) {
                    res.json({status: 'That user dose not exist!!!'})
                } else {
                    if (json['password'] === user['password']){
                        res.json({status: 1, token: user['token']})
                    } else {
                        res.json({status: 'Wrong password'})
                    }
                }
            });
            break
        //user registery
        case 'register':
            async function Registration () {
                let newUser = await users.findOne({email:json['email']})
                if (newUser == null) {
                    if (json['email'].includes('@') && json['email'].includes('.')){
                        let newUserEntery = {
                            email: json['email'],
                            password: json['password'],
                            urls: [],
                            token: "xx-xxxxxx-xxx-xx-xxxx-xxxxxxx-xxxx-xxxxxx-xxx-xxx".replace(/[xy]/g, function(c) {
                                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                                return v.toString(16);
                            }),
                        }
                        async function validate(){
                            while (1) {
                                let doc = await users.findOne({token: newUserEntery['token']});
                                if (doc == null) {
                                    break;
                                } else {
                                    newUserEntery['token'] = "xx-xxxxxx-xxx-xx-xxxx-xxxxxxx-xxxx-xxxxxx-xxx-xxx".replace(/[xy]/g, function(c) {
                                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                                        return v.toString(16);
                                    });
                                };
                            };
                        };
                        validate()
                        let newEntery = users(newUserEntery)
                        newEntery.save()
                        res.json({status: 1, token: newUserEntery['token']})
                    } else {
                        res.json({status: 'Enter a valid email addresss!!!'})
                    }
                } else {
                    res.json({status: 'Email alreadry in use'})
                }
            };
            Registration()
            break
        //making a new urls
        case 'mkurl':
            users.findOne({token: json['token']}).then( (doc) => {
                if (doc == null) {
                    res.json({status: 'You are not athenticated!!!'})
                } else {
                    if (json['to'].includes('/') && json['to'].includes('.') && json['to'].includes('http')){
                        let newUrl = {
                            url: "xxxxxx".replace(/[xy]/g, function(c) {
                                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                                return v.toString(16);
                            }),
                            to: json['to'],
                            ips: [],
                            count: 0,
                            user: json['token']
                        };
                        async function Validate () {
                            while (1) {
                                let val = await urls.findOne({url: newUrl['url']}) 
                                if (val == null) {
                                    break;
                                } else {
                                    newUrl['url'] = "xxxxxx".replace(/[xy]/g, function(c) {
                                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                                        return v.toString(16);
                                    });
                                };
                            };
                        };
                        Validate(newUrl)
                        users.findOneAndUpdate({token: newUrl['user']}, {"$push": {urls: newUrl['url']}}, {new: true, useFindAndModify: false}, (err) => {
                            if (err) throw err
                        })
                        let newUrlEntery = urls(newUrl)
                        newUrlEntery.save()
                        res.json({url: newUrl['url'], status: 1})
                    } else {
                        res.json({status: 'Enter a valid url!!!'})
                    }
                }
            })
            break
        //user can change email and password
        case 'change':
            users.findOne({token: json['token']}).then((doc) => {
                    if (doc == null){
                        res.json({status: 'User dose not exist'})
                    } else if (json['newPassword'] == null && json['password'] === doc['password']) {
                        if (json['email'].includes('@') && json['email'].includes('.')) {
                            users.findOne({email: json['email']}).then(r => {
                                if (r == undefined) {
                                    users.findOneAndUpdate({ token: json['token'] }, { email: json['email'] }, {new: true, useFindAndModify: false}, (err, newDoc) => {
                                        if (err) throw err
                                        res.json({email: newDoc['email'], status: 1})
                                    })
                                } else {
                                    res.json({status: 'This email is already in use!'})
                                }
                            })
                        } else {
                            res.json({status: 'Enter a valid email addresss!!!'})
                        }
                    } else if (json['email'] == null && json['password'] === doc['password']) {
                        users.findOneAndUpdate({ token: json['token'] }, { password: json['newPassword'] }, {new: true, useFindAndModify: false}, (err, newDoc) => {
                            if (err) throw err
                            res.json({password: newDoc['password'], status: 1})
                        })
                    } else if (json['password'] !== doc['password']) {
                        res.json({status: 'Your password is incorect'})
                    }
            });
            break
        //user can delete url that he created
        case "delUrl":
            urls.findOne({ url: json['url'] }).then((doc) => {
                if (doc == undefined) {
                    res.json({status: 'This url dose not exist'})
                } else if (doc['user'] === json['token']) {
                    urls.deleteMany({url: json['url']}, (err) => {
                        if (err) throw err
                    })
                    users.findOneAndUpdate({ token: json['token'] }, { "$pull": { urls: json['url'] } }, {new: true, useFindAndModify: false}, (err) => {
                        if (err) throw err
                    })
                    res.json({status: 1})
                } else {
                    users.findOneAndUpdate({ token: json['token'] }, { "$pull": { urls: json['url'] } }, {new: true, useFindAndModify: false}, (err) => {
                        if (err) throw err
                        res.json({status: 'Not autherized'})
                    })
                }
            })
            break
        //gets url data
        case "getUrl":
            urls.findOne({ url: json['url'] }).then((doc) => {
                if (doc == null) {
                    res.json({status: 'Url dose not exist'})
                } else {
                    if (json['token'] === doc['user']) {
                        res.json({to: doc['to'], ips: doc['ips'], count: doc['count'], status: 1})
                    } else {
                        res.json({status: 'You are not the authenticated user!!!'})
                    }
                }
            });
            break
        //user cheaks if he is loged in
        case 'logdin':
            users.findOne({token: json['token']}).then((doc) => {
                if (doc == null) {
                    res.json({status: 0})
                } else {
                    res.json({status: 1, email: doc['email'], urls: doc['urls']})
                }
            });
            break
        //finds location
        case "loc":
            axios({method: 'get', url: `https://ipapi.co/${json['ip']}/json`}).then(r => {
                res.json({
                    city: r.data.city, 
                    region: r.data.region, 
                    country: `${r.data.country_name}(${r.data.country})`, 
                    latitude: r.data.latitude, 
                    longitude: r.data.longitude
                })
            })
            break
        //deletes accounts
        case "delete":
            users.findOne({token: json['token']}).then((doc) => {
                if (doc == undefined) {
                    res.json({status: "This user dose not exist!"})
                } else {
                    users.deleteOne({token: json['token']}, (err) => {
                        if (err) throw err
                    })
                    urls.deleteMany({user: json['token']}, (err) => {
                        if (err) throw err
                    })
                    res.json({status: 1})
                }
            })
            break
    }
}

module.exports = apiFunctions;
