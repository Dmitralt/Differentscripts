const Converter = require('../converter');

test('start gte,lte,gt,lt', () => {
  expect(Converter('/campaigns?gte>=0&lte<=0&gt>0&lt<0')).toMatchObject(JSON.parse("{\"gte\": { \"$gte\": 0 },\"lte\": { \"$lte\": 0 },\"gt\": { \"$gt\": 0 },\"lt\": { \"$lt\": 0 }}"));
});
test('in nin ne', () => {
  expect(Converter('A=in:group0,group1,group2&B=nin:group0,group1,group2&C=ne:group0')).toMatchObject(JSON.parse('{ "A": { "$in": [ "group0", "group1", "group2" ] }, "B": { "$nin": [ "group0", "group1", "group2" ] },"C": { "$ne": "group0" } }'));
});
test('desc asc', () => {
  expect(Converter('sort=-owner,+start')).toMatchObject(JSON.parse('{ "sort": [ [ "owner", "desc" ], [ "start", "asc" ] ] }'));
});
test('owner', () => {
  expect(Converter('owner=22')).toMatchObject(JSON.parse('{ "owner": 22 }'));
});
test('fields', () => {
  expect(Converter('fields=start,end,id')).toMatchObject(JSON.parse('{ "fields": ["start", "end", "id"]}'));
});
test('offset & limmit', () => {
  expect(Converter('offset=10&limit=5')).toMatchObject(JSON.parse('{ "offset": 10, "limit": 5}'));
});
