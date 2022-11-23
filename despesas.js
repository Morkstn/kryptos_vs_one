//config.js
function setConfig(){
    
  
    document.title = texts.title;
    document.getElementById('navTitle').innerHTML = texts.title;
  
  }
  
  setConfig();
  
  
  //main.js
  
  var list = [
    {'desc': 'rice', 'amount': 1, 'price': 5.40},
    {'desc': 'beer', 'amount': 12, 'price': 1.99},
    {'desc': 'meat', 'amount': 1, 'price': 15.00}
  
  ];
  
  function getTotal(list){
    var total = 0;
  
    for(var key in list){
      total += list[key].price * list[key].amount;
    }
    document.getElementById('totalValue').innerHTML = formatPrice(total);
  }
  
  
  function setList(list){
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Price</td><td>Action</td></tr></thead>';
  
    for (var key in list){
      //Poderíamos organizar em uma só linha ou então em várias linhas como abaixo:
      table += '<tr>'+
                  '<td>'+ formatDescription(list[key].desc) + '</td>' +
                  '<td>'+ formatAmount(list[key].amount) +'</td>' +
                  '<td>'+ formatPrice(list[key].price) +'</td>' +
                  '<td> <button class="btn btn-default" onclick="setUpdate('+ key +');" ><span class="glyphicon glyphicon-edit"></span></button>  <button class="btn btn-default btn-danger" onclick="deleteData('+ key +');" ><span class="glyphicon glyphicon glyphicon-trash"></span></button></td>' +
                '</tr>';
    }
    table += '</tbody>'
    document.getElementById('listTable').innerHTML = table;
  
    //tota vez que alguma função utilizar setList(), será executado o getTotal()
    getTotal(list);
    //quando atualizar a lista, salva no localStorage
    saveListStorage(list);
  }
  
  
  function formatDescription(description){
    var string = description.toLowerCase();
    string = string.charAt(0).toUpperCase() + string.slice(1); //CharAt: pega a primeira letra da palavra; toUpperCase: primeira letra maiuscula; slice(1): retorna os caracteres a partir da primeira posição
    return string;
  }
  
  
  function formatAmount(amount){
  
    return parseInt(amount);
  }
  
  
  function formatPrice(price){
  
    var string = parseFloat(price).toFixed(2) + ''; //toFixed(): determina o número de casas decimais; concatenação com valor vazio transforma-o em string novamente, para poder dar um replace.
    string = string.replace('.',','); //ponto para virgula
    string = 'R$ ' + string;
    return string;
  
  
  }
  
  function addData(){
    //se a validação retornar negativa = 0, simplesmente return
    //se for positiva ela continua
    if(!validateForm()){
      return;
    }
  
    var description = document.getElementById('description').value;
    var amount = document.getElementById('amount').value;
    var price = document.getElementById('price').value;
    formatPrice(price);
    list.unshift({'desc': description, 'amount': amount, 'price': price});
    setList(list); //atualiza a tabela
    resetForm();
  
  }
  
  
  function setUpdate(id){
    //captura o objeto da lista de acordo com o id
    var object = list[id];
    document.getElementById('description').value = object.desc;
    document.getElementById('amount').value = object.amount;
    document.getElementById('price').value = object.price;
  
    //troca visibilidade de botões
    document.getElementsByClassName('btnUpdate')[0].style.display = 'inline-block';
    document.getElementsByClassName('btnAdd')[0].style.display = 'none';
  
    //Cria um input hidden o HTML, e utilizamos na função para atualizar
    document.getElementsByClassName('inputIdUpdate')[0].innerHTML = '<input type="hidden" id="idUpdate" value="'+ id +'">';
  
    //Oculta errors
    document.getElementById('errors').style.display = 'none';
  
  }
  
  
  function resetForm(){
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('price').value = '';
  
    document.getElementsByClassName('btnUpdate')[0].style.display = 'none';
    document.getElementsByClassName('btnAdd')[0].style.display = 'inline-block';
  
    //Limpar o input hidden
    document.getElementsByClassName('inputIdUpdate')[0].innerHTML = '';
    //desaperecer os erros
    document.getElementById('errors').style.display = 'none';
  }
  
  
  function updateData(){
    //se a validação retornar negativa = 0, simplesmente return
    //se for positiva ela continua
    if(!validateForm()){
      return;
    }
    //Captura o id do produto
    var id = document.getElementById('idUpdate').value;
  
    //Captura os valores dos inputs
    var newDescription = document.getElementById('description').value;
    var newAmount = document.getElementById('amount').value;
    var newPrice = document.getElementById('price').value;
  
    //Adiciona os novos dados ao produto com aquele id
    list[id] = {'desc': newDescription, 'amount': newAmount, 'price': newPrice};
  
    resetForm(); //limpa o formulário
    setList(list); //atualiza os dados da tabela
  }
  
  
  function deleteData(id){
    if (confirm('Delete this product?')) {
      //Se id for igual ao último registro da lista
  
      if(id === list.length -1){
        //remove o último item da lista
        list.pop();
  
        //se for igual ao primeiro item
      } else if(id === 0){
        //limpa o primeiro registro de um array
        list.shift();
  
      } else {
        //slice: cria um novo array com os indices passados para ele
        //inicio: pega do zero até antes do id
        //fim: pega um índice após o id até o final
        var arrayAuxiliarStart = list.slice(0, id);
        var arrayAuxiliarEnd = list.slice(id + 1); // = list.slice(id + 1, list.length)
        list = arrayAuxiliarStart.concat(arrayAuxiliarEnd);
      }
  
      setList(list);
    }
    //Oculta errors
    document.getElementById('errors').style.display = 'none';
  }
  
  function validateForm(){
    var description = document.getElementById('description').value,
        amount = document.getElementById('amount').value,
        price = document.getElementById('price').value,
        errors = '';
  
    document.getElementById('errors').style.display = 'none';
  
  
    if (description === ''){
      errors += '<p class="alert alert-danger">Fill out description.</p>';
    }
  
    if(amount === ''){
      errors += '<p class="alert alert-danger">Fill out amount.</p>';
    } else if(amount != parseInt(amount)){
      errors += '<p class="alert alert-danger">Fill out a valid amount.</p>';
    }
  
    if(price ==='')    {
      errors += '<p class="alert alert-danger">Fill out price.</p>';
    } else if(price != parseFloat(price)){
      errors += '<p class="alert alert-danger">Fill out a valid price.</p>';
    }
  
    if(errors != ''){
      document.getElementById('errors').style.display = 'block';
      document.getElementById('errors').innerHTML = '<h3 class="errors-heading">Error:</h3>' + errors;
      return 0;
    } else{
      return 1;
    }
  
  }
  
  
  function deleteList() {
    if(confirm('Delete this list?')){
      list = [];
      setList(list);
    }
  
  }
  
  
  function saveListStorage(list){
    //salvar no localStorage do usuário, aceita-se apenas strings
    // transforma o nosso array em formato string para json
    var jsonStr = JSON.stringify(list)
  
    localStorage.setItem('list', jsonStr);
  }
  
  function initListStorage(){
    //se a lista existir ele vai atualiza-la, senão deixará nulo
    var testList = localStorage.getItem('list');
    if(testList){
      // para transformar de string para objeto utiliza-se a função:
      list = JSON.parse(testList);
    }
    setList(list);
  }
  
  initListStorage() // ao invés de setList(list);
  