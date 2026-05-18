/**
 * Dummy Payment Gateway Integration
 * Simulates real payment gateway functionality for testing
 */

// Card validation utilities
export const validateCard = (cardData) => {
  const errors = {};

  // Card number validation (Luhn algorithm)
  const cardNumber = cardData.number.replace(/\s+/g, "");
  if (!/^\d{16}$/.test(cardNumber)) {
    errors.number = "Card number must be 16 digits";
  } else if (!luhnCheck(cardNumber)) {
    errors.number = "Invalid card number";
  }

  // Cardholder name validation
  if (!cardData.name || cardData.name.trim().length < 3) {
    errors.name = "Cardholder name must be at least 3 characters";
  }

  // Expiry validation
  if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) {
    errors.expiry = "Expiry must be MM/YY format";
  } else {
    const [month, year] = cardData.expiry.split("/");
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;

    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      errors.expiry = "Card has expired";
    }
  }

  // CVV validation
  if (!/^\d{3,4}$/.test(cardData.cvv)) {
    errors.cvv = "CVV must be 3 or 4 digits";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

// Luhn algorithm for card validation
const luhnCheck = (num) => {
  let sum = 0;
  let isEven = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num[i], 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
};

// Simulate payment processing
export const processPayment = async (paymentData) => {
  return new Promise((resolve) => {
    // Simulate network delay
    const delay = Math.random() * 1500 + 1000; // 1-2.5 seconds
    
    setTimeout(() => {
      // Generate transaction ID
      const transactionId = generateTransactionId();
      
      // Generate authorization code
      const authCode = generateAuthCode();

      resolve({
        success: true,
        transactionId,
        authCode,
        status: "completed",
        amount: paymentData.amount,
        method: paymentData.method,
        timestamp: new Date().toISOString(),
        reference: `TXN-${transactionId}`
      });
    }, delay);
  });
};

// Generate unique transaction ID
export const generateTransactionId = () => {
  return Math.random().toString(36).substr(2, 9).toUpperCase() + Date.now().toString(36).toUpperCase();
};

// Generate authorization code
export const generateAuthCode = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};

// Format card number for display (masked)
export const maskCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s+/g, "");
  return `**** **** **** ${cleaned.slice(-4)}`;
};

// UPI payment simulation
export const processUPIPayment = async (upiData) => {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 1500 + 1000;
    
    setTimeout(() => {
      if (Math.random() < 0.08) {
        reject({
          code: "UPI_FAILED",
          message: "UPI transaction failed. Please try again.",
          status: "failed"
        });
        return;
      }

      resolve({
        success: true,
        transactionId: generateTransactionId(),
        method: "UPI",
        timestamp: new Date().toISOString(),
        referenceNumber: `UPI${Date.now().toString().slice(-8)}`
      });
    }, delay);
  });
};

// Net Banking simulation
export const processNetBankingPayment = async (bankData) => {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 2500 + 2000;
    
    setTimeout(() => {
      if (Math.random() < 0.05) {
        reject({
          code: "NETBANKING_FAILED",
          message: "Net banking transaction failed. Please try again.",
          status: "failed"
        });
        return;
      }

      resolve({
        success: true,
        transactionId: generateTransactionId(),
        method: "Net Banking",
        bank: bankData.bank,
        timestamp: new Date().toISOString(),
        referenceNumber: `NB${Date.now().toString().slice(-8)}`
      });
    }, delay);
  });
};

// Payment receipt generator
export const generateReceipt = (paymentDetails) => {
  return {
    receiptNumber: `RCP-${generateTransactionId()}`,
    date: new Date().toLocaleString(),
    amount: paymentDetails.amount,
    method: paymentDetails.method,
    transactionId: paymentDetails.transactionId,
    status: "SUCCESS",
    details: {
      merchantName: "Taj Hotel",
      merchantId: "TAJ2024",
      customerEmail: paymentDetails.email,
      orderDescription: paymentDetails.description
    }
  };
};
