class Thing {
  static tableName = 'things';
  static _client = null;
  static fields = {
    id: { type: 'number', validate: v => Number.isInteger(v) && v >= 0 },
    body: {
      type: 'string',
      validate: v => typeof v === 'string',
      required: true,
    },
    createdAt: { type: 'string', validate: v => !isNaN(Date.parse(v)) },
    updatedAt: { type: 'string', validate: v => !isNaN(Date.parse(v)) },
  };

  static async create(values) {
    let insertFields = [];
    let insertValues = [];
    for (const fieldName in Thing.fields) {
      if (fieldName in values) {
        insertFields.push(`"${fieldName}"`);
        insertValues.push(
          Thing.fields[fieldName].type === 'string'
            ? `'${values[fieldName]}'`
            : values[fieldName]
        );
      }
    }
    const insertSchemaString = `(${insertFields.join()})`;
    const insertValuesString = `(${insertValues.join()})`;

    const { rows } = await Thing._client.query(
      `INSERT INTO ${Thing.tableName} ${insertSchemaString} VALUES ${insertValuesString} RETURNING *;`
    );

    return rows[0];
  }

  static async find(options = {}) {
    const { rows } = await Thing._client.query(
      `SELECT * FROM ${Thing.tableName};`
    );
    return rows;
  }

  static updateByPk(pkValue, values) {}

  static async findByPk(pkValue) {
    const {
      rows: [thing],
    } = await this._client.query(
      `SELECT * FROM ${this.tableName} WHERE id = ${pkValue};`
    );
    return thing;
  }

  static async deleteByPk(pkValue) {
    const {
      rows: [thing],
    } = await this._client.query(
      `DELETE FROM ${this.tableName} WHERE id = ${pkValue} RETURNING *;`
    );
    return thing;
  }
}

module.exports = Thing;
