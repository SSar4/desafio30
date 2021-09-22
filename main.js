(function (DOM) {
  'use strict';

  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"
  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.
  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.
  Essas informações devem ser adicionadas no HTML via Ajax.
  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.
  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */
  function inicialize() {

    var $img = new DOM('[data-js="img"]');
    var $nomeFantasia = new DOM('[data-js="nomeFantasia"]')
    var $marca = new DOM('[data-js="marca"]');
    var $ano = new DOM('[data-js="ano"]');
    var $placa = new DOM('[data-js="placa"]');
    var $cor = new DOM('[data-js="cor"]');
    var $btnEnviar = new DOM('[data-js="enviar"]');
    var $table = new DOM('[data-js="table"]')
    var ajax = new XMLHttpRequest();

    ajax.addEventListener("readystatechange", showCompany);
    $btnEnviar.on("click", createComponente, false);

    function company() {
      ajax.open('get', 'company.json');
      enviar();
    };
    
    function showCompany() {
      const response = parse();
      if (isOk && response!=null) 
        $nomeFantasia.get()[0].textContent = response.nome+' telefone:'+response.telefone;   
    };

    function enviar() {
      return ajax.send(); 
    };

    function parse() {
      var result;
        try {
            result = JSON.parse(ajax.responseText);
        } catch (e) {
            result = null;
        }
        return result;
    };

    function isOk() {
      ajax.readyState === 4 && ajax.status === 200;
    };

    function createComponente() {

      var fragment = document.createDocumentFragment();
      var urlImage = document.createTextNode($img.element[0].value);
      var modelo = document.createTextNode($marca.element[0].value);
      var ano = document.createTextNode($ano.element[0].value);
      var placa = document.createTextNode($placa.element[0].value);
      var cor = document.createTextNode($cor.element[0].value)

      var childTR = document.createElement('tr');

      var childTDImage = document.createElement('td');
      var childTDmodelo = document.createElement('td');
      var childTDano = document.createElement('td');
      var childTDplaca = document.createElement('td');
      var childTDCor = document.createElement('td');

      childTR.appendChild(childTDImage);
      childTR.appendChild(childTDmodelo);
      childTR.appendChild(childTDano);
      childTR.appendChild(childTDplaca);
      childTR.appendChild(childTDCor);

      childTDImage.appendChild(urlImage);
      childTDmodelo.appendChild(modelo);
      childTDano.appendChild(ano);
      childTDplaca.appendChild(placa);
      childTDCor.appendChild(cor);

      fragment.appendChild(childTR)
      document.querySelector('table').appendChild(fragment);
    }

    company();
  }
  return inicialize()
})(window.DOM);