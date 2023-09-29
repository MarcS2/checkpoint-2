// SECTION global variables
let concrete = 5000;

let clickUpgrades = [
  {
    name: 'pickaxe',
    price: 15,
    quantity: 0,
    multiplier: 1
  },
  {
    name: 'small excavator',
    price: 55,
    quantity: 0,
    multiplier: 5
  }
];

let automaticUpgrades = [
  {
    name: 'small drill',
    price: 450,
    quantity: 0,
    multiplier: 20
  },
  {
    name: 'large drill',
    price: 1200,
    quantity: 0,
    multiplier: 50
  }
];
// !SECTION

// SECTION functions 
function mine() {
  clickUpgrades.forEach(clickUpgrade => {
    if (clickUpgrade.quantity > 0) {
      const clickCount = clickUpgrade.multiplier * clickUpgrade.quantity
      concrete += clickCount
    }
  })
  concrete++
  update()
}



function clickPoint() {
  const clickElem = document.getElementById('pointPerClick')
  let points = 1
  clickUpgrades.forEach(clickUpgrade => {
    const calculatedPoints = clickUpgrade.multiplier * clickUpgrade.quantity
    points += calculatedPoints
  })

  // @ts-ignore
  clickElem.innerText = points
}


function autoPointPer() {
  const autoElem = document.getElementById('pointPerInterval')
  let points = 0
  automaticUpgrades.forEach(autoUpgrade => {
    const calculatedPoints = autoUpgrade.multiplier * autoUpgrade.quantity
    points += calculatedPoints
  })
  // @ts-ignore
  autoElem.innerText = points
}



function collectAutoUpgrades() {
  automaticUpgrades.forEach(autoUpgrade => {
    const autoUpgradeCount = autoUpgrade.multiplier * autoUpgrade.quantity
    // @ts-ignore
    if (autoUpgrade.quantity > 0) {
      concrete += autoUpgradeCount
      update()
    }

  })
}

// NOTE update method is for drawing concrete resource to the page only
function update() {
  const concreteElem = document.getElementById('concreteMined')
  // @ts-ignore
  concreteElem.innerText = concrete
}

// function drawAutoUpgrade


function buyAutoUpgrade(AutoUpgradeName, buttonName) {
  const buttonElem = document.getElementById(buttonName)
  const foundUpgrade = automaticUpgrades.find(automaticUpgrade => automaticUpgrade.name == AutoUpgradeName)
  // @ts-ignore
  if (concrete >= foundUpgrade.price) {
    // @ts-ignore
    foundUpgrade.quantity++
    // @ts-ignore
    concrete -= foundUpgrade.price
    // @ts-ignore
    foundUpgrade.price = foundUpgrade.price * 2
    // @ts-ignore
    buttonElem.innerText = foundUpgrade.price
  }
  update()
  drawAutoUpgrade(AutoUpgradeName)
  autoPointPer()
}


function drawAutoUpgrade(autoUpgradeName) {
  const foundUpgrade = automaticUpgrades.find(autoUpgrade => autoUpgrade.name == autoUpgradeName)
  const statElem = document.getElementById(autoUpgradeName)
  // @ts-ignore
  statElem.innerText = foundUpgrade.quantity
}


function drawClickUpgrade(upgradeName) {
  const foundUpgrade = clickUpgrades.find(clickUpgrade => clickUpgrade.name == upgradeName)
  const statElem = document.getElementById(upgradeName)
  // @ts-ignore
  statElem.innerText = foundUpgrade.quantity

}


function buyClickUpgrade(upgradeName, buttonName) {
  const buttonElem = document.getElementById(buttonName)
  const foundUpgrade = clickUpgrades.find(clickUpgrade => clickUpgrade.name == upgradeName)
  // @ts-ignore
  if (foundUpgrade.price <= concrete) {
    // @ts-ignore
    foundUpgrade.quantity++
    // @ts-ignore
    concrete -= foundUpgrade.price
    // @ts-ignore
    foundUpgrade.price = foundUpgrade.price * 2
    // @ts-ignore
    buttonElem.innerText = foundUpgrade.price
  }
  update()
  drawClickUpgrade(`${upgradeName}`)
  clickPoint()
}
// !SECTION

// SECTION on page load functions
update()

setInterval(collectAutoUpgrades, 3000)
// !SECTION

