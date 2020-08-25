import os, json, argparse
import socket

from datetime import datetime

from flask import Flask, request, jsonify, session
from flask_cors import CORS

from sql import SQLHelper

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'a' * 24
sqlhelper = SQLHelper()

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'OPTIONS, HEAD, GET, POST, DELETE, PUT'
    return response

@app.route('/', methods=['GET'])
def index():
    data = request.args
    expired_time = sqlhelper.getExpiredTime(data['id'])
    if expired_time and expired_time > datetime.now().timestamp():
        return jsonify({'expired_time': expired_time})
    return jsonify({}), 404

@app.route('/', methods=['POST'])
def store():
    data = request.get_json()
    sqlhelper.updateExpiredTime(data['id'], int(data['expired_time']))

    return jsonify({'expired_time': int(data['expired_time'])})

@app.route('/', methods=['DELETE'])
def destroy():
    data = request.args
    sqlhelper.deleteExpiredTime(data['id'])

    return jsonify({'message': 'success'})


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-p', '--port', type=int, default=48763, help='Port number. Default: %(default)s.')
    args = parser.parse_args()

    # hostname = socket.gethostname()
    # ip_addr = socket.gethostbyname(hostname)    
    app.run('127.0.0.1', port=args.port, debug=True)
