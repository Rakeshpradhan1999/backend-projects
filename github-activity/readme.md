# GitHub Events Tracker CLI

This simple Node.js app fetches the most recent GitHub events for a given user using the GitHub API and logs relevant information such as Push Events, Issues Events, and Star Events. The app includes a command-line interface (CLI) using `commander.js` to easily track GitHub activity.

## Features

- **Fetches user events**: Retrieves recent activities of a specified GitHub user from the GitHub API.
- **Push Events**: Displays the number of commits pushed to a repository.
- **Issue Events**: Logs when a new issue is opened in a repository.
- **Star Events**: Logs when a repository is starred by the user.

## How It Works

1. The app uses the `fetch` API to retrieve the list of recent events for the specified GitHub user.
2. The events are filtered to check for the following types:
   - `PushEvent`: For push events (commits) made by the user.
   - `IssuesEvent`: For issues opened by the user.
   - `WatchEvent`: For repositories the user starred.
3. It logs relevant messages to the console, displaying the event type and the repository name.
4. It is now enhanced with a CLI using `commander.js` for easy execution.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/github-activity-cli.git
   ```

2. Navigate to the project directory:

   ```bash
   cd github-activity-cli
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

To run the app via the command-line interface:

1. Use the `github-activity` command followed by the GitHub username.

   ```bash
   node index.js -- github-activity <username>
   ```

   Example:

   ```bash
   node index.js -- github-activity Rakeshpradhan1999
   ```

2. The app will log the user’s push, issue, and star events to the console.

## Example Output

```bash
Pushed 3 commits to example-repo
Opened a new issue in example-repo
Starred example-repo
```

## Dependencies

- [Node.js](https://nodejs.org/)
- [Commander.js](https://www.npmjs.com/package/commander)
- [TypeScript](https://www.typescriptlang.org/)

## API Reference

- [GitHub Events API](https://docs.github.com/en/rest/reference/activity#events)

## Roadmap Project Link

https://roadmap.sh/projects/github-user-activity
