$(document).ready(function() {
  $.ajax
    ({
        type: 'POST',
        dataType: 'html',
        url: './php/listagem.php',
        data: "method=item--list",
        beforeSend: function () {
          
        },
        success: function (data)
        {
            $('#table--room--itens').html(data);
        }
    });
})

  $('#menu--toggle').click(function () {
    $('.header--mobile').toggleClass("show")
  }
  )
  $('.search--ico').click(function () {
    $('.table--search').toggleClass("active")
  }
  )
  $('#table--button--filter--list').click(function () {
    $('#table--button--filter--list').toggleClass('selected');
    $('#table--button--filter--grid').removeClass('selected');
    $('.table--grid').removeClass('change');
    $('.table--room').removeClass('change');
  })
  $('#table--button--filter--grid').click(function () {
    $('#table--button--filter--grid').toggleClass('selected');
    $('#table--button--filter--list').removeClass('selected');
    $('.table--grid').toggleClass('change');
    $('.table--room').toggleClass('change');
  })


  $('#table--button--add--room').click(function () {
    $('#modal--add--room').toggleClass('show');
  })
  $('#button--cancel').click(function () {
    $('#modal--add--room').removeClass('show');
  })


  function addRoom() {
    const natureza = document.getElementById('natureza').value;
    const localidade = document.getElementById('localidade').value;
    const nomesala = document.getElementById('nomesala').value;
    const modelo = document.getElementById('modelo').value;
    const patrimonio = document.getElementById('patrimonio').value;
    const serie = document.getElementById('serie').value;
    const rede = document.getElementById('rede').value;
    const desempenho = document.getElementById('desempenho').value;
    const gpu = document.getElementById('gpu').value;
    const disco = document.getElementById('disco').value;
    const cpu = document.getElementById('cpu').value;
    const ram = document.getElementById('ram').value;
    const cadeado = document.getElementById('cadeado').checked;
    const cabo = document.getElementById('cabo').checked;
    const monitor = document.getElementById('monitor').checked;
    const obs = document.getElementById('obs').value;

    $.ajax
            ({
                //Configurações
                type: 'POST',//Método que está sendo utilizado.
                dataType: 'html',//É o tipo de dado que a página vai retornar.
                url: './php/cadastro.php',//Indica a página que está sendo solicitada.
                //função que vai ser executada assim que a requisição for enviada
                beforeSend: function () {
                  $('.ajax--load').toggleClass('show');
                  $("#ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
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
                   $("#ajax--request--feedback").html(msg);
                }
            });
}

function closeSpan() {
  $(".ajax--load").removeClass('show')
}
