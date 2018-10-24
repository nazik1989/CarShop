var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var dbUrl = 'mongodb://localhost:27017/AutoShop';
var dbName = 'AutoShop';
var collName = 'cars';
var fs = require('fs');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var cors = require('cors');
app.use(cors());
app.get('/', (request, response) =>  response.sendFile(`${__dirname}/index.html`));
var multer = require('multer');
app.use(multer({dest:__dirname+'/images/'}).any());


// This responds a GET request for the /list_user page.
app.get('/api/car_list', function (req, res) {
    console.log("Դուք GET request ուղարկեցիք /api/car_list ին");
    MongoClient.connect(dbUrl,{ useNewUrlParser: true },function (err, client) {
        if (err) throw err

        var db = client.db(dbName)
        db.collection(collName).find().toArray(function (err, myCars) {
            if (err) throw err
            res.send(myCars);
        });
    });
})


app.post('/oneCar', function (req, res) {
    var ObjectId = require('mongodb').ObjectId;
    var carId = req.body.id;
    // console.log(req.body.id);
    MongoClient.connect(dbUrl,{ useNewUrlParser: true }, function (err, client) {
        if (err) throw err
        var db = client.db(dbName)

        db.collection(collName).findOne({ _id: ObjectId(carId) }, function (err, info) {
            if (err) throw err
            //console.log("info model is "+info.model);
            res.send(info);
        });
    });

})


app.post('/create_user', function (req, res) {
    // console.log(req.body.make);
    // console.log(req.files);
    // console.log(req.files[0].filename);

    MongoClient.connect(dbUrl, { useNewUrlParser: true },function (err, client) {
        if (err) throw err

        var db = client.db(dbName);
        var myobj = { year:req.body.year,
            make:req.body.make,
            model:req.body.model,
            img:req.files,
            condition:req.body.condition,
            body:req.body.body,
            transmission:req.body.transmission,
            useWay:req.body.useWay,
            price:req.body.price,
            description:req.body.description
        };
        db.collection(collName).insertOne(myobj, function(err, res) {
            if (err) throw err
            console.log("1 document inserted");
            client.close();
        });
    });

})

app.post('/update_car', function (req, res) {
    res.end();

    MongoClient.connect(dbUrl, { useNewUrlParser: true },function(err, client){
        if(err) return console.log(err);
             const db = client.db(dbName);
        const col = db.collection(collName);
        db.collection(collName).update(
            {_id: ObjectId(req.body._id)},              // критерий выборки
            {       year:req.body.year,
                    make:req.body.make,
                    model:req.body.model,
                    image:req.body.image,
                    condition:req.body.condition,
                    body:req.body.body,
                    transmission:req.body.transmission,
                    useWay:req.body.useWay,
                    price:req.body.price,
                    stars:req.body.stars,
                    description:req.body.description},     // параметр обновления
            {                           // доп. опции обновления
                returnOriginal: false
            },
            function(err, result){

                console.log(result);
                client.close();
            }
        );
    });
})


app.post('/delete_car', function (req, res) {
    var ObjectId = require('mongodb').ObjectId;
    var id = req.body._id;

    MongoClient.connect(dbUrl, { useNewUrlParser: true },function (err, client) {
        if (err) throw err

        var db = client.db(dbName)
        var myquery = { _id: ObjectId(id) };

        db.collection(collName).findOne({ _id: ObjectId(id) }, function (err, info) {
            if (err) throw err
           console.log("info "+info.img[0].filename);
           sss=info.img[0].filename;


        });
        // db.collection(collName).deleteOne(myquery, function(err,objRes) {
        //     if (err) throw err
        //     console.log("1 document deleted");
        //     client.close();
        // });




    });
    fs.unlink('images/sss', function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });

})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Բարև, աշխատող սերվեր http://%s:%s", host, port)
})

