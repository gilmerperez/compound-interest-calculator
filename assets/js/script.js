const submitBtn = document.getElementById("submitBtn");
const total = document.getElementById("total");

function calculate(event) {
  // Stop form from refreshing on submit
  event.preventDefault();
  // Get initial values
  let initialDeposit = Number(document.getElementById("initial-deposit").value);
  let contributionAmount = Number(document.getElementById("contribution-amount").value);
  let contributionFrequency = document.getElementById("contribution-frequency");
  let yearsOfGrowth = Number(document.getElementById("years-of-growth").value);
  let rateOfReturn = Number(document.getElementById("rate-of-return").value);
  let compoundFrequency = document.getElementById("compound-frequency");
  let totalAmount = document.getElementById("total-amount");

  // If initial values are less than 0 or not numbers, zero them out
  if (initialDeposit < 0 || isNaN(initialDeposit)) {
    initialDeposit = 0;
  }
  if (contributionAmount < 0 || isNaN(contributionAmount)) {
    contributionAmount = 0;
  }
  if (yearsOfGrowth < 0 || isNaN(yearsOfGrowth)) {
    yearsOfGrowth = 0;
  }
  if (rateOfReturn < 0 || isNaN(rateOfReturn)) {
    rateOfReturn = 0;
  }

  // Convert frequency values into numbers
  if (contributionFrequency.value === "monthly") {
    contributionFrequency = 12;
  } else {
    contributionFrequency = 1;
  }
  if (compoundFrequency.value === "daily") {
    compoundFrequency = 365;
  } else {
    compoundFrequency = 12;
  }

  // Convert Rate of Return to decimal
  const r = rateOfReturn / 100;

  // Future value of the initial deposit
  const futureValueInitial =
    initialDeposit *
    Math.pow(1 + r / compoundFrequency, compoundFrequency * yearsOfGrowth);

  // Calculate effective periodic rate
  const periodicRate = r / compoundFrequency;

  // Times it by number of years
  const totalPeriods = compoundFrequency * yearsOfGrowth;

  // Contribution per compounding period
  let contributionPerPeriod = contributionAmount;
  if (contributionFrequency !== compoundFrequency) {
    console.warn(
      "Contribution frequency doesn't match compounding frequency - using simple approximation"
    );
  }

  const futureValueContributions = contributionPerPeriod * ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);

  const result = futureValueInitial + futureValueContributions;

  // Format result
  totalAmount.textContent = result.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Remove CSS class to show amount
  total.classList.remove("hidden");
}

submitBtn.addEventListener("click", calculate);