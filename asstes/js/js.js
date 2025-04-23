var NameInput = document.getElementById('NameInput');
var EmailInput = document.getElementById('EmailInput');
var PasswordInput = document.getElementById('PasswordInput');
var AllAccounts = [];

if (localStorage.getItem('allAcc') != null) {
    AllAccounts = JSON.parse(localStorage.getItem('allAcc'));
} else {
    AllAccounts = [];
}

function validateAllInput(elem) {
    var regex = {
        NameInput: /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,})?$/,
        EmailInput: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        PasswordInput: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
    }

    if (regex[elem.id].test(elem.value) == true) {
        elem.classList.add('is-valid');
        elem.classList.remove('is-invalid');
    } else {
        elem.classList.remove('is-valid');
        elem.classList.add('is-invalid');
    }
}

function addAccount() {
    var usre = {
        NameUs: NameInput.value,
        EmailUs: EmailInput.value,
        PassUs: PasswordInput.value
    };

    var emailExists = AllAccounts.some(function (account) {
        return account.EmailUs === usre.EmailUs;
    });

    if (emailExists) {
        document.getElementById('status').innerHTML = 'Email already exists!';
        document.getElementById('status').style.color = 'red';
    } else {
        AllAccounts.push(usre);
        localStorage.setItem('allAcc', JSON.stringify(AllAccounts));
        document.getElementById('status').innerHTML = 'successfull';
        document.getElementById('status').style.color = 'green';
    }
}

function loginAccount() {
    var loginEmail = document.getElementById('LoginEmail').value;
    var loginPassword = document.getElementById('LoginPassword').value;
    var storedAccounts = JSON.parse(localStorage.getItem('allAcc')) || [];

    var found = storedAccounts.find(function (account) {
        return account.EmailUs === loginEmail && account.PassUs === loginPassword;
    });

    if (found) {
        localStorage.setItem('currentUser', found.NameUs);
        window.location.href = "home.html";
    } else {
        document.getElementById('LoginMessage').textContent = "Invalid email or password";
        document.getElementById('LoginMessage').classList.remove("text-success");
        document.getElementById('LoginMessage').classList.add("text-danger");
        document.getElementById('LoginMessage').classList.add('py-2')
    }
}


function displayUserName() {
    var userName = localStorage.getItem('currentUser');
    if (userName && document.getElementById('showName')) {
        document.getElementById('showName').textContent = "Welcome " + userName;
    }
}


function protectPage() {
    if (!localStorage.getItem('currentUser')) {
        window.location.href = "index.html";
    }
}


function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "index.html";
}