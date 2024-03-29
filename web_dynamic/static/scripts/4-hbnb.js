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

$.ajax({
  type: 'post',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  headers: { 'Content-Type': 'application/json;' },
  data: JSON.stringify({ amenities: Object.values(amenityObj) }),
  success: function (response) {
    $('SECTION.places').empty();
    for (const r of response) {
      const article = ['<article>',
        '<div class="title_box">',
      `<h2>${r.name}</h2>`,
      `<div class="price_by_night">$${r.price_by_night}</div>`,
      '</div>',
      '<div class="information">',
      `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
      `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
      `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
      '</div>',
      '<div class="description">',
      `${r.description}`,
      '</div>',
      '</article>'];
      $('SECTION.places').append(article.join(''));
    }
  },
  error: function (error) {
    console.log(error);
  }
});
