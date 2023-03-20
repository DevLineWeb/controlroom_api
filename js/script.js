



// LISTAGEM DE SALAS COM AJAX
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
            getLineIndex();
        }
    });
}

// EVENTO OPEN AO CLICAR EM UM ITEM DA LISTA
const clickedItem = document.getElementsByClassName('table--item');

function getLineIndex(){
    for(x=0;x<clickedItem.length;x++){
        // arranjo os listeners com os index das linhas
        (function(index){
        clickedItem[x].addEventListener("click", function(){
            infoShow(index);
        });
        })(x);
    }
}
function infoShow(element){ // element é o index da linha clicada
    getEditInfos(element);
    console.log(element); // mostrar index da linha como exemplo

    // $('.table--item--more').removeClass('show')
    $('.table--item--more'+'.'+element).toggleClass('show');
    $('.table--item'+'.'+element).toggleClass('append');

// removo os listeners
    for(x=0;x<clickedItem.length;x++){
        objclone = clickedItem[x].cloneNode(true);
        clickedItem[x].parentNode.replaceChild(objclone, clickedItem[x]);
    }
getLineIndex();
}

// ANIMAÇÕES DE INTERAÇÃO COM JQUERY
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

// MODALS BUTTONS
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

// ADIÇÃO DE SALA NO BD COM AJAX
function addRoom() {
    const natureza = document.getElementById('natureza').value;
    const localidade = document.getElementById('localidade').value;
    const nomesala = document.getElementById('nomesala').value;
    const modelo = document.getElementById('modelo').value;
    const patrimonio = document.getElementById('patrimonio').value;
    const serie = document.getElementById('serie').value;
    const rede = document.querySelector('input[name="status--rede"]:checked').value;
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



// FILTRAGEM DOS DADOS DA TABELA
function search() {
  const searchbox = document.getElementById('table--search--input').value.toUpperCase();
  // const storeitems = document.getElementById('table--room--itens');
  const product = document.querySelectorAll('.table--item');
  // const pname = storeitems.getElementsByTagName('td');

  for (let i = 0; i < product.length; i++) {
    const match = product[i]
    // .getElementsByTagName('td')[0];

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



function closeModal() {
  $('#modal--add--room').removeClass("show")
  $('#modal--edit--room').removeClass("show")
  $('#modal--filter--room').removeClass("show")
}

const configButton = document.getElementsByClassName('table--room--config--button');
function getEditInfos (lineIndex) {
  const id = configButton[lineIndex].getAttribute('data-id');
  const natureza = configButton[lineIndex].getAttribute('data-01');
  const localidade = configButton[lineIndex].getAttribute('data-02');
  const nomenclatura = configButton[lineIndex].getAttribute('data-03');
  const modelo = configButton[lineIndex].getAttribute('data-04');
  const patrimonio = configButton[lineIndex].getAttribute('data-05');
  const serie = configButton[lineIndex].getAttribute('data-06');
  const rede = configButton[lineIndex].getAttribute('data-07');
  const cpu = configButton[lineIndex].getAttribute('data-08');
  const gpu = configButton[lineIndex].getAttribute('data-09');
  const ram = configButton[lineIndex].getAttribute('data-10');
  const disco = configButton[lineIndex].getAttribute('data-11');
  const monitor = configButton[lineIndex].getAttribute('data-12');
  const cadeado = configButton[lineIndex].getAttribute('data-13');
  const cabo = configButton[lineIndex].getAttribute('data-14');
  const dataver = configButton[lineIndex].getAttribute('data-15');
  const desempenho = configButton[lineIndex].getAttribute('data-16');
  const obser = configButton[lineIndex].getAttribute('data-17');

  $('#edit--show--id').val(id);
  $('#edit--show--sala').val(nomenclatura);
  $('#edit--show--data').val(dataver);
  $('#edit--show--localidade').val(localidade);
  $('#edit--show--natureza').val(natureza);
  $('#edit--show--modelo').val(modelo);
  $('#edit--show--patrimonio').val(patrimonio);
  $('#edit--show--serie').val(serie);
  $('#edit--show--gpu').val(gpu);
  $('#edit--show--disco').val(disco);
  $('#edit--show--cpu').val(cpu);
  $('#edit--show--ram').val(ram);
  $('#edit--show--rede').val(rede);
  $('#edit--show--desempenho').val(desempenho);
  $('#edit--show--monitor').val(monitor);
  $('#edit--show--cabo').val(cabo);
  $('#edit--show--cadeado').val(cadeado);
  $('#edit--show--monitor').val(monitor);
  $('#edit--show--obser').val(obser);

  if(cadeado=='true') {
    $('#edit--show--cadeado').prop('checked', true);;
  }
  if(monitor=='true') {
    $('#edit--show--monitor').prop('checked', true);;
  }
  if(cabo=='true') {
    $('#edit--show--cabo').prop('checked', true);;
  }
} 
