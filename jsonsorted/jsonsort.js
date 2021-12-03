
const util = require('util');

const test = [
  {
    messageDate: "2021-08-19 08:07:25",
    text: "test",
  },
  {
    messageDate: "2021-08-19 09:00:00",
    text: "test",
  },
  {
    messageDate: "2021-08-07 10:00:00",
    text: "test",
  },
  {
    messageDate: "2021-08-07 09:07:25",
    text: "test",
  },
  {
    messageDate: "2021-08-25 09:07:25",
    text: "test",
  },
];

const testNew = [
  {
    "2021-08-19": [
      {
        messageDate: "2021-08-19 08:07:25",
        text: "test",
      },
      {
        messageDate: "2021-08-19 09:00:00",
        text: "test",
      },
    ],
  },
  {
    "2021-08-07": [
      {
        messageDate: "2021-08-07 09:07:25",
        text: "test",
      },
      {
        messageDate: "2021-08-07 10:00:00",
        text: "test",
      },
    ],
  },
  {
    "2021-08-25": {
      messageDate: "2021-08-25 09:07:25",
      text: "test",
    },
  },
];

function Filtred(test) {
 
  let newARR1 = [];
  let resultArr=[]
  test.sort(function(a,b){       
    return  new Date(a.messageDate)-new Date(b.messageDate);
  });
  for (i0 in test) {
    let data = test[i0]["messageDate"].split(" ")[0];

    if (newARR1[data] == undefined) {
      newARR1[data] = [];
    }

    newARR1[data].push(test[i0]);
  }

  for (i0 in newARR1) {
    let newobj={};
    newobj[i0]=newARR1[i0]
    resultArr.push(newobj)
  }
  return(resultArr)
}
console.log(Filtred(test))

