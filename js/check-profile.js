document.addEventListener("DOMContentLoaded", () => {
    const profileData = JSON.parse(localStorage.getItem("profile"));
    if (profileData) {
        document.getElementById("profileName").value = profileData.name;
        document.getElementById("profileEmail").value = profileData.email;
        document.getElementById("profilePhone").value = profileData.phone;
        document.getElementById("profileCountry").value = profileData.country;
        document.getElementById("profileCounty").value = profileData.county;
        document.getElementById("profileArea").value = profileData.area;
        document.getElementById("profileGender").value = profileData.gender;
        document.getElementById("profileBio").value = profileData.bio;
    }
});

function updateProfile() {
    const name = document.getElementById("profileName").value;
    const email = document.getElementById("profileEmail").value;
    const phone = document.getElementById("profilePhone").value;
    const country = document.getElementById("profileCountry").value;
    const county = document.getElementById("profileCounty").value;
    const area = document.getElementById("profileArea").value;
    const gender = document.getElementById("profileGender").value;
    const photoInput = document.getElementById("profilePhoto");
    const bio = document.getElementById("profileBio").value;

    const profileData = {
        name,
        email,
        phone,
        country,
        county,
        area,
        gender,
        bio
    };

    if (photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileData.photo = e.target.result;
            localStorage.setItem("profile", JSON.stringify(profileData));
            window.location.href = "home-page.html";
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        const existingData = JSON.parse(localStorage.getItem("profile"));
        profileData.photo = existingData.photo;
        localStorage.setItem("profile", JSON.stringify(profileData));
        window.location.href = "home-page.html";
    }
}
