"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audit = void 0;
const sequelize_1 = require("sequelize");
class Audit {
    constructor(targetModel, adapter) {
        this.TargetModel = targetModel;
        this.foreignKeyName = this.TargetModel.name + 'Id';
        this.Model = this.defineAuditModel(adapter);
        this.bindModels();
        this.registerHooks();
    }
    defineAuditModel(adapter) {
        const auditModelName = this.TargetModel.name + 'Audit';
        const auditModelDefine = (sequelize) => sequelize.define(auditModelName, this.assemblyAuditModelAttrs(), { timestamps: false, tableName: auditModelName });
        return auditModelDefine(adapter);
    }
    assemblyAuditModelAttrs() {
        const TargetModelAttrs = this.TargetModel.getAttributes();
        const ModelAttrs = Object.assign({}, TargetModelAttrs);
        // Extend ModelAttrs
        ModelAttrs[this.foreignKeyName] = {
            type: sequelize_1.DataTypes.INTEGER,
            references: { model: this.TargetModel.name, key: 'id' },
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        };
        ModelAttrs.action = { type: sequelize_1.DataTypes.STRING };
        ModelAttrs.date = { type: sequelize_1.DataTypes.DATE };
        return ModelAttrs;
    }
    bindModels() {
        this.TargetModel.hasMany(this.Model);
        this.Model.belongsTo(this.TargetModel);
    }
    registerHooks() {
        const registerCreateEval = (inst) => __awaiter(this, void 0, void 0, function* () { return yield this.audit(inst, 'create'); });
        this.TargetModel.afterCreate(registerCreateEval.bind(this));
        const registerUpdateEval = (inst) => __awaiter(this, void 0, void 0, function* () { return yield this.audit(inst, 'update'); });
        this.TargetModel.beforeUpdate(registerUpdateEval.bind(this));
        const registerDeleteEval = (inst) => __awaiter(this, void 0, void 0, function* () { return yield this.audit(inst, 'delete'); });
        this.TargetModel.beforeDestroy(registerDeleteEval.bind(this));
    }
    audit(inst, action) {
        return __awaiter(this, void 0, void 0, function* () {
            const instData = yield this.TargetModel.findByPk(inst.id);
            if (instData) {
                const auditData = Object.assign({}, instData.dataValues);
                if (instData.id)
                    delete auditData.id;
                auditData.date = Date.now();
                auditData.action = action;
                auditData[this.foreignKeyName] = inst.id;
                yield this.Model.create(auditData);
            }
        });
    }
}
exports.Audit = Audit;
