// 'use strict' // sets JS tolerances

console.log(`script.js was successfully called.`);

// GLOBAL VARIABLES

let voteCount = 25;   //number of votes
let prodArray = [];   //Product array with product names, product image names, views, and votes
let randArray = [];   //Random number array used to populate product choices.
let locArray = [];    //Location of click array used to collect votes

// DOM

const ctx = document.getElementById('myChart');                 //FROM CHARTJS for creating chart

let prodSection = document.getElementById('prodSection');       //Event container for click capturing
let prodPlaceOne = document.getElementById('prodPlaceOne');     //Image one box for voting
let prodPlaceTwo = document.getElementById('prodPlaceTwo');     //Image two box for voting
let prodPlaceThree = document.getElementById('prodPlaceThree'); //Image three box for voting

let results = document.getElementById('results');               //Where text results populate in HTML

// CONSTRUCTORS

function ProdLoc(name) {  //CATCHES SPAM
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

    console.log(prodArray);  //debug

    //LOCATIONS

    new ProdLoc(`prodPlaceOne`);
    new ProdLoc(`prodPlaceTwo`);
    new ProdLoc(`prodPlaceThree`);

    console.log(locArray);  //debug

// FUNCTIONS

//CALLING THREE RANDOM PRODUCTS AND DISPLAYING THEM
function renderImg() {
  console.log('RenderImg was called and started successfully.')

  //PRODUCT ARRAY GENERATOR AND DUPLICATE FINDER -- GUIDANCE FROM AUDREY
  while (randArray.length < 6) {
    console.log(`Product finder started running and checked for duplicates.`);
    let randProd = getRandProd();
    if (!randArray.includes(randProd)) {
      randArray.push(randProd);
      console.log(randArray);
    } else {
      console.log(`We caught a dirty dupe! ${randProd} tried to sneak in again.`);
      console.log(randArray);
    }
  }

  let prodOneIndex = randArray.shift();
  let prodTwoIndex = randArray.shift();
  let prodThreeIndex = randArray.shift();

  console.log(`Products ${prodOneIndex}, ${prodTwoIndex}, and ${prodThreeIndex} were called for rendering.`);

  //SENDING THOSE PRODUCT IMAGES OUT

  prodPlaceOne.src = prodArray[prodOneIndex].img;   //  HTML ELEMENT = "./MEDIA/PRODNAME.SUFFIX"
  prodPlaceOne.alt = prodArray[prodOneIndex].prodName;
  prodArray[prodOneIndex].views++;

  prodPlaceTwo.src = prodArray[prodTwoIndex].img;
  prodPlaceTwo.alt = prodArray[prodTwoIndex].prodName;
  prodArray[prodTwoIndex].views++;

  prodPlaceThree.src = prodArray[prodThreeIndex].img;
  prodPlaceThree.alt = prodArray[prodThreeIndex].prodName;
  prodArray[prodThreeIndex].views++;
}

//Render chart
function renderChart() {
  //FROM CHARTJS
  let prodNames = chartNames();
  let prodViews = chartViews();
  let prodVotes = chartVotes();

  let myChartObj = {
    type: 'bar',
    data: {
      labels: prodNames,  // names of products
      datasets: [
        {
          label: '# of Views',
          data: prodViews,
          backgroundColor: ['rgba(0, 0, 0, 0.5)'],
          borderWidth: 0,
        },
        {
          label: '# of Votes',
          data: prodVotes,
          backgroundColor: ['rgba(0, 0, 0, 0.9)'],
          borderWidth: 0,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  };

  const myChart = new Chart(ctx, myChartObj);       //AUDREY'S MOD OF CHARTJS
}

// RANDOM PRODUCT PICKER
function getRandProd() {                                  //borrowed from Audrey and W3 Schools
  return Math.floor(Math.random() * prodArray.length);    //Math.random pulls a 16 digit decimal 0.xxxxxxxxxxxxxxxx.
  //Math.floor always rounds down to an integer.
  //prodArray has 19 spaces  0 - 18.
  //19 * 0.anything will always provide a number that can be rounded down to an space in the array.
}

//PRODUCT NAMES TO CHART
function chartNames() {
  let tempArray = [];
  for (let i = 0; i < prodArray.length; i++) {
  tempArray.push(prodArray[i].prodName);
  //myChartObj.data.labels[i] = prodArray[i].prodName;
  }
  console.log('Product labels were successfully added to chart.');
  console.log(tempArray);
  //console.log('Chart labels were successfully added to chart.');
  // console.log(myChartObj.data.labels);
  return tempArray;
}

chartNames()

//PRODUCT VIEWS TO CHART
function chartViews() {
  let tempArray = [];
  for (let i = 0; i < prodArray.length; i++) {
    tempArray.push(prodArray[i].views);
  }
  console.log('Product views were successfully added to chart.');
  console.log(tempArray);
  return tempArray;
}

//PRODUCT VOTES TO CHART
function chartVotes() {
  let tempArray = [];
  for (let i = 0; i < prodArray.length; i++) {
    tempArray.push(prodArray[i].clicks);
  }
  console.log('Chart votes were successfully added to chart.');
  console.log(tempArray);
  return tempArray;
}

//EVENTS  //SAMPLED FROM AUDREY

function clickSniffer(event) {                          //ON CLICK EVENT THIS ALL HAPPENS
  console.log(`There has been an event!!!  @`, event.path[0]);
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

  //REDUCES REMAINING VOTE COUNT
  voteCount--;                                        
  renderImg();

  //VOTING COMPLETE
  if (voteCount === 0) {                              //WHEN VOTE COUNT IS 0 THE SNIFFER IS DISABLED AND RESULTS ARE SHOWN AND SENT TO THE CHART.
    prodSection.removeEventListener('click', clickSniffer);

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

    //RESULTS TO MYCHART  //FAILED ATTEMPT BECAUSE CHART WOULD LOAD BEFORE VALUES WERE ADDED TO ARRAY
    // for (let i = 0; i < prodArray.length; i++) {
      //myChartObj.data.datasets[0].data[i] = prodArray[i].views;
      //myChartObj.data.datasets[1].data[i] = prodArray[i].clicks;
    //}
    //console.log(myChartObj.data.datasets[0].data);
    //console.log(myChartObj.data.datasets[1].data);

    renderChart();
  }
}

renderImg();

prodSection.addEventListener("click", clickSniffer);
