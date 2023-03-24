// 保存されたデータを読み込む
const storedData = JSON.parse(localStorage.getItem("temperatureData")) || [];

const dataContainer = document.getElementById("dataContainer");
storedData.forEach(data => {
    addDataItem(data.name, data.temperature, data.date);
});

const addButton = document.getElementById("addButton");
const temperatureInput = document.getElementById("temperature");

addButton.addEventListener("click", addTemperatureData);
temperatureInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTemperatureData();
    }
});

function addTemperatureData() {
    const name = document.getElementById("name").value;
    const temperature = temperatureInput.value;
    const today = new Date();
    const dateString = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

    const existingEntry = storedData.find(data => data.name === name && data.date === dateString);

    if (existingEntry) {
        alert('本日の体温は既に入力されています。');
    } else {
        addDataItem(name, temperature, dateString);

        storedData.push({ name, temperature, date: dateString });
        localStorage.setItem("temperatureData", JSON.stringify(storedData));
    }
}

function addDataItem(name, temperature, date) {
    const dataItem = document.createElement("div");
    dataItem.classList.add("data-item");

    const pData = document.createElement("p");
    pData.textContent = `${date} - ${name} の体温: ${temperature}℃`;
    dataItem.appendChild(pData);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", function () {
        const index = Array.from(dataContainer.children).indexOf(dataItem);
        storedData.splice(index, 1);
        localStorage.setItem("temperatureData", JSON.stringify(storedData));
        dataContainer.removeChild(dataItem);
    });
    dataItem.appendChild(deleteButton);

    dataContainer.appendChild(dataItem);
}
