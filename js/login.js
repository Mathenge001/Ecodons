document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.getElementById('signIn');
    const signUpButton = document.getElementById('signUp');
    const container = document.querySelector('.container');
    const switchToSignUp = document.getElementById('switchToSignUp');
    const switchToSignIn = document.getElementById('switchToSignIn');

    // Toggle between Sign In and Sign Up
    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    switchToSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add("right-panel-active");
    });

    switchToSignIn.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove("right-panel-active");
    });

    // API endpoint for Google Apps Script Web App
    const API_ENDPOINT = "https://script.google.com/macros/s/AKfycbzgddQaVeGtlxmpkC2f7mnmjDoUAHEz3jisIufIkJGabPidYGN2-JXPTz9OyWNknpwr/exec";

    // Fetch data from Google Sheets
    async function fetchGoogleSheetData() {
        try {
            const response = await fetch(API_ENDPOINT);
            const data = await response.json();
            return data; // Ensure the data is parsed in a compatible format
        } catch (error) {
            console.error("Error fetching Google Sheets data:", error);
            return null;
        }
    }

    // Save data to Google Sheets
    async function saveToGoogleSheet(payload) {
        try {
            await fetch(API_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            console.log("Data saved successfully!");
        } catch (error) {
            console.error("Error saving to Google Sheets:", error);
        }
    }

    // Sign In functionality
    document.getElementById('signInForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const email = event.target.querySelector('input[type="email"]').value.trim();
        const password = event.target.querySelector('input[type="password"]').value.trim();

        const data = await fetchGoogleSheetData();
        if (!data) {
            alert("Error connecting to the server. Please try again later.");
            return;
        }

        const user = data.find(user => user.email === email);
        if (!user) {
            alert("Account does not exist. Please create an account.");
        } else if (user.password !== password) {
            alert("Incorrect password. Please try again.");
        } else {
            alert("Sign in successful!");
            const redirectPage = user.accountType === "individual" ? "home-page.html" : "organ-home-page.html";
            window.location.href = redirectPage;
        }
    });

    // Sign Up functionality
    document.getElementById('signUpForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const name = event.target.querySelector('input[placeholder="Name"]').value.trim();
        const email = event.target.querySelector('input[placeholder="Email"]').value.trim();
        const password = event.target.querySelector('input[placeholder="Password"]').value.trim();

        const data = await fetchGoogleSheetData();
        if (data && data.some(user => user.email === email)) {
            alert("Account already exists with this email. Please sign in.");
        } else {
            const payload = {
                name,
                email,
                password,
                accountType: "individual", // Default; can be extended to include organization choice
            };
            await saveToGoogleSheet(payload);
            alert("Sign up successful! Redirecting to profile setup...");
            window.location.href = "setup-profile.html";
        }
    });

    // Function to update theme based on the time of day
    function updateTheme() {
        const currentHour = new Date().getHours();
        const root = document.documentElement;

        if (currentHour >= 5 && currentHour < 12) {
            root.style.setProperty('--bg-color', 'var(--morning-bg)');
        } else if (currentHour >= 12 && currentHour < 17) {
            root.style.setProperty('--bg-color', 'var(--afternoon-bg)');
        } else if (currentHour >= 17 && currentHour < 20) {
            root.style.setProperty('--bg-color', 'var(--evening-bg)');
        } else {
            root.style.setProperty('--bg-color', 'var(--night-bg)');
        }
    }

    updateTheme();
});
