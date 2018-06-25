// initialisation du server
const express = require('express');
const app = express();
var port = 6002;
var bodyParser = require('body-parser');
// connexion a bdd
const mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/reservation';

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('static'));

// utilisation du moteur de rendu ejs
app.set('view engine', 'ejs');


app.get('/template', function (req, res) {
    var test = "hello world";
    res.render('index', {
        message: test
    });
});

//afficher l'index
// app.get('/', function(req,res){
//     get_hotels(function (result) {
//         res.render('index',{
//             hotel: result
//         });
//     }) ;
// });

app.get('/login', function(req,res){
    res.sendFile(__dirname+'/formulaire-login.html')
});

app.get('/get_clients', function(req,res){

    //
    get_clients(function(clients){
        console.log(clients);
        res.send(clients);
    });

    //

});

function get_clients(cb){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("reservation");
        dbo.collection("clients").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            //res.send(result);
            cb(result);
            db.close();
        });
    });

}
// sur la route /hotels , j'envoie une réponse qui fait un rendu
// sur hotel qui se trouve dans views/hotels et je passe les data
// que j'ai récupéré dans la fonction get_clients()
app.get('/', function (req, res) {
    get_hotels(function(hotels){
        //console.log(hotels);
        res.render('hotel', {
            data: hotels
        });
        // res.send(hotels);
    });
});
app.get('/get_hotels', function(req,res){
   
    // mongodb vers hotels
    //
    get_hotels(function(hotels){
        // console.log(hotels);
        res.send(hotels);
    });

    //
});

app.post('/reserved', function (req, res) {
    var nom = req.body.nom;
    var dateArriver = req.body.dateArrive;
    var dateDepart = req.body.dateDepart;
    var hotel = req.body.hotel;
    var id_hotel = req.body.id_hotel;
    var insert = {id_hotel: id_hotel, date_debut: dateArriver, date_fin: dateDepart, nom: nom};
    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        var dbo = database.db('reservation');
        dbo.collection("reservations").insertOne(insert, function (err, data) {
            if (err){
                res.send("error");
            }else {
                res.send("success");
            }
            console.log("ajout réussi");

        });
        database.close();
    })
});
function get_hotels(cb){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("reservation");
        dbo.collection("hotels").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            //res.send(result);
            cb(result);
            db.close();
        });
    });

}

app.get('/get_secteurs', function(req,res){
   
    // mongodb vers secteurs
    //
    get_secteurs(function(secteurs){
        console.log(secteurs);
        res.send(secteurs);
    });
    //
});


function get_secteurs(cb){
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("reservation");
        dbo.collection("secteurs").find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            //res.send(result);
            cb(result);
            db.close();
        });
    });

}



// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to bdd");
    db.close();
});


app.get('/admin/ajout-hotel', function (req, res) {
    res.sendFile(__dirname + '/ajout-hotel.html')
});


//Éditer les données des hôtels

app.put('/update', function (req, res) {

    var monid = parseInt(req.body.donnee1);
    var name = req.body.donnee2;
    var image = req.body.donnee3;
    var mark = parseInt(req.body.donnee4);
    var secteur = parseInt(req.body.donnee5);

    var newvalues =  { $set: { 'Nom': name, 'img': image, 'id_secteur': secteur, 'Nb_etoiles': mark } };


    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        var dbo = database.db("reservation");

       //console.log(newvalues);
        dbo.collection("hotels").updateOne({id : monid}, newvalues, function (err, result) {
            // if (err) throw err;
            if (err){
                res.send('error');
            }

            res.send('ok');
            console.log("1 document inserted");
            database.close();
        });
    });
});

//Ajouter un nouvel hôtel
app.post('/add', function (req, res) {

    var monid = parseInt(req.body.donnee1);
    var name = req.body.donnee2;
    var image = req.body.donnee3;
    var mark = parseInt(req.body.donnee4);
    var secteur = parseInt(req.body.donnee5);
    var newvalues =  {'id':monid, 'Nom': name, 'img': image, 'id_secteur': secteur, 'Nb_etoiles': mark } ;


    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        var dbo = database.db("reservation");

        dbo.collection("hotels").insertOne( newvalues, function (err, result) {
            if (err){
                res.send('error');
            }
            res.send('ok');
            console.log("1 document inserted");
            database.close();
        });
    });
    //on est gentil on repond
    // res.send("toto");
});



app.get('/admin/hotels', function (req, res) {
    get_hotels(function(hotels){
        //console.log(hotels);
        res.render('admin/hotels', {
            hotels: hotels
        });
        // res.send(hotels);
    });
});

app.get('/admin/', function (req, res) {
    get_hotels(function(hotels){
        //console.log(hotels);
        res.render('admin/index', {
            hotels: hotels
        });
        // res.send(hotels);
    });
});
/**
 * Route del d'un doc via le formulaire 
 */
app.delete('/hotels/:_id', function (req, res) {
    const _id = req.params._id;
  
    MongoClient.connect(url, function (err, database) {
      if (err) throw err;
      var myquery = {
        _id: mongodb.ObjectId(_id)
      };
      var dbo = database.db("reservation");
      //console.log(newvalues);
       dbo.collection("hotels").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
       // console.log(obj);
        database.close();
      });
    });
      
    res.end("id= " + _id + " supprimé");
  });

app.listen(port, function(){
    console.log('the port is on')
});
