document.addEventListener("DOMContentLoaded", () => {
  const checkButton = document.getElementById("checkNews");
  const resultElement = document.getElementById("result");

  checkButton.addEventListener("click", async () => {
    const text = document.getElementById("newsText").value.trim();

    if (!text) {
      alert("Please enter some text to analyze.");
      return;
    }

    // Reset result text and styles
    resultElement.innerText = "Analyzing...";
    resultElement.className = "text-lg font-semibold mt-4 text-blue-500";

    try {
      const response = await fetch(
        "https://anup069-fake-news-detection-api.hf.space/verify/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) {
        throw new Error("API error");
      }

      const data = await response.json();
      const label = data.label.toUpperCase();
      const confidence = (data.confidence * 100).toFixed(2); // Convert to percentage

      if (label === "REAL") {
        resultElement.innerHTML = `<span class="warning-icon">&#9989;&nbsp</span> 
        <span class="text-green-600">Real News &nbsp;</span> (Score: ${confidence}%)`;
        resultElement.className = "text-lg font-semibold mt-4 text-green-600 flex items-center";
      } else {
        resultElement.innerHTML = `<span class="warning-icon">&#9888;&nbsp</span> <span class="text-red-600 font-bold">Fake News &nbsp;</span> (Confidence: ${confidence}%)`;
        resultElement.className = "text-lg font-semibold mt-4 text-red-600 flex items-center";
      }
    } catch (error) {
      resultElement.innerText = "Error: Unable to fetch results.";
      resultElement.className = "text-lg font-semibold mt-4 text-red-600";
    }
  });
});
