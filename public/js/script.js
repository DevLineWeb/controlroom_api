$(document).ready(function() {
  objectList();
  getNotify();
  addVerGroups ();
  getUserImage();
  
});
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
                $('.ajax--load').removeClass('show');
                $("#welcome--session").html(msg);
                $("#user--session--name").html(msg);
                if(msg=='invalid') {
                  location.href = './acess.html';
                }
              }
          });
}

// _________________________________________________________________________________
// ___________________________________LISTAGEM______________________________________
// _________________________________________________________________________________
function objectList() {
  $.ajax
    ({
        type: 'POST',
        dataType: 'html',
        url: '../app/interface/listagem.php',
        data: "method=object--list",
        beforeSend: function () {
          
        },
        success: function (data)
        {
            $('#table--room--itens').html(data);
            getLineIndex();
        }
    });
    listChangeState(1);
}
function groupList() {
  $.ajax
  ({
      type: 'POST',
      dataType: 'html',
      url: '../app/interface/listagem.php',
      data: "method=group--list",
      beforeSend: function () {
        
      },
      success: function (data)
      {
          $('#table--grid').html(data);
          getIndexItemGrid();
          getLineIndexGrid();
  }
  });
  listChangeState(2);
}
function userList() {
  $.ajax
    ({
        type: 'POST',
        dataType: 'html',
        url: '../app/interface/listagem.php',
        data: "method=user--list",
        beforeSend: function () {
          $('#modal--add--room').removeClass("show");
                $('.ajax--load').toggleClass('show');
                $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
        },
        success: function (data)
        {
            $('#list--user').html(data);
            $('.ajax--load').removeClass('show');
            getLineUserIndex();
    }
    });
    listChangeState(3);
}

function eventList() {
  $.ajax
    ({
        type: 'POST',
        dataType: 'html',
        url: '../app/interface/listagem.php',
        data: "method=log--list",
        beforeSend: function () {
          $('#modal--add--room').removeClass("show");
                $('.ajax--load').toggleClass('show');
                $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
        },
        success: function (data)
        {
            $('#events--list').html(data);
            $('.ajax--load').removeClass('show');
            // pegar indice de linha listada
            getEventIndex();
    }
    });
    $('.table--room').removeClass('change');
    $('.table--grid').removeClass('change');
    $('.circle--display').removeClass('toggle');
    $('#style--list').removeClass('toggle');
    $('#style--grid').removeClass('toggle');
    listChangeState(4);
}



function listChangeState(state) {
  const objectBlock = document.querySelector('.table--room');
  const groupBlock = document.querySelector('.table--grid');
  const usersBlock = document.querySelector('.user--list--case');
  const eventsBlock = document.querySelector('.events--list--case');

  const objectBtn = document.querySelector('#table--button--filter--list');
  const groupBtn = document.querySelector('#table--button--filter--grid');
  const usersBtn = document.querySelector('#table--button--filter--user');


  if (state == 1) {

    objectBlock.style.left = "0px"
    groupBlock.style.left = "2000px"
    usersBlock.style.left = "4000px"
    eventsBlock.style.left = "6000px"
    $('.circle--display').removeClass('toggle');
    $('#style--list').removeClass('toggle');
    $('#style--grid').removeClass('toggle');

    blockColor(objectBtn);
  }
  if (state == 2) {

    objectBlock.style.left = "-2000px"
    groupBlock.style.left = "0px"
    usersBlock.style.left = "2000px"
    eventsBlock.style.left = "4000px"

    blockColor(groupBtn);
  }
  if (state == 3) {

    objectBlock.style.left = "-4000px"
    groupBlock.style.left = "-2000px"
    usersBlock.style.left = "0px"
    eventsBlock.style.left = "2000px"

    $('.circle--display').removeClass('toggle');
    $('#style--list').removeClass('toggle');
    $('#style--grid').removeClass('toggle');

    blockColor(usersBtn);
  }
  if (state == 4) {
    objectBlock.style.left = "-6000px"
    groupBlock.style.left = "-4000px"
    usersBlock.style.left = "-2000px"
    eventsBlock.style.left = "0px"

    blockColor(usersBtn)
  }
  function blockColor(blockRef) {
    objectBtn.style.color = "#ffffff";
    groupBtn.style.color = "#ffffff";
    usersBtn.style.color = "#ffffff";

    objectBtn.style.borderColor = "#24272c";
    groupBtn.style.borderColor = "#24272c";
    usersBtn.style.borderColor = "#24272c";

    blockRef.style.color = "#51e5a1";
    blockRef.style.borderColor = "#51e5a1";
  }

}
// _________________________________________________________________________________
// ____________________________MANIPULAÇÃO DE OBJETOS_______________________________
// _________________________________________________________________________________

// ADD
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
                  objectList();
                  getNotify();
                }
            });
}
function addUser() {
const user_name = document.getElementById('add--user--name').value;
const user_mail = document.getElementById('add--user--mail').value;
const user_unit = document.getElementById('add--user--unit').value;
const user_perm = document.getElementById('add--user--perm').value;
const user_pass = document.getElementById('add--user--pass').value;
  $.ajax
          ({
              //Configurações
              type: 'POST',//Método que está sendo utilizado.
              dataType: 'html',//É o tipo de dado que a página vai retornar.
              url: '../app/interface/cadastro_user.php',//Indica a página que está sendo solicitada.
              //função que vai ser executada assim que a requisição for enviada
              beforeSend: function () {
                $('#modal--add--room').removeClass("show");
                $('.ajax--load').toggleClass('show');
                $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              //Dados para envio
              data: {
                user_name: user_name,
                user_mail: user_mail,
                user_unit: user_unit,
                user_perm: user_perm,
                user_pass: user_pass
              },
              //função que será executada quando a solicitação for finalizada.
              success: function (msg)
              {
                $(".ajax--request--feedback").html(msg);
              }
          });
}
// EDIT
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
                 objectList();
                 getNotify();
              }
          });
}
// DELETE
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
         objectList();
         getNotify();
      }
  });
}
// ADD GROUP
function addGroup() {
  const groupName = document.getElementById('add--group--name').value;

  $.ajax
          ({
              //Configurações
              type: 'POST',//Método que está sendo utilizado.
              dataType: 'html',//É o tipo de dado que a página vai retornar.
              url: '../app/interface/cadastro_group.php',//Indica a página que está sendo solicitada.
              //função que vai ser executada assim que a requisição for enviada
              beforeSend: function () {
                $('.add--group').removeClass("show");
                $('.ajax--load').toggleClass('show');
                $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              //Dados para envio
              data: {
                groupName: groupName
              },
              //função que será executada quando a solicitação for finalizada.
              success: function (msg)
              {
                $(".ajax--request--feedback").html(msg);
                groupList();
              }
          });
}
// _________________________________________________________________________________
// __________________________________JAVASCRIPT_____________________________________
// _________________________________________________________________________________
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
// FUNÇÃO DE PESQUISA
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
  $('#modal--edit--user').removeClass('show');
  $('#modal--upload--image').removeClass('show');
  $('#modal--add--user').removeClass('show');
  $('#modal--event--info').removeClass('show');
}
function openModalEdit() {
  $('#modal--edit--room').toggleClass("show");

}
function openModalAdd() {
  $('#modal--add--room').toggleClass("show");
  addVerGroups();
}

function openModalAddUser() {
  $('#modal--add--user').toggleClass("show");
}
function openModalNotify() {
  $('#modal--notify').toggleClass('show');
}
function openGroupAdd() {
  $('.add--group').toggleClass('show');
}
$('.search--ico').click(function () {
  $('.room--list--search').toggleClass("active")
}
)
$('.mobile--sec--style--toggle').click(function () {
  $('.circle--display').toggleClass('toggle');
  $('#style--list').toggleClass('toggle');
  $('#style--grid').toggleClass('toggle');
  listChangeState(2);
  groupList();
})
// _________________________________________________________________________________
// ____________________________INFORMAÇÕES DE USUARIO_______________________________
// _________________________________________________________________________________
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
                // getRecently();
              }
          });
}
// function getRecently (){
//   $.ajax
//           ({
//               type: 'POST',
//               dataType: 'html',
//               url: '../app/log/notifications.php',
//               data: "method=getRecently",
//               beforeSend: function () {
//                 $("#user--session--logs").html("<img src='./img/Rolling-0.7s-204px.gif'>");
//               },
//               success: function (msg)
//               {
//                 $("#user--session--logs").html(msg);
//               }
//           });
// }
function getNotify (){
  $.ajax
          ({
              type: 'POST',
              dataType: 'html',
              url: '../app/log/notifications.php',
              data: "method=getNotify",
              beforeSend: function () {
                $("#notify--case").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              success: function (msg)
              {
                $("#notify--case").html(msg);
                getNotifyItemIndex();
                if ($('.notify--item').hasClass('new')) {
                    $('.notify--button').toggleClass('new');
                }
                else {
                    $('.notify--button').removeClass('new');
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
function getUserImage() {
  $.ajax
          ({
              //Configurações
              type: 'POST',//Método que está sendo utilizado.
              dataType: 'html',//É o tipo de dado que a página vai retornar.
              url: '../app/interface/user_image.php',//Indica a página que está sendo solicitada.
              //função que vai ser executada assim que a requisição for enviada
              beforeSend: function () {
                $('.ajax--load').toggleClass('show');
                $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              //função que será executada quando a solicitação for finalizada.
              success: function (msg)
              {
                $('.ajax--load').removeClass('show');
                $("#mobile--user--image").attr('src', msg);
              }
          });
}
// _________________________________________________________________________________
// _______________________________MENU--MOBILE______________________________________
// _________________________________________________________________________________
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



// _________________________________________________________________________________
// _______________________________GET__INDEX________________________________________
// _________________________________________________________________________________
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
           getNotify();
          }
    });

// removo os listeners
    for(x=0;x<itemNotify.length;x++){
        objclone = itemNotify[x].cloneNode(true);
        itemNotify[x].parentNode.replaceChild(objclone, itemNotify[x]);
    }
    getNotifyItemIndex();
}
const ListClickedItem = document.getElementsByClassName('table--room--config--button');
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

    // $('.table--item--more'+'.'+element).toggleClass('show');
  

// removo os listeners
    for(x=0;x<ListClickedItem.length;x++){
        objclone = ListClickedItem[x].cloneNode(true);
        ListClickedItem[x].parentNode.replaceChild(objclone, ListClickedItem[x]);
    }
getLineIndex();
}
function getEditInfos (lineIndex) {
  const id = ListClickedItem[lineIndex].getAttribute('data-id');
  const natureza = ListClickedItem[lineIndex].getAttribute('data-01');
  const localidade = ListClickedItem[lineIndex].getAttribute('data-02');
  const nomenclatura = ListClickedItem[lineIndex].getAttribute('data-03');
  const modelo = ListClickedItem[lineIndex].getAttribute('data-04');
  const patrimonio = ListClickedItem[lineIndex].getAttribute('data-05');
  const serie = ListClickedItem[lineIndex].getAttribute('data-06');
  const rede = ListClickedItem[lineIndex].getAttribute('data-07');
  const cpu = ListClickedItem[lineIndex].getAttribute('data-08');
  const gpu = ListClickedItem[lineIndex].getAttribute('data-09');
  const ram = ListClickedItem[lineIndex].getAttribute('data-10');
  const disco = ListClickedItem[lineIndex].getAttribute('data-11');
  const monitor = ListClickedItem[lineIndex].getAttribute('data-12');
  const cadeado = ListClickedItem[lineIndex].getAttribute('data-13');
  const cabo = ListClickedItem[lineIndex].getAttribute('data-14');
  const dataver = ListClickedItem[lineIndex].getAttribute('data-15');
  const desempenho = ListClickedItem[lineIndex].getAttribute('data-16');
  const obser = ListClickedItem[lineIndex].getAttribute('data-17');

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
const GridClickedItem = document.getElementsByClassName("grid--col");
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
              url: '../app/interface/grupos.php',
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
const userClickedInfos = document.getElementsByClassName('user--config--button');
function getLineUserIndex(){
for(x=0;x<userClickedInfos.length;x++){
        // arranjo os listeners com os index das linhas
        (function(index){
        userClickedInfos[x].addEventListener("click", function(){
            userInfoShow(index);
        });
        })(x);
    }
}
function userInfoShow(element){
  getUserEditInfos(element);
  console.log(element);
  $('#modal--edit--user').toggleClass('show');

// removo os listeners
    for(x=0;x<userClickedInfos.length;x++){
        objclone = userClickedInfos[x].cloneNode(true);
        userClickedInfos[x].parentNode.replaceChild(objclone, userClickedInfos[x]);
    }
    getLineUserIndex();
}
// AO CLICAR LEVA OS DADOS PARA O MODAL DE EDIÇÃO
function getUserEditInfos (userIndex) {
  const id = userClickedInfos[userIndex].getAttribute('data-id');
  const user = userClickedInfos[userIndex].getAttribute('data-01');
  const user_name = userClickedInfos[userIndex].getAttribute('data-04');
  const user_perm = userClickedInfos[userIndex].getAttribute('data-03');
  const user_password = userClickedInfos[userIndex].getAttribute('data-02');
  const user_unit = userClickedInfos[userIndex].getAttribute('data-05');
  const user_img = userClickedInfos[userIndex].getAttribute('data-06');
  $('#user--edit--id').val(id);
  $('#user--edit--name').val(user_name);
  $('#user--edit--mail').val(user);
  $('#user--edit--password').val(user_password);
  $('#user--edit--perm').val(user_perm);
  $('#user--edit--unit').val(user_unit);
  $('#user--edit--img').attr('src', '../app/data/users_images/'+user_img);
}

const logInfoButton = document.getElementsByClassName('event--info--button');
function getEventIndex(){
for(x=0;x<logInfoButton.length;x++){
          // arranjo os listeners com os index das linhas
          (function(index){
          logInfoButton[x].addEventListener("click", function(){
            infoShowEvent(index);
          });
          })(x);
      }
  }
function infoShowEvent(element){
    console.log(element);
    id = logInfoButton[element].getAttribute('data-id');
    event_protocol = logInfoButton[element].getAttribute('data-01');
    event_user = logInfoButton[element].getAttribute('data-02');
    event_message = logInfoButton[element].getAttribute('data-03');
    event_date = logInfoButton[element].getAttribute('data-04');
    event_object = logInfoButton[element].getAttribute('data-05');
    console.log(event_object);

    $('#modal--event--info').toggleClass('show');

    $('#event--info--title').text(id);
    $('#event--info--object').val(event_object);
    $('#event--info--user').val(event_user);
    $('#event--info--message').val(event_message);


// removo os listeners
    for(x=0;x<logInfoButton.length;x++){
        objclone = logInfoButton[x].cloneNode(true);
        logInfoButton[x].parentNode.replaceChild(objclone, logInfoButton[x]);
    }
    getEventIndex();
}

// ====================================================FUNÇÕES DE VERIFICAÇÃO PARA CADASTRO=======================================//
function addVerGroups (){
  $.ajax
    ({
        type: 'POST',
        dataType: 'html',
        url: '../app/data/valid_cadastro.php',
        data: "method=select--group",
        beforeSend: function () {
        },
        success: function (data)
        {
            $('#localidade').html(data);
            $('#edit--show--localidade').html(data);
    }
    });
}

function addVerUnit(){
  // const groupChange = $('#localidade').find(":selected");
  // const unitRel = groupChange[0].getAttribute('data-01')
  
  // if (unitRel == 1) {
  //   $('#add--unit').val('FSG')
  // }
  // if (unitRel == 2) {
  //   $('#add--unit').val('FSGBG')
  // }

}

function addVerObjectName(){

}

function addVerUserMail() {
  const userName = document.getElementById('add--user--name').value
  const secondName = document.getElementById('add--user--second--name').value
  const fistIndex = userName.substr(0, 1);
  const userMail = fistIndex.toLowerCase() + secondName.toLowerCase().split(' ').slice(0, 1);
  $('#add--user--mail').val(userMail+'@control.com');
  
}

$( ".password--eye" ).mousedown(function() {
  $("#add--user--pass").attr("type", "text");
});

$( ".password--eye" ).mouseup(function() {
  $("#add--user--pass").attr("type", "password");
});
// =========================================================================================================//
// ======================================================EDIÇÃO DE USUÁRIO=====================================//
// =========================================================================================================//

// =================================================PRÉ VISUALIZAÇÃO DE IMAGEM=================================//
function imageUpdateCase() {
  $('#modal--upload--image').toggleClass('show');
}
function imagePreview() {
  photoPreview = document.getElementById('ghost--img--input');
  photoPreview.click();
  let sendImage = document.getElementById('ghost--img--input');
  let preview = document.getElementById('session--img');
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
}
$("#user--image--form").submit(function(event) {
  event.preventDefault();
  const formData = new FormData($(this)[0]);

    $.ajax({
      url: '../app/interface/upload_img.php',
      type: 'POST',
      data: formData,
      beforeSend: function () {
        $('.ajax--load').toggleClass('show');
        $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
      },
      async: false,
      cache: false,
      contentType: false,
      processData: false,
      success: function (msg)
      {
        $(".ajax--request--feedback").html(msg);
      }
    });
});

// =====================================================EDIÇÃO DE USUÁRIO NA LISTAGEM====================================//
function editUser() {
  id = document.getElementById('user--edit--id').value;
  user_name = document.getElementById('user--edit--name').value;
  user_mail = document.getElementById('user--edit--mail').value;
  user_password = document.getElementById('user--edit--password').value;
  user_perm = document.getElementById('user--edit--perm').value;
  user_unit = document.getElementById('user--edit--unit').value;

  $.ajax
          ({
              //Configurações
              type: 'POST',//Método que está sendo utilizado.
              dataType: 'html',//É o tipo de dado que a página vai retornar.
              url: '../app/interface/editar_users.php',//Indica a página que está sendo solicitada.
              //função que vai ser executada assim que a requisição for enviada
              beforeSend: function () {
                $('#modal--add--room').removeClass("show");
                $('.ajax--load').toggleClass('show');
                $(".ajax--request--feedback").html("<img src='./img/Rolling-0.7s-204px.gif'>");
              },
              //Dados para envio
              data: {
                  id: id,
                  user_name: user_name,
                  user_mail: user_mail,
                  user_password: user_password,
                  user_perm: user_perm,
                  user_unit: user_unit
              },
              //função que será executada quando a solicitação for finalizada.
              success: function (msg)
              {
                 $(".ajax--request--feedback").html(msg);
                //  userList();
  objectList();
              }
          });
}