const db = require('./db');
const models = db.models;
const express = require('express');
const app = express();
const swig = require('swig');
const bodyParser = require('body-parser');

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.set('views', __dirname + '/views');
swig.setDefaults( { cache: false });

app.use('/vendors', express.static(__dirname + '/node_modules'))
app.use('/public', express.static(__dirname + '/public'))
//app.use(morgan(dev));
//app.use(bodyParser.urlencoded( { extended: false }))
//app.use(methodOverride('_method'));
app.use(bodyParser.json());

app.get('/', (req,res,next)=>{
  Promise.all([
    models.Office.findAll({
      include: [models.Place]
    }),
    models.Store.findAll({
      include: [models.Place]
    })
  ])
  .then( result => res.render('index', { offices: result[0], stores: result[1] }))
  .catch(next);
})

app.post('/api/days', (req,res,next)=>{
  models.Day.create({})
  .then(day => res.send(day))
  .catch(next);
})

app.put('/api/days/:id', (req,res,next)=>{
  models.Day.findById(req.params.id)
  .then( day => {
    Object.assign(day,req.body);
    return day.save();
  })
  .then( day => {
    return models.Day.findById(day.id, { include: [models.Office, models.Store]})
  })
  .then( day=> {
    res.send(day);
  })
  .catch(next);
})

app.delete('/api/days/:id', (req,res,next)=>{
  models.Day.destroy({ where: { id: req.params.id }})
  .then(()=> res.sendStatus(200))
  .catch(next);
})

app.get('/api/days', (req,res,next)=>{
  models.Day.findAll({
    include: [models.Office, models.Store],
    order: '\"createdAt\"'
  })
  .then( days=> res.send(days))
  .catch(next)
})

app.use((err, req,res,next)=>{
  console.error(err);
  res.status(500).send(err.message);
})

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));

db.seed()
.then( ()=> console.log('seeded'))
.catch(e => console.log(e));
