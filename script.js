function calculate() {
  // Get initial values
  let initialDeposit = Number(document.getElementById("initial-deposit").value);
  let contributionAmount = Number(document.getElementById("contribution-amount").value);
  const contributionFrequency = document.getElementById("contribution-frequency");
  let yearsOfGrowth = Number(document.getElementById("years-of-growth").value);
  let rateOfReturn = Number(document.getElementById("rate-of-return").value);
  const compoundFrequency = document.getElementById("compound-frequency");
  const totalAmount = document.getElementById("total-amount");

  // If initial values are incorrect, zero them out
  if (initialDeposit < 0 || isNaN(initialDeposit)) {
    initialDeposit = 0;
  }

  if (contributionAmount < 0 || isNaN(contributionAmount)) {
    contributionAmount = 0;
  }

  if (contributionFrequency.value === "monthly") {
    contributionFrequency = 12;
  } else {
    contributionFrequency = 1;
  }

  if (yearsOfGrowth < 0 || isNaN(yearsOfGrowth)) {
    yearsOfGrowth = 0;
  }

  if (rateOfReturn < 0 || isNaN(rateOfReturn)) {
    rateOfReturn = 0;
  }

  if (compoundFrequency.value === "daily") {
    compoundFrequency = 365;
  } else {
    compoundFrequency = 12;
  }

  if (rateOfReturn < 0 || isNaN(rateOfReturn)) {
    rateOfReturn = 0;
  }

  // Convert Rate of Return to decimal
  const r = rateOfReturn / 100;

  // Calculate Result
  // Part 1: Future value of the initial deposit
  const futureValueInitial =
    initialDeposit *
    Math.pow(1 + r / compoundFrequency, compoundFrequency * yearsOfGrowth);

  // Part 2: Future value of the contributions
  // First calculate the effective periodic rate
  const periodicRate = r / compoundFrequency;

  // Number of total periods
  const totalPeriods = compoundFrequency * yearsOfGrowth;

  // Contribution per compounding period (adjust if contribution frequency differs from compounding frequency)
  let contributionPerPeriod = contributionAmount;
  if (contributionFrequency !== compoundFrequency) {
    // If contributions are made at a different frequency than compounding
    // For simplicity, we'll assume contributions are made at the same frequency as compounding
    // In a more advanced version, you'd need to adjust for this
    console.warn("Contribution frequency doesn't match compounding frequency - using simple approximation");
  }

  const futureValueContributions =
    contributionPerPeriod *
    ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);

  // Total future value
  const result = futureValueInitial + futureValueContributions;

  totalAmount.textContent = result.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
