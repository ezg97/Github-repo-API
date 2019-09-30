'use strict';


function hide(element){
    //this function will hide a class
    if( !$(element).hasClass('hide') ){
        $(element).addClass('hide');
        console.log(`hiding class: ${element}`);
    }
}


function displayResults(responseJson) {
    hide('.error-message');
    console.log(responseJson);

  console.log(typeof responseJson.length);

  console.log(responseJson.length);
  console.log(responseJson[8].owner.login);
  
  console.log(responseJson[8].name);
  console.log(responseJson[8].description);
  console.log(responseJson[8]);
  console.log(responseJson[8].url);
  console.log(responseJson[8].html_url);

  $('.repo-results').empty();

  $('.user-name').replaceWith(`<h2 class="user-name">${responseJson[0].owner.login}</h2>`);
  $('.repo-amount').replaceWith(`<p class="repo-amount">Amount of Repos: ${responseJson.length}</p>`);
  for(let i=0; i<responseJson.length; i++){
    $('.repo-results').append(
        `<li class='repo'>
            <h3><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].name}</a></h3>
            <p>Description: ${responseJson[i].description}</p>
        </li>`
    );
  }

$('.display-results').removeClass('hide');

 
}

function getUser(user) {

  fetch(`https://api.github.com/users/${user}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        hide('.display-results');
        $('.error-message').removeClass('hide');

      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchUser = $('#js-search-user').val();
    getUser(searchUser);
  });
}

$(watchForm);