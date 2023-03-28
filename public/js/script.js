
function sessionValidate() {
  $.ajax
          ({
              //Configurações
              type: 'POST',//Método que está sendo utilizado.
              dataType: 'html',//É o tipo de dado que a página vai retornar.
              url: '../app/data/autentica.php',//Indica a página que está sendo solicitada.
              //função que vai ser executada assim que a requisição for enviada
              beforeSend: function () {
                $('.ajax--load').toggleClass('show');
                $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              //função que será executada quando a solicitação for finalizada.
              success: function (msg)
              {
                $(".ajax--request--feedback").html(msg);
                $("#user--session--name").html(msg);
                if(msg=='invalid') {
                  location.href = './acess.html';
                }
              }
          });
}
// LISTAGEM DE SALAS COM AJAX

$(document).ready(roomList());

function roomList() {
  $.ajax
    ({
        type: 'POST',
        dataType: 'html',
        url: '../app/interface/listagem.php',
        data: "method=item--list",
        beforeSend: function () {
          
        },
        success: function (data)
        {
            $('#table--room--itens').html(data);
            getLineIndex();
        }
    });
    $.ajax
    ({
        type: 'POST',
        dataType: 'html',
        url: '../app/interface/listagem.php',
        data: "method=item--grid",
        beforeSend: function () {
          
        },
        success: function (data)
        {
            $('#table--grid').html(data);
            getGridIndex();
        }
    });
}

// EVENTO OPEN AO CLICAR EM UM ITEM DA LISTA
const clickedItem = document.getElementsByClassName('table--item');
const clickedItemGrid = document.getElementsByClassName('grid--edit--button');

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

    $('.table--item--more'+'.'+element).toggleClass('show');
    $('.table--room--info--button'+'.'+element).toggleClass('drop');
  

// removo os listeners
    for(x=0;x<clickedItem.length;x++){
        objclone = clickedItem[x].cloneNode(true);
        clickedItem[x].parentNode.replaceChild(objclone, clickedItem[x]);
    }
getLineIndex();
}
function getGridIndex(){
  for(x=0;x<clickedItemGrid.length;x++){
      // arranjo os listeners com os index das linhas
      (function(index){
        clickedItemGrid[x].addEventListener("click", function(){
          gridShow(index);
      });
      })(x);
  }
}
function gridShow(element){ // element é o index da linha clicada
    getEditInfos(element);
    console.log(element);
// removo os listeners
    for(x=0;x<clickedItemGrid.length;x++){
        objclone = clickedItemGrid[x].cloneNode(true);
        clickedItemGrid[x].parentNode.replaceChild(objclone, clickedItemGrid[x]);
    }
    getGridIndex();
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
  $('.search--submit').style.display = 'flex';
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



function openModalEdit() {
  $('#modal--edit--room').toggleClass("show")

}
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
                url: '../app/interface/cadastro.php',//Indica a página que está sendo solicitada.
                //função que vai ser executada assim que a requisição for enviada
                beforeSend: function () {
                  $('#modal--add--room').removeClass("show");
                  $('.ajax--load').toggleClass('show');
                  $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
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
                   $(".ajax--request--feedback").html(msg);
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

function searchGrid() {
  const searchbox = document.getElementById('table--search--input').value.toUpperCase();
  // const storeitems = document.getElementById('table--room--itens');
  const product = document.querySelectorAll('.grid--edit--button');
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
  $('.table--item--more').removeClass('show');
  $('.table--item').removeClass('append');
  $('.table--room--info--button').removeClass('drop');
  $('.ajax--load').removeClass('show');
  $('#modal--user').removeClass('show');
}

const configButton = document.getElementsByClassName('table--room--config--button');
$(configButton).on('click' , closeModal())
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
    $('#edit--show--cadeado').prop('checked', true);
    $('.more--cadeado.'+lineIndex).prop('checked', true);
  }
  else {
    $('#edit--show--cadeado').prop('checked', false);
  }
  if(monitor=='true') {
    $('#edit--show--monitor').prop('checked', true);
    $('.more--monitor.'+lineIndex).prop('checked', true);
  }
  else {
    $('#edit--show--monitor').prop('checked', false);
  }
  if(cabo=='true') {
    $('#edit--show--cabo').prop('checked', true);
    $('.more--cabo.'+lineIndex).prop('checked', true);
  }
  else {
    $('#edit--show--cabo').prop('checked', false);
  }
} 


function editRoom() {
  id = document.getElementById('edit--show--id').value;
  nomesala = document.getElementById('edit--show--sala').value;
  localidade = document.getElementById('edit--show--localidade').value;
  natureza = document.getElementById('edit--show--natureza').value;
  modelo = document.getElementById('edit--show--modelo').value;
  patrimonio = document.getElementById('edit--show--patrimonio').value;
  serie = document.getElementById('edit--show--serie').value;
  gpu = document.getElementById('edit--show--gpu').value;
  disco = document.getElementById('edit--show--disco').value;
  cpu = document.getElementById('edit--show--cpu').value;
  ram = document.getElementById('edit--show--ram').value;
  rede = document.getElementById('edit--show--rede').value;
  desempenho = document.getElementById('edit--show--desempenho').value;
  monitor = document.getElementById('edit--show--monitor').checked;
  cabo = document.getElementById('edit--show--cabo').checked;
  cadeado = document.getElementById('edit--show--cadeado').checked;
  obs = document.getElementById('edit--show--obser').value;

  $.ajax
          ({
              //Configurações
              type: 'POST',//Método que está sendo utilizado.
              dataType: 'html',//É o tipo de dado que a página vai retornar.
              url: '../app/interface/editar.php',//Indica a página que está sendo solicitada.
              //função que vai ser executada assim que a requisição for enviada
              beforeSend: function () {
                $('#modal--add--room').removeClass("show");
                $('.ajax--load').toggleClass('show');
                $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              //Dados para envio
              data: {
                  id: id,
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
                 $(".ajax--request--feedback").html(msg);
                 roomList();
              }
          });
}

function deleteRoom() {
  id = document.getElementById('edit--show--id').value;
  $.ajax
  ({
      //Configurações
      type: 'POST',//Método que está sendo utilizado.
      dataType: 'html',//É o tipo de dado que a página vai retornar.
      url: '../app/interface/deletar.php',//Indica a página que está sendo solicitada.
      //função que vai ser executada assim que a requisição for enviada
      beforeSend: function () {
        $('#modal--add--room').removeClass("show");
        $('.ajax--load').toggleClass('show');
        $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
      },
      //Dados para envio
      data: {
          id: id
      },
      //função que será executada quando a solicitação for finalizada.
      success: function (msg)
      {
         $(".ajax--request--feedback").html(msg);
         roomList();
      }
  });
}



function filterRoom() {
  natureza = document.querySelector('input[name="filter--natureza"]:checked').value;
  gpu = document.querySelector('input[name="filter--gpu"]:checked').value;
  disco = document.getElementById('filter--disco').value;
  cpu = document.getElementById('filter--cpu').value;
  ram = document.getElementById('filter--ram').value;
  rede = document.querySelector('input[name="filter--rede"]:checked').value;
  desempenho = document.getElementById('filter--desempenho').value;
  monitor = document.getElementById('filter--monitor').checked;
  cabo = document.getElementById('filter--cabo').checked;
  cadeado = document.getElementById('filter--cadeado').checked;

  $.ajax
          ({
              //Configurações
              type: 'POST',//Método que está sendo utilizado.
              dataType: 'html',//É o tipo de dado que a página vai retornar.
              url: '../app/interface/filtro.php',//Indica a página que está sendo solicitada.
              //função que vai ser executada assim que a requisição for enviada
              beforeSend: function () {
                $('#modal--add--room').removeClass("show");
                $('.ajax--load').toggleClass('show');
                $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              //Dados para envio
              data: {
                  natureza: natureza,
                  rede: rede,
                  monitor: monitor,
                  gpu: gpu,
                  cpu: cpu,
                  ram: ram,
                  disco: disco,
                  cadeado: cadeado,
                  caboAco: cabo,
                  desempenho: desempenho
              },
              //função que será executada quando a solicitação for finalizada.
              success: function (msg)
              {
                 $(".ajax--request--feedback").html(msg);
                 roomList();
              }
          });
}


function validMail(field) {
  usuario = field.value.substring(0, field.value.indexOf("@"));
  dominio = field.value.substring(field.value.indexOf("@")+ 1, field.value.length);
  
  if ((usuario.length >=1) &&
      (dominio.length >=3) &&
      (usuario.search("@")==-1) &&
      (dominio.search("@")==-1) &&
      (usuario.search(" ")==-1) &&
      (dominio.search(" ")==-1) &&
      (dominio.search(".")!=-1) &&
      (dominio.indexOf(".") >=1)&&
      (dominio.lastIndexOf(".") < dominio.length - 1)) {
  $('#login--mail').removeClass('error');
  $('#login--mail').toggleClass('verified');
  }
  else{
  $('#login--mail').removeClass('verified');
  $('#login--mail').toggleClass('error');
  }
}

function autenticate() {
  mail = document.getElementById('login--mail').value;
  password = document.getElementById('login--password').value;

  $.ajax
          ({
              //Configurações
              type: 'POST',//Método que está sendo utilizado.
              dataType: 'html',//É o tipo de dado que a página vai retornar.
              url: '../app/data/login.php',//Indica a página que está sendo solicitada.
              //função que vai ser executada assim que a requisição for enviada
              beforeSend: function () {
                $('.ajax--load').toggleClass('show');
                $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              //Dados para envio
              data: {
                mail: mail,
                password: password
              },
              //função que será executada quando a solicitação for finalizada.
              success: function (msg)
              {
                if(msg=='valid') {
                  location.href = './index.html'
                }
                else {
                  $(".ajax--request--feedback").html(msg);
                }
              }
          });
}

function logout() {
  $.ajax
          ({
              //Configurações
              type: 'POST',//Método que está sendo utilizado.
              dataType: 'html',//É o tipo de dado que a página vai retornar.
              url: '../app/data/logout.php',//Indica a página que está sendo solicitada.
              //função que vai ser executada assim que a requisição for enviada
              beforeSend: function () {
                $('.ajax--load').toggleClass('show');
                $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              //função que será executada quando a solicitação for finalizada.
              success: function (msg)
              {
                $(".ajax--request--feedback").html(msg);
                sessionValidate();
              }
          });
}

function getUserInfo (){
  $.ajax
          ({
              //Configurações
              type: 'POST',//Método que está sendo utilizado.
              dataType: 'html',//É o tipo de dado que a página vai retornar.
              url: '../app/data/user.php',//Indica a página que está sendo solicitada.
              //função que vai ser executada assim que a requisição for enviada
              beforeSend: function () {
                $('.ajax--load').toggleClass('show');
                $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              //função que será executada quando a solicitação for finalizada.
              success: function (msg)
              {
                $('#modal--user').toggleClass('show');
                $("#user--session--info").html(msg);
                sessionValidate();
              }
          });
}
