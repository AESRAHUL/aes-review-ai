async function generateReview() {
  const appliance = document.getElementById("applianceSelect").value;
  const reviewBox = document.getElementById("reviewBox");

  if (!appliance) {
    alert("Please select an appliance.");
    return;
  }

  reviewBox.value = "Generating review, please wait...";

  try {
    const response = await fetch("https://aes-review-api.onrender.com/generate-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ appliance })
    });

    const data = await response.json();

    if (data.review) {
      reviewBox.value = data.review;
    } else {
      reviewBox.value = "Error generating review. Please try again.";
    }
  } catch (error) {
    reviewBox.value = "Network error or API issue. Please try later.";
    console.error(error);
  }
}

function copyReview() {
  const reviewBox = document.getElementById("reviewBox");
  reviewBox.select();
  document.execCommand("copy");
  alert("Review copied!");
}
