module.exports = {
  PERMISSIONS: {
    SUPER_ADMIN: "Super Admin",
    LENDER: "Lender",
    ACCOUNTANT: "Accountant",
    CLIENT_CREATOR: "Client Creator",
    CLIENT_ADMIN: "Client Admin"
  },

  getAllPermissions: function(){
    var values = []
    for (var key in this.PERMISSIONS){
      values.push(this.PERMISSIONS[key])
    }
    return values;
  },

  COMPANY_CORP_TYPE: {
    SOLE_PROPIETORSHIP: "Sole-Proprietorship",
    PARTNERSHIP: "Partnership",
    LP: "Limited Partnership (LP)",
    LLP: "Limited Liability Partnership (LLP)",
    LIMITED: "Company - Limited",
    PRIVATE_LIMITED: "Company - Private Limited"
  },

  INVOICE_STATUSES: {
    DRAFT: "Draft",
    AWAITING: "Awaiting Approval",
    SENT: "Sent",
    OPENED: "Opened",
    ACCEPTED: "Accepted",
    PAID_PARTIAL: "Paid Partial",
    PAID_FULL: "Paid in Full",
    PAID_FULL_DISCOUNT: "Paid in Full with Discount",
    BAD_DEBT: "Bad Debt",
    BAD_DEBT_COLLECTED: "Bad Debt Collected"
  },

  BILL_STATUSES: {
    DRAFT: "Draft",
    AWAITING: "Awaiting Approval",
    PENDING: "Pending Payment",
    PAID_PARTIAL: "Paid Partial",
    PAID_FULL: "Paid in Full",
    CLOSED: "Closed",
    CLOSED_PAID: "Paid after Closed",
    CONFIRM_PAID: "Confirm Paid",
  },

  CDN_STATUSES: {
    DRAFT: "Draft",
    AWAITING: "Awaiting Approval",
    SENT: "Sent",
    OPENED: "Opened",
    ACCEPTED: "Accepted",
    CLOSED: "Closed",
  },

  CDN_TYPES: {
    PAYABLE: "Credit Note (Payable)",
    RECEIVABLE: "Debit Note (Receivable)",
    OTHER: "Other"
  },

  BANK_ACCOUNT_TYPE: {
    SAVINGS: "Saving",
    CURRENT: "Current",
    CREDIT_CARD: "Credit Card",
    CASH: "Cash",
    OTHER: "Other"
  },

  ACCOUNTING_CODES: {
    ASSETS_AR: "Assets - Accounts Receivable",
    ASSETS_CASH: "Assets - Cash and Equivalents",
    ASSETS_INV: "Assets - Inventory",
    ASSETS_PREPAID_EXPENSE: "Assets - Prepaid Expense",
    LIABILITY_GST: "Liability - GST Tax Liability",
    LIABILITY_PREPAID_SALES: "Liability - Prepaid Sales",
    REVENUE_SALES: "Revenue - Sales",
    EXPENSES_DISCOUNT: "Expenses - Sales Discount",
    EXPENSES_COGS: "Expenses - Cost of Goods Sold",
    EXPENSES_BAD_DEBT: "Expenses - Bad Debt Expense",
    EXPENSES_RENTAL: "Expenses - Rental",
  },

  COUNTRIES: {
    SG: "Singapore",
    MY: "Malaysia"
  },

  CURRENCIES: {
    SGD: "SGD",
    MYR: "MYR"
  },

  INDUSTRIES: {
    MANUFACTURING: "Manufacturing",
    BUSINESS_SERVICES: "Business Services"
  }
}
