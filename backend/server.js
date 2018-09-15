import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Issue from './models/Issue';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/Issue";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("Issue");
//   var myobj = [
//     { title: 'John', responsible: 'Highway 71',description:"Long way to go"},
//     { title: 'John', responsible: 'Highway 71',description:"Long way to go"},
//     { title: 'John', responsible: 'Highway 71',description:"Long way to go"},
//     { title: 'John', responsible: 'Highway 71',description:"Long way to go"},
//     { title: 'John', responsible: 'Highway 71',description:"Long way to go"}
//   ];
//   dbo.collection("issues").insertMany(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("Number of documents inserted: " + res.insertedCount);
//   });
// });
// var MongoClient = require('mongodb').MongoClient;
// var url = 'mongodb://localhost:27017/Issue';

// MongoClient.connect(url, function(err, db) {

//     Issue.find({},function(err, docs){
//         res.send('index',{docs:docs});
//         console.log("wdhfihwbr")
// });

  
// }); 
// var MongoClient = require('mongodb').MongoClient;

// // Connect to the db
// MongoClient.connect("mongodb://localhost:27017/Issue", function (err, db) {
   
//      if(err) throw err;
//      console.log('MongoDB database connection established successfully!');
//      Issue.find((err, issues) => {
//         if (err)
//             console.log(err);
//         else
//             console.log("nuiwdhifgb");
//             console.log(issues);
//             res.json(issues);
//     console.log("nuiwdhifgb");
//     });
//      //Write databse Insert/Update/Query code here..
                
// });
mongoose.connect('mongodb://localhost:27017/Issue',{ useNewUrlParser: true });

const connection = mongoose.connection;
// console.log(connection)

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/issues/add').post((req, res) => {
    let issue = new Issue(req.body);
    issue.save()
        .then(issue => {
            res.status(200).json({'issue': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/issues').get((req, res) => {
    Issue.find((err, issues) => {
        if (err)
            console.log(err);
        else
            res.json(issues);
    });
});

router.route('/issues/:id').get((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (err)
            console.log(err);
        else
            res.json(issue);
    })
});

router.route('/issues/update/:id').post((req, res) => {
    Issue.findById(req.params.id, (err, issue) => {
        if (!issue)
            return next(new Error('Could not load Document'));
        else {
            issue.title = req.body.title;
            issue.responsible = req.body.responsible;
            issue.description = req.body.description;
            issue.severity = req.body.severity;
            issue.status = req.body.status;

            issue.save().then(issue => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/issues/delete/:id').get((req, res) => {
    Issue.findByIdAndRemove({_id: req.params.id}, (err, issue) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
