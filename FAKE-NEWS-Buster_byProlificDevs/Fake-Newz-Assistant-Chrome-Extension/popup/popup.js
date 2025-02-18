// Load the stored theme preference
// chrome.storage.local.get("darkMode", (data) => {
//   if (data.darkMode) {
//     document.documentElement.classList.add("dark");
//     toggleModeBtn.querySelector("span").innerHTML = "&#9728;";
//   } else {
//     document.documentElement.classList.remove("dark");
//     toggleModeBtn.querySelector("span").innerHTML = "&#9790;";
//   }
// });

document.getElementById("checkNews").addEventListener("click", async () => {
  const text = document.getElementById("newsText").value.trim();

  if (!text) {
    alert("Please enter some text to analyze.");
    return;
  }

  document.getElementById("result").innerText = "Analyzing...";
  document.getElementById("result").className = "text-lg text-center font-semibold mt-4 text-blue-700";

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
    document.getElementById("result").innerText = `Result: ${
      data.label
    }\n (Score: ${data.confidence.toFixed(2) * 100}%)`;

    // if (data.label === "Real News") {
    //   document.getElementById("result").innerHTML = `<span class="warning-icon">&#9989;&nbsp</span> 
    //   <span class="text-green-600">Real News &nbsp;</span> (Score: ${confidence}%)`;
    //   document.getElementById("result").className = "text-lg font-semibold mt-4 text-green-600 flex items-center";
    // } else {
    //   document.getElementById("result").innerHTML = `<span class="warning-icon">&#9888;&nbsp</span> <span class="text-red-600 font-bold">Fake News &nbsp;</span> (Confidence: ${confidence}%)`;
    //   document.getElementById("result").className = "text-lg font-semibold mt-4 text-red-600 flex items-center";
    // }

  } catch (error) {
    document.getElementById("result").innerText =
      "Error: Unable to fetch results.";
  }
});
