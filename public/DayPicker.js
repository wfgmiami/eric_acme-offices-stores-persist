function DayPicker(containerId, days, idx, onSelectDay,onAddDay,onRemoveDay){
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

  var removeButton = '';
  if (days.length > 0){
    removeButton = `<button class='btn btn-danger'>Remove Day</button>`;
  }

  var controls = $(`
    <div class='form-controls'>
    <button class="btn btn-primary">Add Day</button>
    ${removeButton}
    </div>
  `)

  $('.btn-primary', controls).on('click', function(){
    onAddDay();
  })

  $('.btn-danger', controls).on('click', function(){
    onRemoveDay();
  })

  container.append(controls);
  container.append(ul)
}
