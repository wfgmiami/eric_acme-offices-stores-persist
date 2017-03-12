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
