// Sample user accounts in JSON format
const sampleAccounts = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "hashed_password_1", // In reality, store hashed passwords only
        createdAt: "2023-01-15T10:30:00Z"
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        password: "hashed_password_2",
        createdAt: "2023-02-20T14:45:00Z"
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        password: "hashed_password_3",
        createdAt: "2023-03-10T09:15:00Z"
    }
];

class AccountService {
    constructor() {
        // Initialize accounts in localStorage if they don't exist
        if (!localStorage.getItem('accounts')) {
            localStorage.setItem('accounts', JSON.stringify(sampleAccounts));
        }
    }

    // Get all accounts
    getAccounts() {
        return JSON.parse(localStorage.getItem('accounts')) || [];
    }

    // Find account by email
    findAccountByEmail(email) {
        const accounts = this.getAccounts();
        return accounts.find(account => account.email === email);
    }

    // Create new account
    createAccount(name, email, password) {
        const accounts = this.getAccounts();
        const newAccount = {
            id: accounts.length + 1,
            name,
            email,
            password, // In reality, hash the password before storing
            createdAt: new Date().toISOString()
        };
        accounts.push(newAccount);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        return newAccount;
    }

    // Authenticate user
    authenticateUser(email, password) {
        const account = this.findAccountByEmail(email);
        if (account && account.password === password) { // In reality, compare hashed passwords
            return account;
        }
        return null;
    }

    // Update account details
    updateAccount(id, updates) {
        const accounts = this.getAccounts();
        const index = accounts.findIndex(account => account.id === id);
        if (index !== -1) {
            accounts[index] = { ...accounts[index], ...updates };
            localStorage.setItem('accounts', JSON.stringify(accounts));
            return accounts[index];
        }
        return null;
    }

    // Delete account
    deleteAccount(id) {
        const accounts = this.getAccounts();
        const updatedAccounts = accounts.filter(account => account.id !== id);
        localStorage.setItem('accounts', JSON.stringify(updatedAccounts));
    }

    // Get current logged-in user
    getCurrentUser() {
        const userId = localStorage.getItem('currentUserId');
        if (userId) {
            const accounts = this.getAccounts();
            return accounts.find(account => account.id === parseInt(userId));
        }
        return null;
    }

    // Login user
    login(email, password) {
        const user = this.authenticateUser(email, password);
        if (user) {
            localStorage.setItem('currentUserId', user.id);
            return user;
        }
        return null;
    }

    // Logout user
    logout() {
        localStorage.removeItem('currentUserId');
    }
}


