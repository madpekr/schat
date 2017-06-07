function init_messages(data) {
    data.forEach(function (message) {
        add_message(message);
    })
}
function add_message(message) {
    var elem = '<div class="row message-bubble"><p class="text-muted hide">'+message.author+'</p> <p>'+message.text+'</p></div>';
    $('#message_container').append($(elem));
}
test_messages = [
    {text:'Тест1', author:'1стеТ'},
    {text:'Тест2', author:'2стеТ'},
    {text:'Тест3', author:'3стеТ'},
]
init_messages(test_messages);

var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
    socket.emit('my event', {data: 'Im connected!'});
});
socket.on('message', function(message, data){
  console.log(message, data);
});