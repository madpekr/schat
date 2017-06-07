function init_messages(data) {
    data.forEach(function (message) {
        add_message(message);
    })
}

function add_message(message) {
    var elem = '<div class="row message-bubble"><p class="text-muted hide">'+message.author+'</p> <p>'+message.text+'</p></div>';
    $('#message_container').append($(elem));
}

function send_message(message) {
    message.uid = socket.id;
    socket.emit('json', JSON.stringify(message));
}

function on_send() {
    if (!$('input[name=text]').val()) {
        return false;
    }

    message = {
        author: $('input[name=author]').val(),
        text : $('input[name=text]').val()
    }

    add_message(message);
    send_message(message);

    $('input[name=author]').val('');
    $('input[name=text]').val('');
}
socket.on('json', function(message, data){
    message = JSON.parse(message);
    if (message.uid !== socket.id) {
        add_message(message);
    }
    console.log(message);
});


$('#send_btn').on('click', on_send);