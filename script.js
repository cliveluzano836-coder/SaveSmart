// DEFAULT DATA

let income = Number(
    localStorage.getItem("income")
) || 0;

let expenses = Number(
    localStorage.getItem("expenses")
) || 0;

let goalAmount = Number(
    localStorage.getItem("goalAmount")
) || 20000;

let goalName =
    localStorage.getItem("goalName")
    || "Goal";


// FORMAT MONEY

function money(amount) {

    return "₱" +
        Number(amount).toLocaleString(
            "en-PH",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
}


// UPDATE DASHBOARD

function updateDashboard() {

    let savings = income - expenses;


    document.getElementById(
        "incomeDisplay"
    ).innerText = money(income);


    document.getElementById(
        "expenseDisplay"
    ).innerText = money(expenses);


    document.getElementById(
        "savingsDisplay"
    ).innerText = money(savings);


    document.getElementById(
        "heroSavings"
    ).innerText = money(savings);


    document.getElementById(
        "goalName"
    ).innerText = goalName;


    // CALCULATE PROGRESS

    let percentage =
        goalAmount > 0
        ? (savings / goalAmount) * 100
        : 0;


    // Maximum 100%

    let displayPercentage =
        Math.min(
            Math.max(percentage, 0),
            100
        );


    document.getElementById(
        "goalPercent"
    ).innerText =
        displayPercentage.toFixed(1) + "%";


    document.getElementById(
        "progressFill"
    ).style.width =
        displayPercentage + "%";


    document.getElementById(
        "progressText"
    ).innerText =
        money(savings) +
        " saved of " +
        money(goalAmount);

}


// UPDATE INCOME AND EXPENSES

function updateFinance() {

    let newIncome =
        Number(
            document.getElementById(
                "incomeInput"
            ).value
        );


    let newExpense =
        Number(
            document.getElementById(
                "expenseInput"
            ).value
        );


    if (
        newIncome < 0 ||
        newExpense < 0
    ) {

        alert(
            "Please enter valid amounts."
        );

        return;
    }


    income = newIncome;

    expenses = newExpense;


    // SAVE DATA

    localStorage.setItem(
        "income",
        income
    );

    localStorage.setItem(
        "expenses",
        expenses
    );


    updateDashboard();


    alert(
        "Your finances have been updated!"
    );

}


// SET SAVINGS GOAL

function setGoal() {

    let newGoal =
        document.getElementById(
            "goalInput"
        ).value.trim();


    let newAmount =
        Number(
            document.getElementById(
                "goalAmountInput"
            ).value
        );


    if (
        newGoal === "" ||
        newAmount <= 0
    ) {

        alert(
            "Please enter a goal name and valid amount."
        );

        return;
    }


    goalName = newGoal;

    goalAmount = newAmount;


    localStorage.setItem(
        "goalName",
        goalName
    );


    localStorage.setItem(
        "goalAmount",
        goalAmount
    );


    updateDashboard();


    alert(
        "Savings goal saved!"
    );

}


// SAVINGS CALCULATOR

function calculate() {

    let current =
        Number(
            document.getElementById(
                "current"
            ).value
        );


    let weekly =
        Number(
            document.getElementById(
                "weekly"
            ).value
        );


    let weeks =
        Number(
            document.getElementById(
                "weeks"
            ).value
        );


    if (
        current < 0 ||
        weekly < 0 ||
        weeks < 0
    ) {

        alert(
            "Please enter valid numbers."
        );

        return;
    }


    let total =
        current +
        (weekly * weeks);


    document.getElementById(
        "result"
    ).innerText =
        money(total);

}


// GO TO DASHBOARD

function goToDashboard() {

    document
        .getElementById("dashboard")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// RESET EVERYTHING

function resetData() {

    let confirmReset =
        confirm(
            "Are you sure you want to reset all your data?"
        );


    if (!confirmReset) {
        return;
    }


    localStorage.clear();


    income = 0;

    expenses = 0;

    goalAmount = 20000;

    goalName = "New Phone";


    document.getElementById(
        "incomeInput"
    ).value = "";


    document.getElementById(
        "expenseInput"
    ).value = "";


    document.getElementById(
        "goalInput"
    ).value = "";


    document.getElementById(
        "goalAmountInput"
    ).value = "";


    updateDashboard();


    alert(
        "All data has been reset."
    );

}


// LOAD DATA WHEN PAGE OPENS

updateDashboard();