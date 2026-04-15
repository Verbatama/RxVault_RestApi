"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Apotekers", "password", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    const defaultPasswordHash = await bcrypt.hash("apoteker123", 10);

    await queryInterface.sequelize.query(
      "UPDATE `Apotekers` SET `password` = :password WHERE `password` IS NULL OR `password` = ''",
      {
        replacements: {
          password: defaultPasswordHash,
        },
      },
    );

    await queryInterface.changeColumn("Apotekers", "password", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("Apotekers", "password");
  },
};
