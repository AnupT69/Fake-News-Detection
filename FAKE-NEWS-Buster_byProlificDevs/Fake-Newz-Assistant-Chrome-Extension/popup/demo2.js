function updateProgressBar(confidence) {
    const progressCircle = document.getElementById("progressCircle");
    const progressText = document.getElementById("progressText");
    
    const percentage = confidence * 100;
    const strokeDashoffset = 314 - (314 * percentage) / 100; // 314 is the total stroke length
  
    progressCircle.style.strokeDashoffset = strokeDashoffset;
    progressText.textContent = `${percentage.toFixed(2)}%`;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const checkButton = document.getElementById("checkNews");
    const resultElement = document.getElementById("result");
  
    checkButton.addEventListener("click", async () => {
      const text = document.getElementById("newsText").value.trim();
  
      if (!text) {
        alert("Please enter some text to analyze.");
        return;
      }
  
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
        const confidence = data.confidence; // Keep in decimal (e.g., 0.99)
  
        updateProgressBar(confidence); // Update the progress bar
  
        if (label === "REAL") {
          resultElement.innerHTML = `✅ <span class="text-green-600">Real News</span>`;
          resultElement.className = "text-lg font-semibold mt-4 text-green-600 flex items-center";
        } else {
          resultElement.innerHTML = `⚠️ <span class="text-red-600">Fake News</span>`;
          resultElement.className = "text-lg font-semibold mt-4 text-red-600 flex items-center";
        }
      } catch (error) {
        resultElement.innerText = "Error: Unable to fetch results.";
        resultElement.className = "text-lg font-semibold mt-4 text-red-600";
      }
    });
  });
  