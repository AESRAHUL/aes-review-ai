document.getElementById('generateBtn').addEventListener('click', async () => {
  const appliance = document.getElementById('applianceInput').value;
  const responseElement = document.getElementById('reviewResult');

  try {
    const response = await fetch('https://aes-review-ai.onrender.com/generate-review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appliance })
    });

    const data = await response.json();

    if (data.review) {
      responseElement.textContent = data.review;
    } else {
      responseElement.textContent = 'Failed to generate review.';
    }
  } catch (error) {
    console.error(error);
    responseElement.textContent = 'Error generating review.';
  }
});
