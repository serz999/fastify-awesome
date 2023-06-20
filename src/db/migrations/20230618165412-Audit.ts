import { DataTypes, QueryInterface, Transaction } from 'sequelize';
import * as models from '../models';


export async function up(queryInterface: QueryInterface, Sequelize: any) {
  const t = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable(models.userAudit.Model.name, models.userAudit.Model.getAttributes(), { transaction: t });
    await queryInterface.createTable(models.productAudit.Model.name, models.productAudit.Model.getAttributes() ,{ transaction: t });
    await queryInterface.createTable(models.orderAudit.Model.name, models.orderAudit.Model.getAttributes(), { transaction: t });
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
}
export async function down(queryInterface: QueryInterface, Sequelize: any) {
  const t = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.dropTable(models.userAudit.Model.name, { cascade: true, transaction: t });
    await queryInterface.dropTable(models.productAudit.Model.name, { cascade: true, transaction: t });
    await queryInterface.dropTable(models.orderAudit.Model.name, { cascade: true, transaction: t });
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
}

