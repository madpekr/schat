

function init_messages(data) {
    data.forEach(function (message) {
        add_message(message);
    })
}
function add_message(message) {
    var elem = '<div class="row message-bubble"><p class="text-muted hide">'+message.author+'</p> <p>'+message.text+'</p></div>';
    $('#message_container').append($(elem));
}

$('#send_btn').on('click', (function () {
    message = {
        author: $('input[name=author]').val(),
        text : $('input[name=text]').val()
    }

    add_message(message);

    $('input[name=author]').val('');
    $('input[name=text]').val('');
}));

test_messages = [
    {text:'Тест1', author:'1стеТ'},
    {text:'Тест2', author:'2стеТ'},
    {text:'Тест3', author:'3стеТ'},
]
init_messages(test_messages);

socket.on('message', function(message, data){
    console.log(message, data);
});