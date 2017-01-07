'use strict';

let app = require('./src/app');

class Server {
    constructor() {
        this.app = app;
        this.port = 3000 || process.env.PORT;
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
