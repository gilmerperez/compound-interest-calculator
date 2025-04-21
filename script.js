function calculate() {
  let initialDeposit = Number(document.getElementById("initial-deposit").value);
  let contributionAmount = Number(
    document.getElementById("contribution-amount").value
  );
  const contributionFrequency = document.getElementById(
    "contribution-frequency"
  ).textContent;
  const yearsOfGrowth = Number(
    document.getElementById("years-of-growth").value
  );
  const rateOfReturn = Number(document.getElementById("rate-of-return").value);
  const compoundFrequency =
    document.getElementById("compound-frequency").textContent;
  const totalAmount = document.getElementById("total-amount");

  if (initialDeposit < 0 || isNaN(initialDeposit)) {
    initialDeposit = 0;
  }

  if (contributionAmount < 0 || isNaN(contributionAmount)) {
    contributionAmount = 0;
  }

  if (contributionFrequency.textContent === "Monthly") {
    contributionFrequency = 12;
  } else if (contributionFrequency.textContent === "Annualy") {
    contributionFrequency = 1;
  }

  if (yearsOfGrowth < 0 || isNaN(yearsOfGrowth)) {
    yearsOfGrowth = 0;
  }

  if (rateOfReturn < 0 || isNaN(rateOfReturn)) {
    rateOfReturn = 0;
  }

  if (compoundFrequency.textContent === "Daily") {
    compoundFrequency = 365;
  } else if (compoundFrequency.textContent === "Monthly") {
    compoundFrequency = 12;
  }

  if (rateOfReturn < 0 || isNaN(rateOfReturn)) {
    rateOfReturn = 0;
  }

  const result =
    initialDeposit *
      Math.pow(
        1 + rateOfReturn / compoundFrequency,
        compoundFrequency * yearsOfGrowth
      ) +
    (contributionAmount *
      (Math.pow(
        1 + rateOfReturn / compoundFrequency,
        compoundFrequency * yearsOfGrowth
      ) -
        1)) /
      rateOfReturn /
      compoundFrequency;

  totalAmount.textContent = result.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
}
