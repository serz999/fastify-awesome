import { DataTypes, QueryInterface, Transaction } from 'sequelize';
import * as models from '../models';


export async function up(queryInterface: QueryInterface, Sequelize: any) {
  const t = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable(models.UserAudit.name, models.UserAuditAttrs, { transaction: t });
    await queryInterface.createTable(models.ProductAudit.name, models.ProductAuditAttrs ,{ transaction: t });
    await queryInterface.createTable(models.OrderAudit.name, models.OrderAuditAttrs, { transaction: t });
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
}
export async function down(queryInterface: QueryInterface, Sequelize: any) {
  const t = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.dropTable(models.UserAudit.name, { cascade: true, transaction: t });
    await queryInterface.dropTable(models.ProductAudit.name, { cascade: true, transaction: t });
    await queryInterface.dropTable(models.OrderAudit.name, { cascade: true, transaction: t });
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
}

