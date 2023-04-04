
// VALIDA STATUS DA SESSÃO ATUAL
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
            getLineIndex();
            getIndexItemGrid();
            getLineIndexGrid();
    }
    });
}

// EVENTO OPEN AO CLICAR EM UM ITEM DA LISTA + PEGA INDICE DO ITEM

const ListClickedItem = document.getElementsByClassName('table--item');
function getLineIndex(){
for(x=0;x<ListClickedItem.length;x++){
        // arranjo os listeners com os index das linhas
        (function(index){
        ListClickedItem[x].addEventListener("click", function(){
            infoShow(index);
        });
        })(x);
    }
}
function infoShow(element){
    getEditInfos(element);

    $('.table--item--more'+'.'+element).toggleClass('show');
  

// removo os listeners
    for(x=0;x<ListClickedItem.length;x++){
        objclone = ListClickedItem[x].cloneNode(true);
        ListClickedItem[x].parentNode.replaceChild(objclone, ListClickedItem[x]);
    }
getLineIndex();
}

// OPEN MODALS
function openModalEdit() {
  $('#modal--edit--room').toggleClass("show")

}
function openModalAdd() {
  $('#modal--add--room').toggleClass("show")
}
function openModalNotify() {
  
  $('#modal--notify').toggleClass('show');
  getNotify();
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
  function searchInList() {
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
  function searchInGrid() {
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
  searchInList();
  searchInGrid();
  $('.grid--itens').toggleClass('show');
}

// FUNÇÃO PARA FECHAR TODOS OS MODAIS
function closeModal() {
  $('#modal--add--room').removeClass("show")
  $('#modal--edit--room').removeClass("show")
  $('#modal--filter--room').removeClass("show")
  $('.table--item--more').removeClass('show');
  $('.table--item').removeClass('append');
  $('.table--room--info--button').removeClass('drop');
  $('.ajax--load').removeClass('show');
  $('#modal--user').removeClass('show');
  $('#modal--notify').removeClass('show');
}

// FUNÇÃO PARA QUE QUANDO CLICARMOS NA TR ELE IDENTIFIQUE E BUSQUE OS DADOS
const configButton = document.getElementsByClassName('table--room--config--button');
// $(configButton).on('click' , closeModal())
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

// FUNÇÃO PARA EDITAR A SALA
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

// FUNÇÃO PARA DELETAR A SALA
function deleteRoom() {
  id = document.getElementById('edit--show--id').value;
  nomenclatura = document.getElementById('edit--show--sala').value;
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
          id: id,
          nomenclatura: nomenclatura
      },
      //função que será executada quando a solicitação for finalizada.
      success: function (msg)
      {
         $(".ajax--request--feedback").html(msg);
         roomList();
      }
  });
}

// ??????????????????????
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

// MÁSCARA E-MAIL ACESS PAGE
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

// AUTENTICAÇÃO DA SESSÃO
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

// LOGOUT DA SESSÃO
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

// BUSCA INFORMAÇÕES DO USUÁRIO LOGADO
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
                getRecently();
              }
          });
}
function getRecently (){
  $.ajax
          ({
              type: 'POST',
              dataType: 'html',
              url: '../app/log/recently.php',
              beforeSend: function () {
                $("#user--session--logs").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              success: function (msg)
              {
                $("#user--session--logs").html(msg);
              }
          });
}
function getNotify (){
  $.ajax
          ({
              type: 'POST',
              dataType: 'html',
              url: '../app/log/notifications.php',
              beforeSend: function () {
                $("#notify--case").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              success: function (msg)
              {
                $("#notify--case").html(msg);
                getNotifyItemIndex();
              }
          });
}




//=========================FUNÇÃO PARA ABRIR GRUPO E CARREGAR SALAS PERTENCENTES======================================//

const GridClickedItem = document.getElementsByClassName('grid--col');
function getLineIndexGrid(){
for(x=0;x<GridClickedItem.length;x++){
          // arranjo os listeners com os index das linhas
          (function(index){
          GridClickedItem[x].addEventListener("click", function(){
            infoShowGrid(index);
          });
          })(x);
      }
  }
function infoShowGrid(element){
    console.log(element);
    $('.grid--itens'+'.'+element).toggleClass('show');
    item = document.getElementsByClassName('grid--itens');
    const localidade = item[element].getAttribute('data-bloco');
    console.log(localidade);

    $.ajax
          ({
              type: 'POST',
              dataType: 'html',
              url: '../app/interface/blocos.php',
              beforeSend: function () {
                $('#modal--add--room').removeClass("show");
                $(".grid--itens"+"."+element).html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              data: {
                localidade: localidade
              },
              success: function (msg)
              {
                $(".grid--itens"+"."+element).html(msg);
                getLineIndexGrid();
                getIndexItemGrid()
              }
          });


// removo os listeners
    for(x=0;x<GridClickedItem.length;x++){
        objclone = GridClickedItem[x].cloneNode(true);
        GridClickedItem[x].parentNode.replaceChild(objclone, GridClickedItem[x]);
    }
}


//=========================ABRIR EDIÇÃO DE SALA DENTRO DO GRID======================================//

const itemGridEdit = document.getElementsByClassName('grid--edit--button');
function getIndexItemGrid(){
for(x=0;x<itemGridEdit.length;x++){
          // arranjo os listeners com os index das linhas
          (function(index){
          itemGridEdit[x].addEventListener("click", function(){
            infoShowItemGrid(index);
          });
          })(x);
      }
  }
function infoShowItemGrid(element){
  getEditInfosGrid(element);
    console.log(element);



// removo os listeners
    for(x=0;x<itemGridEdit.length;x++){
        objclone = itemGridEdit[x].cloneNode(true);
        itemGridEdit[x].parentNode.replaceChild(objclone, itemGridEdit[x]);
    }
    getIndexItemGrid();
}

function getEditInfosGrid (lineIndex) {
  const id = itemGridEdit[lineIndex].getAttribute('data-id');
  const natureza = itemGridEdit[lineIndex].getAttribute('data-01');
  const localidade = itemGridEdit[lineIndex].getAttribute('data-02');
  const nomenclatura = itemGridEdit[lineIndex].getAttribute('data-03');
  const modelo = itemGridEdit[lineIndex].getAttribute('data-04');
  const patrimonio = itemGridEdit[lineIndex].getAttribute('data-05');
  const serie = itemGridEdit[lineIndex].getAttribute('data-06');
  const rede = itemGridEdit[lineIndex].getAttribute('data-07');
  const cpu = itemGridEdit[lineIndex].getAttribute('data-08');
  const gpu = itemGridEdit[lineIndex].getAttribute('data-09');
  const ram = itemGridEdit[lineIndex].getAttribute('data-10');
  const disco = itemGridEdit[lineIndex].getAttribute('data-11');
  const monitor = itemGridEdit[lineIndex].getAttribute('data-12');
  const cadeado = itemGridEdit[lineIndex].getAttribute('data-13');
  const cabo = itemGridEdit[lineIndex].getAttribute('data-14');
  const dataver = itemGridEdit[lineIndex].getAttribute('data-15');
  const desempenho = itemGridEdit[lineIndex].getAttribute('data-16');
  const obser = itemGridEdit[lineIndex].getAttribute('data-17');

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




// ANIMAÇÕES DE INTERAÇÃO COM JQUERY --- FRONT END

$('.search--ico').click(function () {
  $('.room--list--search').toggleClass("active")
}
)
$('#table--button--filter--list').click(function () {
  $('#table--button--filter--list').toggleClass('selected');
  $('#table--button--filter--grid').removeClass('selected');
  $('.table--room').removeClass('change');
  $('.table--grid').removeClass('change');
})
$('#table--button--filter--grid').click(function () {
  $('#table--button--filter--grid').toggleClass('selected');
  $('#table--button--filter--list').removeClass('selected');
  $('.table--grid').toggleClass('change');
  $('.table--room').toggleClass('change');
})

$('.mobile--sec--style--toggle').click(function () {
  $('.circle--display').toggleClass('toggle');
  $('.table--grid').toggleClass('change');
  $('.table--room').toggleClass('change');
  $('#style--list').toggleClass('toggle');
  $('#style--grid').toggleClass('toggle');
})

document.addEventListener('click', (e) => {
  const isDropdownBtn = e.target.classList.contains('sidebar--toggle')
  if (!isDropdownBtn && e.target.closest('.sidebar--options') != null) return;

  if (isDropdownBtn) {

    $('.sidebar--options').toggleClass("down")

  }
  else {

    $('.sidebar--options').removeClass("down")

  }
})

//=========================FUNÇÃO PARA PRÉ VISUALIZAR IMAGEM USUÁRIO======================================//
photoPreview = document.getElementById('ghost--img--input');
document.getElementById('user--image').onclick = function() {
  photoPreview.click();
}
let sendImage = document.getElementById('ghost--img--input');
let preview = document.getElementById('user--image');
sendImage.addEventListener('change', function(e) {
  showThumbnail(this.files);
});
function showThumbnail(files) {
  if (files && files[0]) {
  var reader = new FileReader();

  reader.onload = function (e) {
    preview.src = e.target.result;
  }

      reader.readAsDataURL(files[0]);
  }
}

//=========================FUNÇÃO PARA ABRIR MENSAGEM DAS NOTIFICAÇÕES======================================//
const itemNotify = document.getElementsByClassName('notify--item');
function getNotifyItemIndex(){
for(x=0;x<itemNotify.length;x++){
          // arranjo os listeners com os index das linhas
          (function(index){
          itemNotify[x].addEventListener("click", function(){
            infoShowNotifyItem(index);
          });
          })(x);
      }
  }
function infoShowNotifyItem(element){
    console.log(element);
    id = itemNotify[element].getAttribute('data-id');
    console.log(id);
    $.ajax
    ({
        //Configurações
        type: 'POST',//Método que está sendo utilizado.
        dataType: 'html',//É o tipo de dado que a página vai retornar.
        url: '../app/log/openMessage.php',//Indica a página que está sendo solicitada.
        //função que vai ser executada assim que a requisição for enviada
        beforeSend: function () {
        },
        //Dados para envio
        data: {
            id: id
        },
        //função que será executada quando a solicitação for finalizada.
        success: function ()
        {
           $(".notify--item "+element).removeClass('new');
           getNotify ();
          }
    });

// removo os listeners
    for(x=0;x<itemNotify.length;x++){
        objclone = itemNotify[x].cloneNode(true);
        itemNotify[x].parentNode.replaceChild(objclone, itemNotify[x]);
    }
    getNotifyItemIndex();
}