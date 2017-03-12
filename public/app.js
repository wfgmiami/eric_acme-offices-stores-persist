var state = {
  idx: 0,
  days: [
  ]
}



function onSelectDay(idx){
  state.idx = idx;
  renderDayPicker();
}

function onRemoveOffice(){
  var day = state.days[state.idx];
  $.ajax({
    url: `/api/days/${day.id}`,
    method: 'PUT',
    data: JSON.stringify({
      officeId: null
    }),
    contentType: 'application/json'
  })
  .then(function(day){
    state.days[state.idx] = day;
    renderDayView();
  })
}

function onRemoveStore(){
  var day = state.days[state.idx];
  $.ajax({
    url: `/api/days/${day.id}`,
    method: 'PUT',
    data: JSON.stringify({
      storeId: null
    }),
    contentType: 'application/json'
  })
  .then(function(day){
    state.days[state.idx] = day;
    renderDayView();
  })

}

function onAddOffice(office){
  var day = state.days[state.idx];
  $.ajax({
    url: `/api/days/${day.id}`,
    method: 'PUT',
    data: JSON.stringify({
      officeId: office.id
    }),
    contentType: 'application/json'
  })
  .then( day=> {
    state.days[state.idx].office = office;
    renderDayView();
  })
}

function onAddStore(store){
  var day = state.days[state.idx];
  $.ajax({
    url: `/api/days/${day.id}`,
    method: 'PUT',
    data: JSON.stringify({
      storeId: store.id
    }),
    contentType: 'application/json'
  })
  .then( day=> {
    state.days[state.idx].store = store;
    renderDayView();
  })
}

function onAddDay(){
  $.post('/api/days')
  .then(function(day){
    state.days.push(day);
    state.idx = state.days.length - 1;
    renderDayPicker();
  })
}

function onRemoveDay(){
  var day = state.days[state.idx]

  $.ajax({
    url: `/api/days/${day.id}`,
    method: 'DELETE'
  })
  .then(function(){
    state.days.splice(state.idx, 1);
    state.idx = 0;
    renderDayPicker();
  })
}

var stateChangeHandlers = {
  onSelectDay,
  onAddDay,
  onRemoveDay,
  onAddOffice,
  onAddStore,
  onRemoveOffice,
  onRemoveStore
}

function renderDayPicker(){

  DayPicker('#dayPicker',
            state.days,
            state.idx,
            stateChangeHandlers.onSelectDay,
            stateChangeHandlers.onAddDay,
            stateChangeHandlers.onRemoveDay)

  renderDayView();
}

function renderDayView(){
  DayView('#dayView',
          state.days[state.idx],
          onRemoveOffice,
          onRemoveStore)
}

function init(){
  renderDayPicker()
  VisitPickers('#visitPickers',stateChangeHandlers.onAddOffice, stateChangeHandlers.onAddStore);
}

$.get('/api/days')
.then(function(days){
    state.days = days;
    init();
})
