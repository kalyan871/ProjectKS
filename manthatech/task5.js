function Loan(loanAmount, interestRate, loanTerm) {
    this.loanAmount = loanAmount;
    this.interestRate = interestRate / 100 / 12; // Convert annual rate to monthly and percentage to decimal
    this.loanTerm = loanTerm;
}

Loan.prototype.calculateMonthlyPayment = function() {
    var P = this.loanAmount;
    var r = this.interestRate;
    var n = this.loanTerm;
    
    if (r === 0) { // In case of 0% interest rate
        return P / n;
    }
    
    var emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    return emi;
};

Loan.prototype.checkLoanStatus = function(paymentsMade) {
    var P = this.loanAmount;
    var r = this.interestRate;
    var n = this.loanTerm;

    if (r === 0) { // In case of 0% interest rate
        var remainingBalance = P - (this.calculateMonthlyPayment() * paymentsMade);
        return {
            emisPaid: paymentsMade,
            remainingBalance: Math.max(0, remainingBalance)
        };
    }

    var emi = this.calculateMonthlyPayment();
    
    // Calculate remaining balance using amortization formula
    var remainingBalance = P * (Math.pow(1 + r, n) - Math.pow(1 + r, paymentsMade)) / (Math.pow(1 + r, n) - 1);
    
    return {
        emisPaid: paymentsMade,
        remainingBalance: remainingBalance
    };
};

// Example usage:
var loan = new Loan(100000, 5, 24); // $10,000 loan, 5% annual interest rate, 24 months term
var monthlyPayment = loan.calculateMonthlyPayment();
console.log("Monthly Payment (EMI): Rs. " + monthlyPayment.toFixed(2));

// Assuming 12 payments have been made
var status = loan.checkLoanStatus(12);
console.log("EMIs Paid: " + status.emisPaid);
console.log("Remaining Balance: Rs. " + status.remainingBalance.toFixed(2));