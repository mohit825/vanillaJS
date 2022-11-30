const template = document.querySelector("[data-card-template]");
const userCards = document.querySelector("[data-user-cards-container]");

let allUsers = [];
const inputHandle = (e) => {
  const value = e.target.value.toLowerCase();
  allUsers.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);
    user.card.classList.toggle("hide", !isVisible);
  });
};

const input = document
  .querySelector("[data-input]")
  .addEventListener("input", inputHandle);

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    return response.json();
  })
  .then((users) => {
    allUsers = users.map((user) => {
      const card = template.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const email = card.querySelector("[data-email]");
      header.textContent = user.name;
      email.textContent = user.email;
      userCards.append(card);
      return {
        name: user.name,
        email: user.email,
        card,
      };
    });
  });
