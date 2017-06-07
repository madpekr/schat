from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'as21QASd@12eas'
socketio = SocketIO(app)


@socketio.on('message')
def send_message(message):
    send(message)


@socketio.on('json')
def handle_json(json):
    emit('json', str(json), broadcast=True)


@app.route('/chat')
def hello_world():
    return render_template('index.html')

if __name__ == '__main__':
    socketio.run(app)
