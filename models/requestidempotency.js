"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RequestIdempotency extends Model {
    static associate() {}
  }

  RequestIdempotency.init(
    {
      endpoint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idempotency_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      request_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      response_code: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      response_body: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "RequestIdempotency",
    },
  );

  return RequestIdempotency;
};
