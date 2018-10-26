var HealthRecord = artifacts.require("health_record");

module.exports = function(deployer) {
  deployer.deploy(HealthRecord);
};