'use strict' // sets JS tolerances

console.log(`script.js was successfully called.`);

// GLOBAL VARIABLES

let voteCount = 25;   //number of choices
let prodArray = [];   //Product array
let randArray = [];   //Random number array
let locArray = [];    //Location of click array


// DOM
const ctx = document.getElementById('myChart');  //FROM CHARTJS

let prodSection = document.getElementById('prodSection');      //Event container
let prodPlaceOne = document.getElementById('prodPlaceOne');     //Image one
let prodPlaceTwo = document.getElementById('prodPlaceTwo');     //Image two
let prodPlaceThree = document.getElementById('prodPlaceThree'); //Image Three

let results = document.getElementById('results');

// CONSTRUCTOR
function ProdLoc(name) {
  this.id = name;
  this.clicks = 0;

  locArray.push(this);
}

function Product(name, suffix = 'jpg') {  //put parameters with defaults last
  this.prodName = name;
  this.img = `./media/${name}.${suffix}`;
  this.views = 0;
  this.clicks = 0;

  prodArray.push(this); //sends each object into an array
}

//FROM CHARTJS
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'], //prodName
    datasets: [{
      label: '# of Views',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ['rgba(0, 0, 0, 0.5)'],
      borderWidth: 0,
    },
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ['rgba(0, 0, 0, 0.9)'],
      borderWidth: 0,
    },]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

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

//LOCATIONS

new ProdLoc(`prodPlaceOne`);
new ProdLoc(`prodPlaceTwo`);
new ProdLoc(`prodPlaceThree`);

console.log(locArray)  //debug

// FUNCTIONS
// RANDOM PRODUCT PICKER
function getRandProd() {                                //borrowed from Audrey and W3 Schools
  return Math.floor(Math.random() * prodArray.length)   //Math.random pulls a 16 digit decimal 0.xxxxxxxxxxxxxxxx.
  //Math.floor always rounds down to an integer.
  //prodArray has 19 spaces  0 - 18.
  //19 * 0.anything will always provide a number that can be rounded down to an space in the array.
}



//CALLING THREE RANDOM PRODUCTS AND DISPLAYING THEM
function renderImg() {
  console.log('RenderImg was called and started successfully.')

  //PRODUCT ARRAY GENERATOR AND DUPLICATE FINDER -- GUIDANCE FROM AUDREY

  while (randArray.length < 3) {
    console.log(`Product finder started running and checked for duplicates.`);
    let randProd = getRandProd();
    if (!randArray.includes(randProd)) {
      randArray.push(randProd);
      console.log(randArray);
    } else {
      console.log(`Caught a dirty dupe! ${randProd} tried to sneak in again.`);
      console.log(randArray);
    }
  }
  // let prodOneIndex = getRandProd();        //we need to pull a random number 0-18 and hold it.
  // let prodTwoIndex = getRandProd();        //we need to pull a random number 0-18 and hold it.
  // let prodThreeIndex = getRandProd();      //we need to pull a random number 0-18 and hold it.

  let prodOneIndex = randArray.pop();
  let prodTwoIndex = randArray.pop();
  let prodThreeIndex = randArray.pop();

  console.log(`Products ${prodOneIndex}, ${prodTwoIndex}, and ${prodThreeIndex} were called for rendering.`);

  //SENDING THOSE PRODUCT IMAGES OUT

  prodPlaceOne.src = prodArray[prodOneIndex].img;
  prodPlaceOne.alt = prodArray[prodOneIndex].prodName;
  prodArray[prodOneIndex].views++;

  prodPlaceTwo.src = prodArray[prodTwoIndex].img;
  prodPlaceTwo.alt = prodArray[prodTwoIndex].prodName;
  prodArray[prodTwoIndex].views++;

  prodPlaceThree.src = prodArray[prodThreeIndex].img;
  prodPlaceThree.alt = prodArray[prodThreeIndex].prodName;
  prodArray[prodThreeIndex].views++;
}

//EVENTS  //SAMPLED FROM AUDREY

function clickSniffer(event) {                          //ON CLICK EVENT THIS ALL HAPPENS
  console.log(`This is the event`, event);
  console.log(`Click sniffer is sniffing.`);

  //SPAM COUNT
  let prodLoc = event.target.id;
  for (let i = 0; i < locArray.length; i++) {
    if (prodLoc === locArray[i].id) {
      locArray[i].clicks++;
    }
  }

  //PRODUCT COUNT
  let prodClicked = event.target.alt;
  for (let i = 0; i < prodArray.length; i++) {        //COUNTS CLICKS
    if (prodClicked === prodArray[i].prodName) {
      prodArray[i].clicks++;
    }
  }
  console.log(`${prodClicked} was clicked.`);

  voteCount--;                 //REDUCES REMAINING VOTE COUNT

  if (voteCount === 0) {       //WHEN VOTE COUNT IS 0 THE SNIFFER IS DISABLED AND RESULTS ARE SHOWN.
    prodSection.removeEventListener('click', clickSniffer);

    // Chart();  //FROM CHARTJS

    // RESULTS TO PAGE
    for (let i = 0; i < prodArray.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${prodArray[i].prodName}: shown:${prodArray[i].views}, clicked:${prodArray[i].clicks}`;
      results.appendChild(li);
    }

    // SPAM CHECK TO PAGE
    for (let i = 0; i < locArray.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${locArray[i].id}: clicked ${locArray[i].clicks} times.`;
      spamChecker.appendChild(li);
    }

  }
  renderImg();

}

renderImg();

prodSection.addEventListener("click", clickSniffer);
