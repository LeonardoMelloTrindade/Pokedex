import express from 'express';
import addControllers from "./setup/addControllers";
import addMiddlewares from "./setup/addMiddlewares";
import { connect, disconnect } from './services/connectionService';
try {
    connect().then(function () {
        const app = express();
    
        addMiddlewares(app); // DEVE SER ADICIONANDO ANTES DOS CONTROLLERS
        addControllers(app);
    
        app.listen(3000, () => {
            console.log("A API ESTÁ RODANDO NA PORTA 3000");
        });
    })
} catch (error) {
    disconnect();
}






