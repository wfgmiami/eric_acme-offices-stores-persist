const conn = require('./_db');

const Office = require('./Office');
const Store = require('./Store');
const Place = require('./Place');
const Day = require('./Day');

Office.belongsTo(Place);
Store.belongsTo(Place);
Day.belongsTo(Office);
Day.belongsTo(Store);


const sync = ()=>{
  return conn.sync( {force: true} )
}

const places = [
  { name: 'statue of Liberty', lat: 40.689249, lng: -74.044500 },
  { name: 'empire state building', lat: 40.748441, lng: -73.985664 },
  { name: 'full stack academy', lat: 40.705076, lng: -74.009160 }
]

const seed = () =>{
  let statueOfLiberty, empireStateBuilding, fullStack;
  let slOffice, esbOffice, fsOffice;
  let slStore, esbStore;

  return sync()
  .then(()=>Promise.all(
    places.map( place => Place.create(place))
  ))
  .then( result => [statueOfLiberty, empireStateBuilding, fullStack] = result )
  .then( ()=> Promise.all([
    Office.create( { name: 'SL Office', placeId: statueOfLiberty.id } ),
    Office.create( { name: 'ESB Office', placeId: empireStateBuilding.id } ),
    Office.create( { name: 'FS Office', placeId: fullStack.id } )
  ]))
  .then( (offices) => {
    [slOffice, esbOffice, fsOffice] = offices;

      return Promise.all([
      Store.create({ name: 'SL Store', placeId: statueOfLiberty.id }),
      Store.create({ name: 'ESB Store', placeId: empireStateBuilding.id })
      ])
    }
  )
  .then( (stores) => {
    [slStore,esbStore] = stores;
    return Promise.all([
      Day.create({ officeId: slOffice.id, storeId: slStore.id }),
      Day.create({ officeId: esbOffice.id, storeId: slStore.id })
    ])
  })
}

module.exports = {
  sync,
  seed,
  models: {
    Office,
    Store,
    Place,
    Day
  }
}
