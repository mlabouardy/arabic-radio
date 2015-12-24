'use strict';

describe('Controller: StationsCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var StationsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StationsCtrl = $controller('StationsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StationsCtrl.awesomeThings.length).toBe(3);
  });
});
