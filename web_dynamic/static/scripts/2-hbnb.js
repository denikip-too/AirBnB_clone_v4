// JavaScript script

$('input[name=checkbox]').change(function () {
  if ($(this).is(':checked')) {
    amenityObj[$(this).attr('data-name')] = $(this).attr('data-id');
  } else {
    delete amenityObj[$(this).attr('data-name')];
  }
  const names = Object.keys(amenityObj);
  $('.amenities h4').text(names.sort().join(', '));
});
$.get('http://0.0.0.0:5001/api/v1/status/', function (data, response) {
  if (data.status === 'OK' && response === 'success') {
    $('div#api_status').addClass('avaiable');
  } else {
    $('div#api_status').removeClass('avaiable');
  }
});
