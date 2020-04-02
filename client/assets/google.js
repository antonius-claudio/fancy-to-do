function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    let token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:3000/google-sign-in',
        method: 'POST',
        data: {
            token
        }
    })
    .done((result) => {
      M.toast({html: `Welcome and wait a sec ...`, completeCallback: function(){ 
        localStorage.setItem('token', result.token)
        /// ambil data todos
        $.ajax({
          url: "http://localhost:3000/todos",
          method: 'GET',
          headers: {
            token: result.token
          }
        })
        .done((result) => {
          result.todos.forEach(i => {
            $('#dataTodos').append(`
              <tr class="todo" data-todoID="${i.id}">
                <td>${i.title}</td>
                <td>${i.description}</td>
                <td>${i.status}</td>
                <td>${i.due_date}</td>
              </tr>
            `);
          })
        })
        .fail((err) => {
          M.toast({html: `${err}`});
        })
        // ----------------------------------
        $('#menuRegis').hide();
        $('#menuLogin').hide();
        $('#menuTodo').show();
        $('#menuLogout').show();
        $('#divRegister').hide();
        $('#divLogin').hide();
        $('#divTodo').show();
      }});
  })
  .fail((err) => {
    err.responseJSON.forEach(i => {
        M.toast({html: `${i}`});
    })
  })
}