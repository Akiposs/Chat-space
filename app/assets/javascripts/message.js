$(document).on('turbolinks:load', function() {

$(function(){
  function buildHTML(message){
    var content = message.content ?  `${ message.content }` : '';
    var img  = message.image ?  `<img src="${message.image}" class="lower-message__image">` : " " ;
    var html = `<div class= 'message' data-id= ${message.id}> 
                  <div class= message__upper-info>
                    <p class= message__upper-info__talker>
                      ${message.user_name}
                    </p>
                    <p class= message__upper-info__date>
                      ${message.created_at}
                    </p>
                  </div>
                  <p class= message__text>
                  </p>
                  <p class= lower-message__content>
                    ${content}
                  </p>
                    ${ img }
                  </div>
                </div>`
    return html;
  }
  
  $('#submit-btn').removeAttr('data-disable-with');

  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    
    $('.form__submit').removeAttr('data-disable-with');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
       })
       .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('#new_message')[0].reset(); 
        scroll();
        
    })
       .fail(function(){
        alert('error');
    })
  });
  var reloadMessages = function() {
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      if($('.messages')[0]){
        var last_message_id = $('.message:last').data('id');
    }else {
        var last_message_id = 0
    }
    $.ajax({
      url: `api/messages/`,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(data) {
      data.forEach(function(message) {
        var html = buildHTML(message);
        $('.messages').append(html);
        scroll()
      });
    })
    .fail(function() {
      alert('自動更新が失敗しました！');
    });
    }else{
      clearInterval(reloadMessages);
    }
  };
    setInterval(reloadMessages,5000);
  });
});