const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Files Name
const fileNames = [
  "a_example",
  "b_small",
  "c_medium",
  "d_quite_big",
  "e_also_big"
];

// Reading file one by one
fileNames.forEach(filename => {
  var lineReader = readline.createInterface({
    input: fs.createReadStream(
      path.join(__dirname, "..", `/Input/${filename}.in`)
    )
  });

  let data = [];

  lineReader.on("line", function(line) {
    data.push(line.split(" "));
  });

  lineReader.on("close", function() {
    let max, n, inputs;

    [max, n] = data[0];
    inputs = data[1];
    solve(max, n, inputs, filename);
  });
});

// max: maximum slices
// n: types of pizza
// inputs: array (the number of slices in each type of pizza)
const solve = (max, n, inputs, filename) => {
  let index;
  let solve = [];
  let total = 0;

  // Decrease the traversable size of the initial Pizza array in reverse order, by
  for (let i = n - 1; i >= 0; i--) {
    let sum = 0;
    index = i;
    let tempsolve = [];

    // Traverse the current Pizza array in reverse order
    for (let j = index; j >= 0; j--) {
      let value = Number(inputs[j]);

      let tempsum = sum + value;

      if (tempsum == max) {
        sum = tempsum;
        tempsolve.unshift(j);
        break;
      } else if (tempsum > max) {
        continue;
      } else if (tempsum < max) {
        sum = tempsum;
        tempsolve.unshift(j);
        continue;
      }
    }

    if (total < sum) {
      total = sum;
      solve = tempsolve;
    }
  }
  const numberOfPizzaTypes = solve.length;

  console.log("Total number of pizzas:", total);
  console.log("No. of Pizzas types: ", numberOfPizzaTypes);
  console.log(solve.join(" "));

  fs.appendFile(
    path.join(__dirname, "..", `/Output/${filename}.out`),
    numberOfPizzaTypes + "\n",
    function(err) {
      if (err) return console.log(err);

      fs.appendFile(
        path.join(__dirname, "..", `/Output/${filename}.out`),
        solve.join(" "),
        function(err) {
          if (err) return console.log(err);

          fs.close(
            path.join(__dirname, "..", `/Output/${filename}.out`),
            err => {
              if (err) throw err;
            }
          );
        }
      );
    }
  );
};
