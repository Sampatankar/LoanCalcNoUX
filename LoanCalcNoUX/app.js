// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// CalculateResults function:
function calculateResults(e) {
  //UI variables:
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 /12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //Compute the monthly payment:
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
  } else {
    showError('Please ensure all entry boxes are filled')
  }

  e.preventDefault();
}

//Show Error function:
function showError(error){
  //Create a div
  const errorDiv = document.createElement('div');

  //Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add a class
  errorDiv.className = 'alert alert-danger';

  //Create a text node and append it to the div:
  errorDiv.appendChild(document.createTextNode(error));

  //Insert error above the heading
  card.insertBefore(errorDiv, heading);

  //Clear error after 5 seconds
  setTimeout(clearError, 5000);
}

//Clear error timeout function:
function clearError(){
  document.querySelector('.alert').remove();
}