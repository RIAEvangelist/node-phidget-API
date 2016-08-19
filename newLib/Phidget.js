'use strict';

const net = require('net');
const EventEmitter = require('events').EventEmitter;

class Phidget extends EventEmitter{
    constructor(){
        super();
        this.connectedHandler = this.connected.bind(this);
        this.disconnectedhandler = this.disconnected.bind(this);
        this.updateHandler = this.update.bind(this);

        this.defaults = {
            host    : 'localhost',
            port    : 5001,
            version : '1.0.10',//older phidgetwebservice21 builds may require 1.0.9
            password: false,
            rawLog  : false,
            type    : 'PhidgetManager',
            serial  : false,
            label   : false,
            rate    : 8 //sampling rate in ms
        }
        this.params = {};
    }

    connect(params = {}){
        this.params.port = params.port || this.defaults.port;
        this.params.host = params.host || this.defaults.host;
        this.client = net.createConnection(
            this.params.port,
            this.params.host,
            this.connectedHandler
        );

        this.client.on(
            'error',
            //@TODO handle error
            function(data){
                console.log(data);
            }
        );

        this.client.setEncoding('utf8');

        this.client.on(
            'data',
            this.updateHandler
        );

        this.client.on(
            'end',
            this.disconnectedhandler
        );

        this.client.on(
            'close',
            this.disconnectedhandler
        );
    }

    connected(){
        this.emit('connected');
    }

    disconnected(){
        console.log('disconnected');
        this.ready = false;
        try{
            this.emit(
                'disconnected'
            );
        }catch(e){
            throw(e);
        }
        delete this.client;
        this.client={};
    }

    update(buffer){
        console.log(buffer.toString());
    }
}

module.exports = Phidget;
