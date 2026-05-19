import * as core from "@actions/core";
import * as github from "@actions/github";
import { addHeader } from "./utils.js";

async function run(): Promise<void> {
  const pullNumber = github.context.payload.pull_request?.number ?? 0;

  if (!pullNumber || pullNumber < 1) {
    core.info("Not a pull request, skipping it...");
    return;
  }

  try {
    const githubToken = core.getInput("github_token", { required: true });
    const header = core.getInput("header", { required: true });
    const octokit = github.getOctokit(githubToken);
    const repo = github.context.repo;

    const pullRequest = await octokit.rest.pulls.get({
      ...repo,
      pull_number: pullNumber,
    });

    await octokit.rest.pulls.update({
      ...repo,
      pull_number: pullNumber,
      body: addHeader(header, pullRequest.data.body ?? ""),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    core.setFailed(message);
  }
}

run();
