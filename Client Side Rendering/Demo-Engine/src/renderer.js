const pattern = new RegExp("%%(.+?)%%", "gm");

const cache = {};

export async function loadTemplates(name) {
  const url = `/templates/${name}.html`;

  if (cache[name] == undefined) {
    const response = await fetch(url);
    cache[name] = await response.text();
  }

  return cache[name];
}

export async function render(name, context) {
    const template = await loadTemplates(name)
  return template.replace(pattern, (match, name) => {
    console.log(name, "->", context[name]);

    return context[name];
  });
}
