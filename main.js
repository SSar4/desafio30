(function (DOM) {
  'use strict';

 /*
Agora vamos criar a funcionalidade de "remover" um carro. Adicione uma nova
coluna na tabela, com um botão de remover.
Ao clicar nesse botão, a linha da tabela deve ser removida.
Faça um pull request no seu repositório, na branch `challenge-31`, e cole
o link do pull request no `console.log` abaixo.
Faça um pull request, também com a branch `challenge-31`, mas no repositório
do curso, para colar o link do pull request do seu repo.
*/

  function inicialize() {

    var $img = new DOM('[data-js="img"]');
    var $nomeFantasia = new DOM('[data-js="nomeFantasia"]')
    var $marca = new DOM('[data-js="marca"]');
    var $ano = new DOM('[data-js="ano"]');
    var $placa = new DOM('[data-js="placa"]');
    var $cor = new DOM('[data-js="cor"]');
    var $btnEnviar = new DOM('[data-js="enviar"]');
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
  }
  return inicialize()
})(window.DOM);