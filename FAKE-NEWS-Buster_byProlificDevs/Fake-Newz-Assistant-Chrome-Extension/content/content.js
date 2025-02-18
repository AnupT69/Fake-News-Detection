async function analyzePageContent() {
  const paragraphs = document.querySelectorAll("p"); // Select all paragraph text

  for (let p of paragraphs) {
    const text = p.innerText.trim();
    if (text.length > 10) {
      // Avoid analyzing very short texts
      try {
        const response = await fetch(
          "https://anup069-fake-news-detection-api.hf.space/verify/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          }
        );

        const data = await response.json();

        if (data.label === "Fake News") {
          p.style.backgroundColor = "rgba(255, 0, 0, 0.3)"; // Highlight fake news in red
        } else {
          p.style.backgroundColor = "rgba(0, 255, 0, 0.3)"; // Highlight real news in green
        }
      } catch (error) {
        console.error("Error analyzing text:", error);
      }
    }
  }
}

// Run when the page loads
window.onload = analyzePageContent;
