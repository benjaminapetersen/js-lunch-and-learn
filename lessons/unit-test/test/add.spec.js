'use strict';

beforeEach();

afterEach();

describe('when given 2 numbers', function() {
  it('should add the two numbers', function() {
    expect(add(1,2)).toEqual(3);
    expect(typeof add(1,2)).toEqual('number');
  });
});
