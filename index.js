const inputBtn = document.getElementById("input-btn");
const inputElement = document.getElementById("input-el");
const list = document.getElementById("ul-El");
const deleteBtn = document.getElementById("delete-btn");
const saveTabBtn = document.getElementById("save-tab-btn");
//const cannot be reassigned, let is like normal varaible.

let leads = [];
let listItems = "";

let newLeads = JSON.parse(localStorage.getItem("myLeads"));
if (newLeads != null) {
  leads = newLeads;
}

if (leads != null && leads.length > 0) {
  for (let i = 0; i < leads.length; i++) {
    addLeads(i);
  }
}

saveTabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    leads.push(tabs[0].url);
    addLeads(leads.length - 1);
    localStorage.setItem("myLeads", JSON.stringify(leads));
  });
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  list.innerHTML = "";
});

inputBtn.addEventListener("click", function () {
  leads.push(inputElement.value);
  localStorage.setItem("myLeads", JSON.stringify(leads));
  addLeads(leads.length - 1);
  inputElement.value = "";
});

function addLeads(position) {
  //   list.innerHTML += "<li>" + leads[leads.length - 1] + "</li>";
  const listItem = document.createElement("li");
  const linkItem = document.createElement("a");
  linkItem.href = leads[position];
  linkItem.href.value = "#";
  linkItem.target = "_blank";
  linkItem.textContent = leads[position];
  listItem.append(linkItem);
  list.append(listItem);
}
