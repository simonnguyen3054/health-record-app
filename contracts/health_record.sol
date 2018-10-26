pragma solidity ^0.4.18;

contract health_record {

  struct Record {
    string problem;
    string medication;
    string allergy;
    string weight;
    string height;
  }

  mapping (address => Record) records;

  function create_health_record(string _problem, string _medication, string _allergy, string _weight, string _height) external returns (address patient) {

    require((bytes(_problem).length <= 500) && (bytes(_medication).length <= 500) && (bytes(_allergy).length <= 500) && (bytes(_weight).length <= 50) && (bytes(_height).length <= 50));

    patient = msg.sender;

    records[patient] = Record(_problem, _medication, _allergy, _weight, _height);

    return patient;
  }

	function get_health_record(address _patient) view external returns (string _problem, string _medication, string _allergy, string _weight, string _height) {

    Record memory pt = records[_patient];

    return (pt.problem, pt.medication, pt.allergy, pt.weight, pt.height);
  }
}
