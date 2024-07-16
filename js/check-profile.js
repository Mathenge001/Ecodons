// Function to submit individual form
function submitIndividualForm() {
    // Get form data
    let formData = {
        accountType: 'individual',
        individualName: document.getElementById('individualName').value,
        individualEmail: document.getElementById('individualEmail').value,
        individualPhone: document.getElementById('individualPhone').value,
        individualCountry: document.getElementById('individualCountry').value,
        individualCounty: document.getElementById('individualCounty').value,
        individualArea: document.getElementById('individualArea').value,
        individualGender: document.getElementById('individualGender').value,
        individualPhoto: document.getElementById('individualPhoto').value,
        individualBio: document.getElementById('individualBio').value
    };

    // Store form data in local storage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Redirect to home page
    window.location.href = 'home-page.html';
}

// Function to submit organization form
function submitOrganizationForm() {
    // Get form data
    let formData = {
        accountType: 'organization',
        organizationType: document.getElementById('organizationType').value,
        organizationOtherType: document.getElementById('organizationOtherType').value,
        organizationName: document.getElementById('organizationName').value,
        organizationEmail: document.getElementById('organizationEmail').value,
        organizationPhone: document.getElementById('organizationPhone').value,
        organizationCountry: document.getElementById('organizationCountry').value,
        organizationCounty: document.getElementById('organizationCounty').value,
        organizationArea: document.getElementById('organizationArea').value,
        organizationPhoto: document.getElementById('organizationPhoto').value,
        organizationBio: document.getElementById('organizationBio').value
    };

    // Store form data in local storage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Redirect to home page
    window.location.href = 'home-page.html';
}
