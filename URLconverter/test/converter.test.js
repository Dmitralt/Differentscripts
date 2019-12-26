const Converter = require('../converter');

test('start gte,lte,gt,lt', () => {
  expect(Converter('/campaigns?gte>=0&lte<=0&gt>0&lt<0')).toBe(
`{
gte:{ $gte: 0},
lte:{ $lte: 0},
gt:{ $gt: 0},
lt:{ $lt: 0}
}`);
      });

      test('in nin ne', () => {
        expect(Converter('groups=in:group1,group2&nintest=in:group1,group2&netest=ne:group1,group2')).toBe(
`{
groups: { $in: ["group1","group2"] },
nintest: { $in: ["group1","group2"] },
netest: { $ne: "group1","group2" }
}`);
            });     






test('start gte,owner=22', () => {
    expect(Converter('/campaigns?start>=2376872&owner=22')).toBe(
`{
start:{ $gte: 2376872},
owner: 22
}`);
  });

  test('allFields', () => {
        expect(Converter('/campaigns?start>=2376872&owner=22&groups=in:group1,group2&sort=-owner,+start&fields=start,end,id&offset=10&limit=5')).toBe(
`{
start:{ $gte: 2376872},
owner: 22,
groups: { $in: ["group1","group2"] },
sort: [["owner", "desc"],["start", "asc"]],
fields: ["start","end","id"],
offset: 10,
limit: 5
}`);});
test('manyFields', () => {
  expect(Converter('/campaigns?end<=2376872&start>=2376872&owner=22&groups=in:group1,group2&sort=-owner,+start&first=2&second=3&fields=start,end,id&offset=10&limit=5&nintest=in:group1,group2&netest=ne:group1,group2')).toBe(
`{
end:{ $lte: 2376872},
start:{ $gte: 2376872},
owner: 22,
groups: { $in: ["group1","group2"] },
sort: [["owner", "desc"],["start", "asc"]],
first: 2,
second: 3,
fields: ["start","end","id"],
offset: 10,
limit: 5,
nintest: { $in: ["group1","group2"] },
netest: { $ne: "group1","group2" }
}`);
      });
test('start gte,lte,gt,lt', () => {
  expect(Converter('/campaigns?gte>=0&lte<=0&gt>0&lt<0')).toBe(
`{
gte:{ $gte: 0},
lte:{ $lte: 0},
gt:{ $gt: 0},
lt:{ $lt: 0}
}`);
      });

    


  //console.log(convertURL('/campaigns?start>=2376872&owner=22&groups=in:group1,group2&sort=-owner,+start&fields=start,end,id&offset=10&limit=5'))
