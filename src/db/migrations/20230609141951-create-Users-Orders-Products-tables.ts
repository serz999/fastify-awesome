import { DataTypes, QueryInterface, Transaction } from 'sequelize';
import * as models from '../models';


export async function up(queryInterface: QueryInterface, Sequelize: any) {
  const t = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable(models.User.name, models.UserAttrs, { transaction: t });
    await queryInterface.createTable(models.Product.name, models.ProductAttrs ,{ transaction: t });
    await queryInterface.createTable(models.Order.name, models.OrderAttrs, { transaction: t });
    await queryInterface.createTable('Order_Product', {
      OrderId: {
        type: DataTypes.INTEGER,
        references: { model: 'Order', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      ProductId: {
        type: DataTypes.INTEGER,
        references: { model: 'Product', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    }, { transaction: t }
    );
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
}
export async function down(queryInterface: QueryInterface, Sequelize: any) {
  const t = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.dropTable(models.User.name, { cascade: true, transaction: t });
    await queryInterface.dropTable(models.Product.name, { cascade: true, transaction: t });
    await queryInterface.dropTable(models.Order.name, { cascade: true, transaction: t });
    await queryInterface.dropTable('Order_Product', { cascade: true, transaction: t });
    await t.commit();
  } catch (err) {
    await t.rollback();
    throw err;
  }
}
