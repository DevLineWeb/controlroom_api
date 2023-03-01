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


  $('#table--button--add--room').click(function () {
    $('#modal--add--room').toggleClass('show');
  })
  $('#button--cancel').click(function () {
    $('#modal--add--room').removeClass('show');
  })


  function addRoom() {
    $.ajax
            ({
                //Configurações
                type: 'POST',//Método que está sendo utilizado.
                dataType: 'html',//É o tipo de dado que a página vai retornar.
                url: '../php/cadastro.php',//Indica a página que está sendo solicitada.
                //função que vai ser executada assim que a requisição for enviada
                beforeSend: function () {
                    $("#request--waiting--gif").html("<img src='./img/48x48.gif'>");
                },
                //Dados para envio
                data: {
                    // natureza: clientName,
                    // local: clientContact,
                    // sala: reqDate,
                    // modelo: reqId,
                    // patrimonio: reqTurn,
                    // numSerie: reqTurn,
                    // rede: reqTurn,
                    // monitor: reqTurn,
                    // gpu: reqTurn,
                    // disco: reqTurn,
                    // cpu: reqTurn,
                    // ram: reqTurn,
                    // cadeado: reqTurn,
                    // caboAco: reqTurn,
                    // desempenho: reqTurn,
                    // dataVer: reqTurn
                },
                //função que será executada quando a solicitação for finalizada.
                success: function (msg)
                {
                   $("#request--waiting").html(msg);
                }
            });
}