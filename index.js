import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

function getRandomDateInRange() {
  const start = moment("2021-01-01");
  const end = moment("2023-12-31");
  const diff = end.diff(start, "days");
  const randomDays = random.int(0, diff);
  return start.clone().add(randomDays, "days").format();
}

const markCommit = () => {
  const date = getRandomDateInRange();

  const data = {
    date: date,
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();
  const date = getRandomDateInRange();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }, makeCommits.bind(this, --n));
  });
};

makeCommits(100);