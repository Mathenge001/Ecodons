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
});
