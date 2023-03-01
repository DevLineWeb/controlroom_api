// $('#header--slider').slick({
//     dots: false,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: false,
//     autoplaySpeed: 1500
//   }); 
  $('#menu--toggle').click(function () {
    $('.header--mobile').toggleClass("show")
  }
  )
  $('#table--button--filter--list').click(function () {
    $('#table--button--filter--list').toggleClass('selected');
    $('#table--button--filter--grid').removeClass('selected');
    $('.sec--room--grid').removeClass('change');
    $('.sec--room--table').removeClass('change');
  })
  $('#table--button--filter--grid').click(function () {
    $('#table--button--filter--grid').toggleClass('selected');
    $('#table--button--filter--list').removeClass('selected');
    $('.sec--room--grid').toggleClass('change');
    $('.sec--room--table').toggleClass('change');
  })

  