'use strict';

describe('add()', function() {

  describe('when given 2 numbers', function() {
    it('should add the numbers and return the sum', function() {

      expect( add(2,3) ).toEqual(5);

      expect( add(5,7) ).toEqual(12);

      expect( add(10,20) ).toEqual(30);

      expect( typeof add(10,20) ).toEqual('number');

      // expect( add('foo', 'bar') ).toEqual('foobar');

      // expect( typeof add('foo', 'bar') ).toEqual('string');

      // expect( typeof add('foo', 123 ) ).toEqual('string');


    });

    // it()
  });

  describe('when given a bunch of numbers', function() {
    it('should add them all and return the sum', function() {

      expect( add(1,2,3,4,5) ).toEqual(15);

      expect( add(10,20,30) ).toEqual(60);

      expect( add(0, -1) ).toEqual(-1);

    });
  });


  describe('when given 2 strings', function() {
    it('should...', function() {
      // expects()
    });
  });




});
