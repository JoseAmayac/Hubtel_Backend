import { Container } from "inversify";
import HubstelApp from "../../HubstelApp";
import { AppDataSource } from "../db/dataSource";
import { DataSource } from 'typeorm';
import { TYPES } from "./types";
import { repositoryModule } from "./inversifyModules/repositoryModule";
import { serviceModule } from "./inversifyModules/serviceModule";
import { controllerModule } from "./inversifyModules/controllerModule";

const container = new Container();

export const init = async ( port: number ) => {
    await AppDataSource.initialize();
    console.log('Database is connected');
    container.bind<DataSource>(TYPES.TypeORMDataSource).toConstantValue( AppDataSource );
    
    
    container.load(repositoryModule);
    container.load(serviceModule);
    container.load(controllerModule);
    
    const App = new HubstelApp();
    App.listen( port );
}

const getContainer = () => {
    if (container !== undefined) {
        return container;
    }

    return new Container();
}

export default getContainer;