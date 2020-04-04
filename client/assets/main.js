if (!localStorage.getItem('token')) {
  $('#formRegister').submit(function (e) {
      e.preventDefault();
      let email = $('#emailRegister').val();
      let password = $('#passwordRegister').val();
      
      // AJAX POST
      $.ajax({
          url: "http://localhost:3000/register",
          method: "POST",
          data: {
              email, 
              password
          }
      })
      .done((result) => {
          M.toast({html: `Registered and wait a sec ...`, completeCallback: function(){ 
            localStorage.setItem('token', result.token)
            $('#emailRegister').val('');
            $('#passwordRegister').val('');
            page();
          }});

      })
      .fail((err) => {
        err.responseJSON.forEach(i => {
            M.toast({html: `${i}`});
          })
      })
  });

  $('#formLogin').submit(function (e) {
    e.preventDefault();
    let email = $('#emailLogin').val();
    let password = $('#passwordLogin').val();
    // AJAX POST
    $.ajax({
        url: "http://localhost:3000/login",
        method: "POST",
        data: {
            email, 
            password
        }
    })
    .done((result) => {
        M.toast({html: `Welcome and wait a sec ...`, completeCallback: function(){ 
          localStorage.setItem('token', result.token);
          $('#emailLogin').val('');
          $('#passwordLogin').val('');
          page();
        }});
    })
    .fail((err) => {
      err.responseJSON.forEach(i => {
          M.toast({html: `${i}`});
      })
    })
  });

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    let token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: 'http://localhost:3000/google-sign-in',
        method: 'POST',
        data: {
            token
        }
    })
    .done((result) => {
      M.toast({html: `Welcome and wait a sec ...`, completeCallback: () => { 
        localStorage.setItem('token', result.token)
        page();
      }})

    })
    .fail((err) => {
      err.responseJSON.forEach(i => {
          M.toast({html: `${i}`});
      })
    })
  }
}


function page() {
  if (localStorage.getItem("token")) {
    $('#menuRegis').hide();
    $('#menuLogin').hide();
    $('#menuTodo').show();
    $('#menuLogout').show();
    $('#divLogin').hide();
    $('#divRegister').hide();
    $('#divTodo').show();
    /// ambil data todos
      getAllTodos();
    // -----------------
  } else {
    $('#menuTodo').hide();
    $('#menuLogout').hide();
    $('#divRegister').hide();
    $('#divLogin').show();
    $('#divTodo').hide();
  }
}
$(document).ready(() => {
  
  page();

  $('#menuRegis').click(function() {
      $('#divLogin').hide();
      $('#divTodo').hide();
      $('#menuLogout').hide();
      $('#divRegister').show();
  })

  $('#menuLogin').click(function() {
      $('#divTodo').hide();
      $('#divRegister').hide();
      $('#menuLogout').hide();
      $('#divLogin').show();
  })

  $('#menuTodo').click(function() {
    $('#divTodo').show();
    $('#menuTodo').show();
    $('#menuLogout').show();
    $('#divRegister').hide();
    $('#divLogin').hide();
    $('#menuRegis').hide();
    $('#menuLogin').hide();
  })
  
  $('#menuLogout').click(function() {
    localStorage.removeItem('token');
    $('#dataTodos').empty();
    $('#divTodo').hide();
    $('#divRegister').hide();
    $('#divLogin').show();
    $('#menuLogout').hide();
    $('#menuTodo').hide();
    $('#menuRegis').show();
    $('#menuLogin').show();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  })
  
  

  $('#formAdd').hide();

  $('#btnAddTodo').click(function() {
    if($("#formAdd").is(":visible")){
      $('#formAdd').hide();
    } else {
      $('#formAdd').show();
    }
  })

  $('.datepicker').datepicker({
    dateFormat: "yyyy-mm-dd"
  });

  $('#formAdd').submit(function(e) {
    e.preventDefault();
    let title = $('#titleTodo').val();
    let description = $('#descriptionTodo').val();
    // let status = $('#statusTodo').val();
    let due_date = $('#dueDateTodo').val();
    $.ajax({
      url: "http://localhost:3000/todos",
      method: 'POST',
      headers: {
        token: localStorage.getItem("token")
      },
      data: {
        title,
        description,
        // status,
        due_date
      }
    })
    .done((result) => {
    $('#titleTodo').val('');
    $('#descriptionTodo').val('');
    $('#statusTodo').val('');
    $('#dueDateTodo').val('');
    $('#formAdd').hide();
    $('#dataTodos').append(`
      <tr class="todo" data-todoID="${result.newTodo.id}">
        <td>${result.newTodo.title}</td>
        <td>${result.newTodo.description}</td>
        <td>${result.newTodo.status}</td>
        <td>${result.newTodo.due_date}</td>
      </tr>
    `);
    })
    .fail((err) => {
      err.responseJSON.forEach(i => {
        M.toast({html: `${i}`});
      })
    })
  })

  let selected = null;
  $(document.body).on('click','.todo', function () {
    let classSelected = 'selectd';
    $('.todo').removeClass(classSelected);
    $(this).addClass(classSelected);
    selected = $(this);
  })

  $('#btnDeleteTodo').click(function () {
    if (selected) {
      let todoId = selected.attr('data-todoId');
      $.ajax({
        url: `http://localhost:3000/todos/${todoId}`,
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .done((result) => {
        M.toast({html: `Deleted`});
        selected.remove();
        selected = null;
      })
      .fail((err) => {
        M.toast({html: `${JSON.stringify(err)}`});
      })
    } else {
      M.toast({html: `Select 1 item to delete!`});
    }
  })

  $('#btnUpdateTodo').click(function () {
    if (selected) {
      let todoId = selected.attr('data-todoId');
      $.ajax({
        url: `http://localhost:3000/todos/${todoId}`,
        method: 'PUT',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .done((result) => {
        M.toast({html: `Completed`});
        selected.remove();
        selected = null;
      })
      .fail((err) => {
        M.toast({html: `${JSON.stringify(err)}`});
      })
    } else {
      M.toast({html: `Select 1 item to update!`});
    }
  })  
  
  $('#btnAddEvent').click(function () {
    if (selected) {
      let todoId = selected.attr('data-todoId');
      $.ajax({
        url: `http://localhost:3000/todos/event/${todoId}`,
        method: 'GET',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .done((result) => {
        M.toast({html: `Success add to google calendar`});
      })
      .fail((err) => {
        M.toast({html: `salaaa`});
        // M.toast({html: `${JSON.stringify(err)}`});
      })
    } else {
      M.toast({html: `Select 1 item to Google Calendar!`});
    }
  })
})

function getAllTodos (){
  $.ajax({
    url: "http://localhost:3000/todos",
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
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
}