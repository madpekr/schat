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
    messageB.append($('<p class="text-muted hide">', { text:message.author}));
    messageB.append($('<p>', { text:message.text}));
    $('#message_container').append(messageB);
}

function send_message(message) {
    message.uid = socket.id;
    socket.emit('json', JSON.stringify(message));
}

function on_send() {
    author = $('input[name=author]').val();
    text = $('input[name=text]').val();

    if (!text) {
        return false;
    }

    message = {
        author: author,
        text : text
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