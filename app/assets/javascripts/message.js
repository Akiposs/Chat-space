$(document).on('turbolinks:load', function() {

$(function(){
  function buildHTML(message){
    var content = message.content ?  `${ message.content }` : '';
    var img = message.image ? `<img class = "lower-message__image" src= ${message.image}>` : "";  
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
  
  $('#submit-btn').removeAttr('data-disable-with')

  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
        $('.messages').append(html)
        scroll()
    })
      .fail(function(){
        alert('error');
    })
  })
});
  setInterval(reloadMessages, 5000);
});