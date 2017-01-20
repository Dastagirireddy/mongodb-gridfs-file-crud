'use strict';

let app = require('./src/app');

class Server {
    constructor() {
        this.app = app;
        this.port = process.env.PORT || 3000;
        this.run();
    }

    static bootstrap() {
        return new Server();
    }

    run() {
        this.app.listen(this.port, () => console.log(`App running at ${this.port}`));
    }
}

Server.bootstrap();
