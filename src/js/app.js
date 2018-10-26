App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('health_record.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var HealthRecordArtifact = data;
      App.contracts.health_record = TruffleContract(HealthRecordArtifact);

      // Set the provider for our contract.
      App.contracts.health_record.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#submitRecord', App.updateState);
    $(document).on('click', '#getRecord', App.getContact);
  },

  updateState: function(event) {
    event.preventDefault();

    var HealthRecordInstance;

    App.contracts.health_record.deployed().then(function(instance) {
      HealthRecordInstance = instance;
      
      return HealthRecordInstance.create_health_record($('#problem').val(), $('#medication').val(), $('#allergy').val(), $('#height').val(), $('#weight').val());

    }).then(function(result) {
      alert("Your Record has added to ther Ethereum Network");

    }).catch(function(err) {
      console.log(err)
    });
  },

  getContact: function(event) {
    event.preventDefault();

    var HealthRecordInstance;

    App.contracts.health_record.deployed().then(function(instance) {
      HealthRecordInstance = instance;

      return HealthRecordInstance.get_health_record($('#ethereum_address').val());

    }).then(function(result) {

      var res = result.toString();

      $('#health-record-result').text(res);

    }).catch(function(err) {
      console.log(err.message);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
