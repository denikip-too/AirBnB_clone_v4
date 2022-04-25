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
