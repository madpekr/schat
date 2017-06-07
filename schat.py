from flask import Flask, render_template
from flask_socketio import SocketIO, send, \
                            join_room, leave_room

import json 
from json.decoder import JSONDecodeError


app = Flask(__name__)
app.config['SECRET_KEY'] = 'as21QASd@12eas'
app.config['DEBUG'] = True


socketio = SocketIO(app)

tmp_message = {'author':'', 'text':''}


@socketio.on('message')
def handle_message(message):
    try:
        room = json.loads(message)['room']
        send(str(message), room=room)
    except JSONDecodeError:
        return False


@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    data['text'] = username + ' has entered the room.'
    send(json.dumps(data), room=room)


@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', room=room)


@app.route('/chat')
def chat():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app)
