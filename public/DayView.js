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
