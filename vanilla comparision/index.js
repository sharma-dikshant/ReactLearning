//! ui elements

const addformEl = document.getElementById("new-item");
const addBtn = document.getElementById("addBtn");
const packingListEl = document.getElementById("PackingList");
const sortBtn = document.getElementById("sort");
const clearBtn = document.getElementById("clear");
const statsParaEl = document.getElementById("stats-para");

const PackingList = JSON.parse(localStorage.getItem("PackingList")) || [];

//! initial Fetch

fetchItem();

addformEl.addEventListener("submit", (evt) => {
  //   evt.preventDefault();
  const formData = new FormData(addformEl, addBtn);
  const newItem = {
    name: formData.get("item"),
    quantity: formData.get("quantity"),
    checked: false,
  };

  AddItem(newItem);
  //   console.log(newItem);
});

//! adding new item to localStorage

function AddItem(item) {
  PackingList.push(item);
  localStorage.setItem("PackingList", JSON.stringify(PackingList));
  fetchItem();
}

//! adding items to UI

function fetchItem() {
  packingListEl.innerHTML = "";
  let checkedItem = 0;
  PackingList.forEach((item) => {
    if (item.checked) checkedItem++;
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");
    itemEl.innerHTML = `
                <input type="checkbox">
                <span name="details">${item.quantity} ${item.name}</span>
                <span name="remove-item" class="cross-btn">
                &#10060;
                </span>
        `;
    packingListEl.append(itemEl);
  });
  statsParaEl.innerText = `you've ${
    PackingList.length
  } items and you already packed ${checkedItem} (${Math.round(
    (checkedItem / PackingList.length) * 100
  )}%)`;
}

//! Updating the status of the list items

if (document.querySelector(`.item`))
  document.querySelector(`.item`).addEventListener("click", (evt) => {
    const parentEl = evt.target.parentNode;
    const itemDetails = parentEl
      .querySelector(`span[name="details"]`)
      .innerText.slice(1)
      .trim();
    console.log(itemDetails);
    // console.log(PackingList)
    PackingList.forEach((item) => {
      if (item.name === itemDetails) {
        item.checked = !item.checked;
        console.log("found");
      }
    });
    localStorage.setItem("PackingList", JSON.stringify(PackingList));
  });

//! deleting a task

if (document.querySelector(`span[name="remove-item"]`))
  document
    .querySelector(`span[name="remove-item"]`)
    .addEventListener("click", (evt) => {
      // console.log(evt)
      const parentEl = evt.target.parentNode;
      const itemDetails = parentEl
        .querySelector(`span[name="details"]`)
        .innerText.slice(1)
        .trim();
      // console.log(itemDetails)
      PackingList.forEach((item, index) => {
        if (item.name === itemDetails) {
          PackingList.splice(index, 1);
          console.log("remove successfully");
        }
      });
      localStorage.setItem("PackingList", JSON.stringify(PackingList));
      fetchItem();
    });

//! clearing LocalStorage

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  fetchItem();
});


