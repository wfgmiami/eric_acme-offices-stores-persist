var state = {
  idx: 0,
  days: [
    {
      office: offices[1],
      store: stores[1]
    },
    {

    },
    {
      office: offices[0],
      store: stores[0]
    }
  ]
}

function DayView(containerId, day, onRemoveOffice, onRemoveStore){
  var container = $(containerId);
  container.empty();
  var officeVisit = day.office;
  var storeVisit = day.store;
  var storeItem = storeVisit ? `<li class='list-group-item store'>Store: ${storeVisit.name}</li>` : '';
  var officeItem = officeVisit ? `<li class='list-group-item office'>Office: ${officeVisit.name}</li>` : '';

  var ul = $(`<ul class='list-group'>${storeItem}${officeItem}</ul>`)

  $(ul).on('click', 'li.store', function(){
    onRemoveStore()
  })

  $(ul).on('click', 'li.office', function(){
    onRemoveOffice();
  })
  container.append(ul);

}

function DayPicker(containerId, days, idx, onSelectDay){
  var container = $(containerId);
  container.empty();
  var lis = days.map(function(day, _idx){
    if(idx === _idx){
      return `<li class='active'><a>${_idx + 1}</a></li>`;
    }else{
      return `<li><a>${_idx + 1}</a></li>`
    }
  })
  var ul = $(`<ul class='nav nav-tabs'>${lis.join('')}</ul>`);

  ul.on('click', 'li', function(){
    var index = $(this).index();
    onSelectDay(index);
  })
  container.append(ul)
}


function onSelectDay(idx){
  state.idx = idx;
  renderDayPicker();
}

function onRemoveOffice(){
  state.days[state.idx].office = null;
  renderDayView();
}

function onRemoveStore(){
  state.days[state.idx].store = null;
  renderDayView();
}

function onAddOffice(office){
  state.days[state.idx].office = office;
  renderDayView();
}

function onAddStore(store){
  state.days[state.idx].store = store;
  renderDayView();
}

function onAddDay(){
  state.days.push({});
  state.idx = state.days.length - 1;
  renderDayPicker();
}

function renderDayPicker(){
  DayPicker('#dayPicker', state.days, state.idx, onSelectDay)
  renderDayView();
}

function renderDayView(){
  DayView('#dayView', state.days[state.idx], onRemoveOffice, onRemoveStore)
}

function VisitPickers(containerId, onAddOffice, onAddStore){
  var container = $(containerId);

  $('.btn, container').on('click', function(ev){
    ev.preventDefault();
    var form = $(this).parents('form');
    var index = form.index();
    var list = index === 0 ? offices : stores;
    var mode = index === 0 ? 'offices' : 'stores';
    var select = $('select', form);
    var id = select.val();
    var item = list.filter(function(item){
      return item.id === id*1;
    })[0]

    if(mode === 'offices'){
      onAddOffice(item)
    }
    if(mode === 'stores'){
      onAddStore(item);
    }
  })
}

renderDayPicker();
VisitPickers('#visitPickers',onAddOffice, onAddStore);


