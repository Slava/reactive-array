Tinytest.add('reactive-array - set/get value', function (test) {
  var arr = new ReactiveArray;
  arr.set(0, 123);

  var count = 0;
  Tracker.autorun(function () {
    count++;
    arr.get(0);
  });

  test.equal(count, 1);

  arr.set(0, 222);
  Tracker.flush();
  test.equal(count, 2);

  arr.set(0, 222);
  Tracker.flush();
  test.equal(count, 2);

  arr.set(1, "asdfdsf");
  Tracker.flush();
  test.equal(count, 2);

  arr.push("another one");
  Tracker.flush();
  test.equal(count, 2);

  arr.pop();
  arr.pop();
  arr.pop();
  Tracker.flush();
  test.equal(count, 3);
});

Tinytest.add('reactive-array - get length', function (test) {
  var arr = new ReactiveArray;
  arr.set(0, 123);
  arr.push(1);

  var count = 0;
  var lastLength = 0;
  Tracker.autorun(function () {
    count++;
    lastLength = arr.length();
  });

  test.equal(lastLength, 2);
  test.equal(count, 1);

  arr.set(1, 2);
  Tracker.flush();
  test.equal(lastLength, 2);
  test.equal(count, 1);

  arr.push({});
  Tracker.flush();
  test.equal(lastLength, 3);
  test.equal(count, 2);

  arr.set(3, 4);
  Tracker.flush();
  test.equal(lastLength, 4);
  test.equal(count, 3);

  test.equal(arr.pop(), 4);
  Tracker.flush();
  test.equal(lastLength, 3);
  test.equal(count, 4);
});

Tinytest.add('reactive-array - toArray', function (test) {
  var arr = new ReactiveArray([1, 2, 3, 4]);

  test.equal(arr.length(), 4);
  test.equal(arr.get(1), 2);

  var count = 0;
  Tracker.autorun(function () {
    count++;
    arr.toArray();
  });

  test.equal(count, 1);

  arr.set(1, 2);
  Tracker.flush();
  test.equal(count, 1);

  arr.set(1, 25);
  Tracker.flush();
  test.equal(count, 2);

  arr.push({});
  Tracker.flush();
  test.equal(count, 3);

  arr.pop();
  Tracker.flush();
  test.equal(count, 4);
});


