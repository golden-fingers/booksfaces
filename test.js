QUnit.test('first request -> should return right data', function(t) {

  var done = t.async(1);

    t.equal(loadDoc("https://www.walldevil.com/wallpapers/a13/girl-unknown-background-web-pixels.jpg"),'ok','got ok response');
    done();

});


//
//
// QUnit.test( "two async calls", function( assert ) {
//   assert.expect( 2 );
//
//   var done1 = assert.async();
//   var done2 = assert.async();
//   setTimeout(function() {
//     assert.ok( true, "test resumed from async operation 1" );
//     done1();
//   }, 500 );
//   setTimeout(function() {
//     assert.ok( true, "test resumed from async operation 2" );
//     done2();
//   }, 150);
// });



// QUnit.test("Function `pendora` should exist", function(t) {
//   t.ok(window.pendora,'it exists');
// });
// QUnit.test("Function `pendora` should return n number", function (t) {
// 	var a = pendora();
//   	t.ok(isNaN(a)==false, 'Function pendora returns a Number.');
// });
