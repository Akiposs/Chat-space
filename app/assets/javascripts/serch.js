$(document).on('turbolinks:load', function() {

  $(function() {
    var search_list = $("#user-search-result");
    var add_user = $("#chat-group-users");

    function appendUser(user) {
      var html =  ` <div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${user.name}</p>
                      <a class="chat-group-user__btn chat-group-user__btn--add" date-user-id=${user.id} date-user-name=${user.name}>追加</a>
                  </div>`
      search_list.append(html);
    }

    function appendErrMsgToHTML(msg) {
      var html = ` <div class="chat-group-use clearfix">${ msg }</div>`
      search_list.append(html);
    }

    function addUserToGroup(user_id, user_name){
      var html =
        `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user_id }'>
          <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
          <p class='chat-group-user__name'>
            ${ user_name }
          </p>
          <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
        </div>`

      add_user.append(html);
    }

    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          }); 
        }
        else {
          appendErrMsgToHTML("一致するUserはいません");
        }
      })
      .fail(function() {
        alert('User検索に失敗しました');
      })
    });
    
    $('#user-search-result').on('click', '.chat-group-user__btn--add', function(){
      var user_id = $(this).attr("date-user-id");
      var user_name = $(this).attr("date-user-name");
      $(this).parent().remove();
      addUserToGroup(user_id, user_name);
    })
    $('#chat-group-users').on('click', '.js-remove-btn', function(){
      $($(this).parent()).remove();
    })
  });
});
