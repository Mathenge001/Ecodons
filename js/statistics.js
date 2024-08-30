document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const dropdownButtons = document.querySelectorAll('.dropdown-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tab) content.classList.add('active');
            });
        });
    });

    dropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdownContent = button.nextElementSibling;
            dropdownContent.classList.toggle('active');
        });
    });

    const hungerCircle = document.querySelector('#hungerCircle');
    const hungerCircleLabel = document.querySelector('#hungerCircleLabel');
    const co2Circle = document.querySelector('#co2Circle');
    const co2CircleLabel = document.querySelector('#co2CircleLabel');
    const waterCircle = document.querySelector('#waterCircle');
    const waterCircleLabel = document.querySelector('#waterCircleLabel');

    const setCircleProgress = (circle, label, percentage) => {
        const radius = circle.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (percentage / 100) * circumference;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = offset;
        label.textContent = `${percentage}%`;
    };

    setCircleProgress(hungerCircle, hungerCircleLabel, 75);
    setCircleProgress(co2Circle, co2CircleLabel, 60);
    setCircleProgress(waterCircle, waterCircleLabel, 85);

    const goalForm = document.querySelector('#goalForm');
    const goalMessage = document.querySelector('#goalMessage');

    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const goalAmount = goalForm.goalAmount.value;
        goalMessage.textContent = `Your goal of ${goalAmount} kg has been set! Keep up the great work!`;
        goalForm.reset();
    });

    const leaderboardCategory = document.querySelector('#leaderboardCategory');
    const leaderboardMetric = document.querySelector('#leaderboardMetric');
    const leaderboard = document.querySelector('#leaderboard');

    const loadLeaderboard = () => {
        const category = leaderboardCategory.value;
        const metric = leaderboardMetric.value;

        leaderboard.innerHTML = '';

        // Simulated data
        const leaders = [
            { name: 'John Doe', country: 'USA', impact: `${metric}ly Impact: ${Math.floor(Math.random() * 1000)} units`, profileImg: 'https://via.placeholder.com/50' },
            { name: 'Jane Smith', country: 'Kenya', impact: `${metric}ly Impact: ${Math.floor(Math.random() * 1000)} units`, profileImg: 'https://via.placeholder.com/50' },
            { name: 'Carlos Ruiz', country: 'Spain', impact: `${metric}ly Impact: ${Math.floor(Math.random() * 1000)} units`, profileImg: 'https://via.placeholder.com/50' },
        ];

        leaders.forEach(leader => {
            const card = document.createElement('div');
            card.classList.add('leaderboard-card');
            card.innerHTML = `
                <img src="${leader.profileImg}" alt="${leader.name}">
                <h3>${leader.name}</h3>
                <p>${leader.impact}</p>
                <p>${leader.country}</p>
            `;
            leaderboard.appendChild(card);
        });
    };

    leaderboardCategory.addEventListener('change', loadLeaderboard);
    leaderboardMetric.addEventListener('change', loadLeaderboard);

    loadLeaderboard();
});
