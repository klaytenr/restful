var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasks');
app.use(bodyParser.json());
app.use(express.static( __dirname + '/restful/dist' ));

var Schema = mongoose.Schema;
var TaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true, default: ''},
    completed: {type: Boolean, required: true, default: false},
}, {timestamps: true});
var Task = mongoose.model('Task', TaskSchema);
mongoose.Promise = global.Promise;

app.get('/tasks', function(req, res){
    Task.find({}, function(err, tasks){
        if(err){
            res.json({message: 'Error', error: err});
        }else{
            res.json({message: 'Good job', data: tasks});
        }
    })
})

app.get('/tasks/:id', function(req, res){
    Task.findOne({_id: req.params.id}, function(err, tasky){
        if(err){
            res.json({message: 'Error', error: err});
        }else{
            res.json({message: 'This is one task', task: tasky});
        }
    })
})

app.post('/tasks', function(req, res){
    var task = new Task(req.body);
    task.save(function(err){
        if(err){
            res.json({message: 'Error', error: err});
        }else{
            res.json({message: 'Success', task: task});
        }
    })
})

app.put('/tasks/:id', function(req, res){
    Task.update({_id: req.params.id}, req.body, function(err, tasky){
        if(err){
            console.log('nope');
        }else{
            res.json({message: 'edit task', task: tasky});
        }
    })
})

app.delete('/tasks/:id', function(req, res){
    Task.findOne({_id: req.params.id}, function(err, taskies){
        if(err){
            console.log('nope');
        }else{
            taskies.remove();
            res.json({message: "deleted"});
        }
    })
})

app.listen(8000, function(){
    console.log('Listening on port 8000')
});