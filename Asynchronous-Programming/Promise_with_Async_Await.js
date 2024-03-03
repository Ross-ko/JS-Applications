async function demo() {
  console.log("Hello");

  const p = new Promise(executor);

  try {
    const result = await p;
    console.log("Result:", result);
  } catch (error) {
    console.log("Encountered error:", error);
  }

  console.log("there");

  function executor(resolve, reject) {
    console.log("executing");

    setTimeout(resolve, 3000, "Bye!");
  }
}

demo();
