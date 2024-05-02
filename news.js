const key = "fb8164ca988a4a7e91a90adc6affb658";
const cardData = document.querySelector(".cardData");
const searchbtn = document.getElementById("searchbtn");
const inputData = document.getElementById("inputData");
const searchtype = document.getElementById("type");

const getData = async (input) => {
    try {
        const res = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=${key}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
        const jsonData = await res.json();
        if (!jsonData || !jsonData.articles || !Array.isArray(jsonData.articles)) {
            throw new Error("Invalid data received from the API");
        }
        console.log(jsonData.articles);
        searchtype.innerText = "Search: " + input;
        inputData.value = "";
        cardData.innerHTML = "";
        jsonData.articles.forEach(article => {
            console.log(article);
            const divs = document.createElement("div");
            divs.classList.add("card");
            cardData.appendChild(divs);
            divs.innerHTML = `
                <img src="${article.urlToImage}" alt="">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
            `;
            divs.addEventListener("click", () => {
                window.open(article.url);
            });
        });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        // Handle the error gracefully, e.g., display a message to the user
    }
};

window.addEventListener("load", () => {
    getData("India");
});

searchbtn.addEventListener("click", () => {
    const inputText = inputData.value;
    getData(inputText);
});

function navClick(navName) {
    if (navName === "politics") {
        document.getElementById("politics").style.color = "rgb(0, 140, 255)";
        document.getElementById("sports").style.color = "white";
        document.getElementById("technology").style.color = "white";
    } else if (navName === "sports") {
        document.getElementById("politics").style.color = "white";
        document.getElementById("sports").style.color = "rgb(0, 140, 255)";
        document.getElementById("technology").style.color = "white";
    } else if (navName === "technology") {
        document.getElementById("politics").style.color = "white";
        document.getElementById("sports").style.color = "white";
        document.getElementById("technology").style.color = "rgb(0, 140, 255)";
    }
    getData(navName);
}
