document.addEventListener("DOMContentLoaded", () => {
    const signInButton = document.getElementById('signIn');
    const signUpButton = document.getElementById('signUp');
    const container = document.querySelector('.container');
    const switchToSignUp = document.getElementById('switchToSignUp');
    const switchToSignIn = document.getElementById('switchToSignIn');

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

    document.getElementById('signInForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Add sign-in logic here
        alert('Sign in successful!');
        window.location.href = 'home-page.html';
    });

    document.getElementById('signUpForm').addEventListener('submit', function(event) {
        event.preventDefault();
        // Add sign-up logic here
        alert('Sign up successful!');
        window.location.href = 'create-account.html';
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

        // Update greeting based on time of day
        const greeting = document.getElementById('greeting');
        if (currentHour >= 5 && currentHour < 12) {
            greeting.textContent = 'Good Morning!';
        } else if (currentHour >= 12 && currentHour < 17) {
            greeting.textContent = 'Good Afternoon!';
        } else if (currentHour >= 17 && currentHour < 20) {
            greeting.textContent = 'Good Evening!';
        } else {
            greeting.textContent = 'Good Night!';
        }
    }

    updateTheme();
});
