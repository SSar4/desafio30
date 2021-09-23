(function (DOM) {
    'use strict';
  
    function inicialize() {
  
      var $img = new DOM('[data-js="img"]');
      var $nomeFantasia = new DOM('[data-js="nomeFantasia"]')
      var $marca = new DOM('[data-js="marca"]');
      var $ano = new DOM('[data-js="ano"]');
      var $placa = new DOM('[data-js="placa"]');
      var $cor = new DOM('[data-js="cor"]');
      var $btnEnviar = new DOM('[data-js="enviar"]');

      $btnEnviar.on("click",registerCar , false);
  
      function isOk(ajax) {
        return ajax.readyState === 4 && ajax.status === 200;
      };

      function parse(text) {
        var result;
          try {
              result = JSON.parse(text);
          } catch (e) {
              result = null;
          }
          return result;
      };
    
      function company() {
       const ajax = request('get', 'company.json','');
        showCompany(ajax);
      };

      const showCompany = function showCompany(ajax) {
        ajax.addEventListener("readystatechange", function () {
            if(isOk(ajax)){
            const inf = parse(ajax.responseText)
            $nomeFantasia.get()[0].textContent = inf.nome+' telefone:'+inf.telefone;
            };
        });
      };

      function getCar() {
        request('get', 'http://localhost:3000/','');
        showCars(newReq)
      };

      function request(method,url,data) {
        var newReq = new XMLHttpRequest();
        newReq.open(method,url);
        newReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        newReq.send(data)
      };

      const showCars = function (newReq) {
        newReq.addEventListener("readystatechange", function () {
            if(isOk(newReq)){
            const cars = parse(newReq.responseText);
            for (let index = 0; index < cars.length; index++) {
                createComponente( cars[index].image,cars[index].brandModel,cars[index].year,cars[index].plate,cars[index].color);
            };
            };
        });
      };

      function registerCar(){
        request('post','http://localhost:3000/',`image=${$img.element[0].value}&brandModel=${$marca.element[0].value}&year=${$ano.element[0].value}&plate=${$placa.element[0].value}&color=${$cor.element[0].value}`)
        createComponente($img.element[0].value,$marca.element[0].value,$ano.element[0].value,$placa.element[0].value,$cor.element[0].value);
    };

      
      
      function createComponente(img,marca,ano,placa,cor) {

        var fragment = document.createDocumentFragment();
        var urlImage = document.createTextNode(img);
        var modelo = document.createTextNode(marca);
        var ano = document.createTextNode(ano);
        var placa = document.createTextNode(placa);
        var cor = document.createTextNode(cor)
        var excluir = document.createTextNode('excluir');
  
        var childTR = document.createElement('tr');
  
        var childTDImage = document.createElement('td');
        var childTDmodelo = document.createElement('td');
        var childTDano = document.createElement('td');
        var childTDplaca = document.createElement('td');
        var childTDCor = document.createElement('td');
        var colExcluir = document.createElement('td');
  
        childTR.appendChild(childTDImage);
        childTR.appendChild(childTDmodelo);
        childTR.appendChild(childTDano);
        childTR.appendChild(childTDplaca);
        childTR.appendChild(childTDCor);
        childTR.appendChild(colExcluir);
  
        colExcluir.addEventListener('click',function () {
          document.querySelector('table').removeChild(childTR)
        },false)
        
        childTDImage.appendChild(urlImage);
        childTDmodelo.appendChild(modelo);
        childTDano.appendChild(ano);
        childTDplaca.appendChild(placa);
        childTDCor.appendChild(cor);
        colExcluir.append(excluir);
        fragment.appendChild(childTR);
  
        document.querySelector('table').appendChild(fragment);
      };
  
    company();
    getCar();
    
    };

    return inicialize()
  })(window.DOM);