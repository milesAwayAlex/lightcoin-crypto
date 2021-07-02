class Account {
  constructor(username) {
    this.username = username;
    this._transactions = [];
  }
  get balance() {
    return this._transactions.reduce((a, e) => a + e.value, 0);
  }
  set transactions(transaction) {
    this._transactions.push(transaction);
  }
  get transactions() {
    return this._transactions;
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  get allowed() {
    if (this.value > 0 || this.amount <= this.account.balance) return true;
    return false;
  }
  commit() {
    if (this.allowed) {
      this.time = new Date();
      this.account.transactions = this;
    }
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('snow-patrol');

const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log(t1);

const t3 = new Deposit(120.0, myAccount);
t3.commit();
console.log(t3);

const t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log(t2);

console.log(
  'Final balance:',
  myAccount.balance,
  '-',
  myAccount.transactions.length,
  'transactions'
);
