import { Sequelize } from "sequelize";


class OrderController {
    private marketStorage: Sequelize   

    constructor(marketStorage: Sequelize) {
       this.marketStorage = marketStorage 
    }
    
    
}