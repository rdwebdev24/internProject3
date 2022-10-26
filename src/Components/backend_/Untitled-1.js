const arr = [
     {
          id:1,
          data:"this is forst data"
     },
     {
          id:2,
          data:"this is forst data"
     },
     {
          id:3,
          data:"this is forst data"
     }
]

const ID = 2;
const idx = arr.findIndex((item)=>item.id==ID)
console.log(idx);