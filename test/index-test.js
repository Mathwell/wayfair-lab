try {
  window
} catch (e) {
  var sinon = require('sinon');
} finally {
  afterEach(function() {
    expect.restoreSpies();
  });

  describe('hello()', function() {
    it("runs code", function() {
      expect.spyOn(console, 'log');
    })
  })

}
