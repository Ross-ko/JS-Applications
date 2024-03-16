export async function request(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    alert(err.message);
    throw err;
  }
}