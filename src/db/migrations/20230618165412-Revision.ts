import { DataTypes, QueryInterface, Transaction } from 'sequelize';
import * as revisions from '../revisions';


export async function up(queryInterface: QueryInterface, Sequelize: any) {
  const t = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable(revisions.userRevision.Model.name, revisions.userRevision.Model.getAttributes(), { transaction: t });
    await queryInterface.createTable(revisions.userRevision.Stash.name, revisions.userRevision.Stash.getAttributes(), { transaction: t });

    await queryInterface.createTable(revisions.productRevision.Model.name, revisions.productRevision.Model.getAttributes() ,{ transaction: t });
    await queryInterface.createTable(revisions.productRevision.Stash.name, revisions.productRevision.Stash.getAttributes() ,{ transaction: t });

    await queryInterface.createTable(revisions.orderRevision.Model.name, revisions.orderRevision.Model.getAttributes(), { transaction: t });
    await queryInterface.createTable(revisions.orderRevision.Stash.name, revisions.orderRevision.Stash.getAttributes(), { transaction: t });

    await t.commit();

  } catch (err) {
    await t.rollback();
    throw err;
  }
}
export async function down(queryInterface: QueryInterface, Sequelize: any) {
  const t = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.dropTable(revisions.userRevision.Model.name, { cascade: true, transaction: t });
    await queryInterface.dropTable(revisions.userRevision.Stash.name, { cascade: true, transaction: t });
    
    await queryInterface.dropTable(revisions.productRevision.Model.name, { cascade: true, transaction: t });
    await queryInterface.dropTable(revisions.productRevision.Stash.name, { cascade: true, transaction: t });
    
    await queryInterface.dropTable(revisions.orderRevision.Model.name, { cascade: true, transaction: t });
    await queryInterface.dropTable(revisions.orderRevision.Stash.name, { cascade: true, transaction: t });

    await t.commit();

  } catch (err) {
    await t.rollback();
    throw err;
  }
}

