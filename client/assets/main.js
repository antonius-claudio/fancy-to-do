$(document).ready(() => {
    let isLogged = false;
    if (isLogged) {
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

    $('#formRegister').submit(function (e) {
        e.preventDefault();
        let email = $('#emailRegister').val();
        let password = $('#passwordRegister').val();
        // M.toast({html: 'Registered'});
        
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
            console.log(result)
            $('.test').append(`<p>Registered: ${JSON.stringify(result)}</p>`);
        })
        .fail((err) => {
          err.responseJSON.forEach(i => {
              M.toast({html: `${i}`});
            })
        })
    });
})