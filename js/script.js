'use strict' // sets JS tolerances

console.log(`script.js was successfully called.`)

// GLOBAL VARIABLES

let voteCount = 5;    //number of choices
let prodArray = [];   //Product array

// DOM
// const ctx = document.getElementById('myChart');  //FROM CHARTJS

let prodSection = document.getElementById('prodSection');      //Event container
let prodImgOne = document.getElementById('prodImgOne');     //Image one
let prodImgTwo = document.getElementById('prodImgTwo');     //Image two
let prodImgThree = document.getElementById('prodImgThree'); //Image Three

let results = document.getElementById('results')

// CONSTRUCTOR

function Product(name, suffix = 'jpg') {  //put parameters with defaults last
  this.prodName = name;
  this.img = `./media/${name}.${suffix}`;
  this.views = 0;
  this.clicks = 0;

  prodArray.push(this)    //sends each object into an array
}

// const myChart = new Chart(ctx, {      //FROM CHARTJS
//   type: 'bar',
//   data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [{
//           label: '# of Votes',
//           data: [12, 19, 3, 5, 2, 3],
//           backgroundColor: [
//               'rgba(255, 99, 132, 0.2)',
//               'rgba(54, 162, 235, 0.2)',
//               'rgba(255, 206, 86, 0.2)',
//               'rgba(75, 192, 192, 0.2)',
//               'rgba(153, 102, 255, 0.2)',
//               'rgba(255, 159, 64, 0.2)'
//           ],
//           borderColor: [
//               'rgba(255, 99, 132, 1)',
//               'rgba(54, 162, 235, 1)',
//               'rgba(255, 206, 86, 1)',
//               'rgba(75, 192, 192, 1)',
//               'rgba(153, 102, 255, 1)',
//               'rgba(255, 159, 64, 1)'
//           ],
//           borderWidth: 1
//       }]
//   },
//   options: {
//       scales: {
//           y: {
//               beginAtZero: true
//           }
//       }
//   }
// });

//PRODUCTS

new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');

console.log(prodArray)  //debug

// FUNCTIONS
// RANDOM PRODUCT PICKER
function getRandProd() {                                //borrowed from Audrey and W3 Schools
  return Math.floor(Math.random() * prodArray.length)   //Math.random pulls a 16 digit decimal 0.xxxxxxxxxxxxxxxx.
  //Math.floor always rounds down to an integer.
  //prodArray has 19 spaces  0 - 18.
  //19 * 0.anything will always provide a number that can be rounded down to an space in the array.
}

// FIRST TRY AT DUPLICATE FINDER  -- FLAWED
// while (prodOneIndex === prodTwoIndex)  {
//   prodTwoIndex = getRandProd();
// }
// while (prodOneIndex === prodThreeIndex)  {
//   prodThreeIndex = getRandProd();
// }
// while (prodTwoIndex === prodThreeIndex){
//   prodThreeIndex = getRandProd();
// }

//SECOND TRY WITH TA HELP.  SUGGESTED TERNARY.   --FLAWED
// while (prodOneIndex === prodTwoIndex && prodTwoIndex !== prodThreeIndex)  {
//   prodOneIndex = getRandProd();
// }

// while (prodOneIndex === prodThreeIndex && prodTwoIndex !== prodThreeIndex)  {
//   prodThreeIndex = getRandProd();
// }
// console.log(`Products ${prodOneIndex}, ${prodTwoIndex}, and ${prodThreeIndex} were sent out after duplicate check.`);

//CALLING THREE RANDOM PRODUCTS AND DISPLAYING THEM
function renderImg() {
  console.log('RenderImg was called and started successfully.')

  let prodOneIndex = getRandProd();        //we need to pull a random number 0-18 and hold it.
  let prodTwoIndex = getRandProd();        //we need to pull a random number 0-18 and hold it.
  let prodThreeIndex = getRandProd();      //we need to pull a random number 0-18 and hold it.

  console.log(`Products ${prodOneIndex}, ${prodTwoIndex}, and ${prodThreeIndex} were called for duplicate check.`);

  //DUPLICATE FINDER
  if (prodOneIndex === prodTwoIndex) {
    prodTwoIndex = getRandProd();
  } else if (prodOneIndex === prodThreeIndex) {
    prodThreeIndex = getRandProd();
  } else if (prodTwoIndex === prodThreeIndex) {
    prodTwoIndex = getRandProd();
  } else {
    console.log(`Products ${prodOneIndex}, ${prodTwoIndex}, and ${prodThreeIndex} left the duplicate check.`);
  }

  //SENDING THOSE PRODUCT IMAGES OUT

  prodImgOne.src = prodArray[prodOneIndex].img;
  prodImgOne.alt = prodArray[prodOneIndex].prodName;
  prodArray[prodOneIndex].views++;

  prodImgTwo.src = prodArray[prodTwoIndex].img;
  prodImgTwo.alt = prodArray[prodTwoIndex].prodName;
  prodArray[prodTwoIndex].views++;

  prodImgThree.src = prodArray[prodThreeIndex].img;
  prodImgThree.alt = prodArray[prodThreeIndex].prodName;
  prodArray[prodThreeIndex].views++;
}



//EVENTS  //SAMPLED FROM AUDREY

function clickSniffer(event) {                          //ON CLICK EVENT THIS ALL HAPPENS
  console.log(`this is the event`, event);
  console.log(`Click sniffer is sniffing.`);
  let prodClicked = event.target.alt;

  console.log(`${prodClicked} was clicked.`);

  for (let i = 0; i < prodArray.length; i++) {        //COUNTS CLICKS
    if (prodClicked === prodArray[i].prodName) {
      prodArray[i].clicks++;
    }
  }

  voteCount--;                 //REDUCES REMAINING VOTE COUNT



  if (voteCount === 0) {       //WHEN VOTE COUNT IS 0 THE SNIFFER IS DISABLED AND RESULTS ARE SHOWN.
    prodSection.removeEventListener('click', clickSniffer);
    // ();  FROM CHARTJS
    for (let i = 0; i < prodArray.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${prodArray[i].prodName}: shown:${prodArray[i].views}, clicked:${prodArray[i].clicks}`;
      results.appendChild(li);
    }
  }
  renderImg();

}

renderImg();

prodSection.addEventListener("click", clickSniffer);
