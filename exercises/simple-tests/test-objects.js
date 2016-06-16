var assert = require('assert');
var describe = require('describe');


describe('jacking up stuff with constructors', function() {
  function Rabbit(name, adjective) {
    this.name = name;
    this.adjective = adjective;
  }

  function TrickyRabbit(name, adjective) {
    this.name = name;
    this.adjective = adjective;

    return {};
  }

  var rabbit1 = new Rabbit('Bugs', 'tricky');
  var rabbit2 = new TrickyRabbit('Peter', 'cute');

  assert.equal('Bugs', rabbit1.name);
  assert.equal('Peter', rabbit2.name); // Fails b/c returned {}
});



describe('distinguishing between constructor prototypes and prototypes of objects made from them', function() {
  assert.equal(Function.prototype, Object.getPrototypeOf(Rabbit));

  var rabbit = new Rabbit('peter', 'cute');
  assert.equal(Rabbit.prototype, Object.getPrototypeOf(rabbit));
});



describe("adding properties to prototypes", function() {
  function Agent(name) {
    this.name = name;
  }
  var bond = new Agent("Bond");

  // shoot is not defined on either the `bond` object or the Agent prototype
  assert.throws(function() { bond.shoot(); }, TypeError);

  // Add `shoot` to the Agent prototype and the `bond` object now has the function
  Agent.prototype.shoot = function() {
    return "Bang!";
  };

  assert.equal("Bang!", bond.shoot());
});
