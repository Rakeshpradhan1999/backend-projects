import { Command } from "commander";
const program = new Command();

const fetchData = async (username: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const main = async (username: string) => {
  const data = await fetchData(username);
  if (!data) return;
  const pushEvents = data.filter((event: any) => event.type === "PushEvent");
  if (pushEvents.length > 0) {
    console.log(
      `Pushed ${pushEvents.length} commits to ${pushEvents[0].repo.name}`
    );
  }
  const issueEvents = data.filter((event: any) => event.type === "IssuesEvent");
  if (issueEvents.length > 0) {
    console.log(`Opened a new issue in ${issueEvents[0].repo.name}`);
  }

  const starEvents = data.filter((event: any) => event.type === "WatchEvent");
  if (starEvents.length > 0) {
    console.log(`Starred ${starEvents[0].repo.name}`);
  }
};

program.command("github-activity <username>").action(async (username) => {
  await main(username);
});

program.parse();
