const root = document.querySelector("main");

const items = [
  {
    id: "1",
    name: "Wiper Fluid",
  },
  {
    id: "2",
    name: "Headlight Lamp",
  },
  {
    id: "3",
    name: "Spare tire",
  },
];

export async function loadData(ctx, next) {
  root.innerHTML = `<p>LOADING &hellip;</p>`;

  await new Promise((r) => setTimeout(r, 2000));

  ctx.data = items;

  next();
}

export function showEShop(ctx) {
  root.innerHTML = `
  <p>E-Shop</p>
  <ul>
    ${ctx.data
      .map((i) => `<li><a href="/eshop/${i.id}">${i.name}</a></li>`)
      .join("\n")}
  </ul>
  `;
}
export function itemNotFound() {
  root.innerHTML = `<p>Item not found!!!</p>`;
}

export function showDetails(ctx) {
  console.log(ctx);

  const productId = ctx.params.id;
  const item = items.find((i) => i.id == productId);

  root.innerHTML = `
  <p>Product details</p>
  <p>${item.name}</p>
  `;
}

export function showCategory(ctx) {
  console.log(ctx.params);

  root.innerHTML = `
  <p>Category listing for ${ctx.params.category}</p>
  <button>Back to catalog</button>
  `;

  root.querySelector("button").addEventListener("click", () => {
    ctx.page.redirect("/eshop");
  });
}
