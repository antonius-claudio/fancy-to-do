$(document).ready(() => {
    let isLogged = false;
    if (localStorage.getItem("token") !== null) {
        $('#menuRegis').hide();
        $('#menuLogin').hide();
        $('#menuTodo').show();
        $('#menuLogout').show();
        $('#divLogin').hide();
        $('#divRegister').hide();
        $('#divTodo').show();
    } else {
        $('#menuTodo').hide();
        $('#menuLogout').hide();
    }
    $('#divRegister').hide();
    $('#divLogin').hide();
    $('#divTodo').hide();

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
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      localStorage.removeItem('token');
      $('#dataTodos').empty();
      $('#divTodo').hide();
      $('#divRegister').hide();
      $('#divLogin').hide();
      $('#menuLogout').hide();
      $('#menuTodo').hide();
      $('#menuRegis').show();
      $('#menuLogin').show();
    })

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
              $.ajax({
                url: "http://localhost:3000/todos",
                method: 'GET',
                headers: {
                  token: result.token
                }
              })
              .done((result) => {
                let no = 1;
                console.log(result)
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
    });

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
    
})