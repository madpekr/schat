function init_messages(data) {
    data.forEach(function (message) {
        add_message(message);
    })
}
function striptags(content) {
  var frag = document.createDocumentFragment();
  var innerEl = document.createElement('div');
  frag.appendChild(innerEl);
  innerEl.innerHTML = content;
  return frag.firstChild.innerText;
}
function add_message(message) {
    var messageB = $('<div class="row message-bubble"></div>');
    messageB.append($('<p class="text-muted hide">', { text:message.username}));
    messageB.append($('<p>', { text:message.text}));
    $('#message_container').append(messageB);
}

function send_message(message) {
    message.uid = socket.id;
    socket.send(JSON.stringify(message));
}

function on_send() {
    username = $('input[name=username]').val();
    text = $('input[name=text]').val();

    if (!text) {
        return false;
    }

    message = {
        username: 'test',
        text : text,
        room: 'test',
    }

    add_message(message);
    send_message(message);

    $('input[name=username]').val('');
    $('input[name=text]').val('');
}
socket.on('message', function(message, data){
    message = JSON.parse(message);
    if (message.uid !== socket.id) {
        add_message(message);
    }
    console.log(message);
});


$('#send_btn').on('click', on_send);

$(document).ready(function() {
    socket.emit('join', {'username': 'test', 'room':'test'});
});