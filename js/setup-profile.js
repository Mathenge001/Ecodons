
  document.addEventListener("DOMContentLoaded", () => {
    const accountTypeSelect = document.getElementById("accountType");
    const individualForm = document.getElementById("individualForm");
    const organizationForm = document.getElementById("organizationForm");
    const organizationTypeSelect = document.getElementById("organizationType");
    const organizationOtherType = document.getElementById("organizationOtherType");
    const organizationOtherTypeLabel = document.querySelector('label[for="organizationOtherType"]');

    accountTypeSelect.addEventListener("change", function() {
        const selectedValue = this.value;
        if (selectedValue === "individual") {
            individualForm.style.display = "block";
            organizationForm.style.display = "none";
        } else if (selectedValue === "organization") {
            individualForm.style.display = "none";
            organizationForm.style.display = "block";
        } else {
            individualForm.style.display = "none";
            organizationForm.style.display = "none";
        }
    });

    organizationTypeSelect.addEventListener("change", function() {
        if (this.value === "other") {
            organizationOtherType.style.display = "block";
            organizationOtherTypeLabel.style.display = "block";
        } else {
            organizationOtherType.style.display = "none";
            organizationOtherTypeLabel.style.display = "none";
        }
    });
  });

  function submitIndividualForm() {
    const name = document.getElementById("individualName").value;
    const email = document.getElementById("individualEmail").value;
    const phone = document.getElementById("individualPhone").value;
    const country = document.getElementById("individualCountry").value;
    const county = document.getElementById("individualCounty").value;
    const area = document.getElementById("individualArea").value;
    const gender = document.getElementById("individualGender").value;
    const photo = document.getElementById("individualPhoto").files[0];
    const bio = document.getElementById("individualBio").value;

    if (photo) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const photoBase64 = e.target.result;
        const profileData = {
          type: "individual",
          name,
          email,
          phone,
          country,
          county,
          area,
          gender,
          photo: photoBase64,
          bio
        };
        localStorage.setItem("profile", JSON.stringify(profileData));
        window.location.href = "home-page.html"; // Redirect to individual homepage
      };
      reader.readAsDataURL(photo);
    }
  }

  function submitOrganizationForm() {
    const type = document.getElementById("organizationType").value;
    const otherType = document.getElementById("organizationOtherType").value;
    const name = document.getElementById("organizationName").value;
    const email = document.getElementById("organizationEmail").value;
    const phone = document.getElementById("organizationPhone").value;
    const country = document.getElementById("organizationCountry").value;
    const county = document.getElementById("organizationCounty").value;
    const area = document.getElementById("organizationArea").value;
    const photo = document.getElementById("organizationPhoto").files[0];
    const bio = document.getElementById("organizationBio").value;

    if (photo) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const photoBase64 = e.target.result;
        const profileData = {
          type: "organization",
          orgType: type === "other" ? otherType : type,
          name,
          email,
          phone,
          country,
          county,
          area,
          photo: photoBase64,
          bio
        };
        localStorage.setItem("profile", JSON.stringify(profileData));
        window.location.href = "home-page.html"; // Redirect to organization homepage
      };
      reader.readAsDataURL(photo);
    }
  }
