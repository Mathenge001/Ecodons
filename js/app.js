document.addEventListener("DOMContentLoaded", () => {
    const fadeOut = document.querySelector('.fade-out');
    const body = document.querySelector('body');
    const name = document.querySelector('.name');
    const tagline = document.querySelector('.tagline');
    const greeting = document.querySelector('.greeting');
    const intro = document.querySelector('.intro');

    const now = new Date();
    const hour = now.getHours();
    const month = now.getMonth();
    const date = now.getDate();

    let primaryColor, secondaryColor, accentColor, backgroundColor, greetingMessage;

    // Determine season
    let season;
    if (month >= 2 && month <= 4) {
        season = "Spring";
    } else if (month >= 5 && month <= 7) {
        season = "Summer";
    } else if (month >= 8 && month <= 10) {
        season = "Autumn";
    } else {
        season = "Winter";
    }

    // Determine time of day
    if (hour >= 5 && hour < 12) {
        primaryColor = season === "Winter" ? "#1E88E5" : "#FFA726";
        secondaryColor = season === "Winter" ? "#90CAF9" : "#FFEB3B";
        accentColor = season === "Winter" ? "#F48FB1" : "#FF7043";
        backgroundColor = season === "Winter" ? "#E3F2FD" : "#FFF8E1";
        greetingMessage = "Good Morning!";
    } else if (hour >= 12 && hour < 18) {
        primaryColor = season === "Winter" ? "#1E88E5" : "#0288D1";
        secondaryColor = season === "Winter" ? "#90CAF9" : "#4FC3F7";
        accentColor = season === "Winter" ? "#F48FB1" : "#FFCA28";
        backgroundColor = season === "Winter" ? "#E3F2FD" : "#E1F5FE";
        greetingMessage = "Good Afternoon!";
    } else {
        primaryColor = season === "Winter" ? "#1E88E5" : "#8E24AA";
        secondaryColor = season === "Winter" ? "#90CAF9" : "#D1C4E9";
        accentColor = season === "Winter" ? "#F48FB1" : "#FF7043";
        backgroundColor = season === "Winter" ? "#E3F2FD" : "#F3E5F5";
        greetingMessage = "Good Evening!";
    }

    // Check for public holidays
    const publicHolidays = {
        '1-1': "Happy New Year!",
        '5-1': "Happy Labour Day!",
        '6-1': "Happy Madaraka Day!",
        '10-20': "Happy Mashujaa Day!",
        '12-12': "Happy Jamhuri Day!",
        '12-25': "Merry Christmas!",
        '12-26': "Happy Boxing Day!"
    };

    const today = `${month + 1}-${date}`;
    if (publicHolidays[today]) {
        greetingMessage = publicHolidays[today];
    }

    // Easter dates for 2024 (adjust as necessary)
    const goodFriday = '3-29';
    const easterMonday = '4-1';
    if (today === goodFriday) {
        greetingMessage = "Happy Good Friday!";
    } else if (today === easterMonday) {
        greetingMessage = "Happy Easter Monday!";
    }

    // Apply styles
    body.style.background = `linear-gradient(135deg, ${secondaryColor}, ${primaryColor})`;
    name.style.color = primaryColor;
    tagline.style.color = accentColor;
    greeting.textContent = greetingMessage;
    greeting.style.color = accentColor;
    intro.style.color = "#212121"; // Text color for good contrast

    setTimeout(() => {
        fadeOut.style.backgroundColor = accentColor;
        fadeOut.classList.add('visible');
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000); // 1 second for the fade-out effect
    }, 5000); // 5 seconds to allow for the animation
});
