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
    // const natureza = document.getElementById('natureza');
    // const local = document.getElementById('localidade');
    // const sala = document.getElementById('nomesala');
    // const modelo = document.getElementById('modelo');
    // const patrimonio = document.getElementById('patrimonio');
    // const numSerie = document.getElementById('serie');
    // const rede = document.getElementById('rede');
    // const monitor = document.getElementById('monitor');
    // const gpu = document.getElementById('gpu');
    // const disco = document.getElementById('disco');
    // const cpu = document.getElementById('cpu');
    // const ram = document.getElementById('ram');
    // const cadeado = document.getElementById('cadeado');
    // const caboAco = document.getElementById('cabo');
    // const desempenho = document.getElementById('desempenho');
    // const dataVer = document.getElementById('data');
    // const obs = document.getElementById('obs');

    $.ajax
            ({
                //Configurações
                type: 'POST',//Método que está sendo utilizado.
                dataType: 'html',//É o tipo de dado que a página vai retornar.
                url: './php/cadastro.php',//Indica a página que está sendo solicitada.
                //função que vai ser executada assim que a requisição for enviada
                beforeSend: function () {
                    $("#request--waiting--gif").html("<img src='./img/48x48.gif'>");
                },
                //Dados para envio
                data: {
                    natureza: natureza,
                    localidade: localidade,
                    sala: nomesala,
                    modelo: modelo,
                    patrimonio: patrimonio,
                    numSerie: serie,
                    rede: rede,
                    monitor: monitor,
                    gpu: gpu,
                    disco: disco,
                    cpu: cpu,
                    ram: ram,
                    cadeado: cadeado,
                    caboAco: cabo,
                    desempenho: desempenho,
                    obs: obs
                },
                //função que será executada quando a solicitação for finalizada.
                success: function (msg)
                {
                   $("#request--waiting").html(msg);
                }
            });
}