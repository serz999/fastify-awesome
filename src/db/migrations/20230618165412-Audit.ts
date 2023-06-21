import { DataTypes, QueryInterface, Transaction } from 'sequelize';
import * as models from '../models';


export async function up(queryInterface: QueryInterface, Sequelize: any) {
  const t = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable(models.userRevision.Model.name, models.userRevision.Model.getAttributes(), { transaction: t });
    await queryInterface.createTable(models.productRevision.Model.name, models.productRevision.Model.getAttributes() ,{ transaction: t });
    await queryInterface.createTable(models.orderRevision.Model.name, models.orderRevision.Model.getAttributes(), { transaction: t });
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
}
export async function down(queryInterface: QueryInterface, Sequelize: any) {
  const t = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.dropTable(models.userRevision.Model.name, { cascade: true, transaction: t });
    await queryInterface.dropTable(models.productRevision.Model.name, { cascade: true, transaction: t });
    await queryInterface.dropTable(models.orderRevision.Model.name, { cascade: true, transaction: t });
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
}

