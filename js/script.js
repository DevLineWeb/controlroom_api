

const clickedButton = document.getElementsByClassName('table--room--toggle--button');

window.onload = getLineIndex();
function getLineIndex(){
    for(x=0;x<clickedButton.length;x++){
        // arranjo os listeners com os index das linhas
        (function(index){
        clickedButton[x].addEventListener("click", function(){
            infoShow(index);
        });
        })(x);
    }
}
function infoShow(element){ // element é o index da linha clicada
    console.log(element); // mostrar index da linha como exemplo

    // $('.table--item--more').removeClass('show')
    $('.table--item--more').removeClass('show');
    $('.table--item--more'+'.'+element).toggleClass('show');
    $('.table--item').removeClass('append');
    $('.table--item'+'.'+element).toggleClass('append');
    $('.arrow--down'+'.'+element).toggleClass('down');

// removo os listeners
    for(x=0;x<clickedButton.length;x++){
        objclone = clickedButton[x].cloneNode(true);
        clickedButton[x].parentNode.replaceChild(objclone, clickedButton[x]);
    }
getLineIndex();
}




$(document).ready(roomList());

function roomList() {
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
}


$('#menu--toggle').click(function () {
  $('.header--mobile').toggleClass("show")
}
)
$('.search--ico').click(function () {
  $('.room--list--search').toggleClass("active")
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


document.addEventListener('click', (e) => {
  const isDropdownBtn = e.target.classList.contains('table--button--add--room')
  if (!isDropdownBtn && e.target.closest('#add--room--box') != null) return;

  if (isDropdownBtn) {

    $('#modal--add--room').toggleClass("show")

  }
  else {

    $('#modal--add--room').removeClass("show")

  }
})
document.addEventListener('click', (e) => {
  const isDropdownBtn = e.target.classList.contains('table--button--filter')
  if (!isDropdownBtn && e.target.closest('#filter--select--box') != null) return;

  if (isDropdownBtn) {

    $('#modal--filter--room').toggleClass("show")

  }
  else {

    $('#modal--filter--room').removeClass("show")

  }
})
document.addEventListener('click', (e) => {
  const isDropdownBtn = e.target.classList.contains('table--room--config--button')
  if (!isDropdownBtn && e.target.closest('.edit--room--box') != null) return;

  if (isDropdownBtn) {

    $('#modal--edit--room').toggleClass("show")

  }
  else {

    $('#modal--edit--room').removeClass("show")

  }
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
                  $('#modal--add--room').removeClass("show");
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
                   roomList();
                }
            });
}


function search() {
  const searchbox = document.getElementById('table--search--input').value.toUpperCase();
  const storeitems = document.getElementById('table--room--itens');
  const product = document.querySelectorAll('.table--item');
  const pname = storeitems.getElementsByClassName('item--info');

  for (let i = 0; i < pname.length; i++) {
    const match = product[i].getElementsByClassName('item--info')[0];

    if (match) {
      let textvalue = match.textContent || match.innerHTML;

      if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
        product[i].style.display = "";
      }
      else {
        product[i].style.display = "none";
      }
    }
    
  }
}