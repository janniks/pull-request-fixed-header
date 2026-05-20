<p>
  <a href="https://github.com/janniks/pull-request-fixed-header/actions"><img alt="build status" src="https://github.com/janniks/pull-request-fixed-header/workflows/build/badge.svg"></a>
  <a href="./LICENSE"><img alt="License MIT" src="https://img.shields.io/badge/License-MIT-brightgreen.svg"></a>
</p>

# Pull Request Fixed Header

> Keep a custom message stuck at the top of your PR description.

Inspired by [fixed-pull-request-comment](https://github.com/marocchino/fixed-pull-request-comment), but updates the PR's description instead of adding a separate comment. The action looks for a sticky marker (`<!-- Sticky Header Marker -->`) in the body: on first run it prepends `header + marker`, on subsequent runs it replaces everything up to and including the marker.

Runs on the Node 24 GitHub Actions runtime.

## Usage

```yaml
name: PR header
on:
  pull_request:
    branches: [master]

jobs:
  sticky-header:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: janniks/pull-request-fixed-header@v1.2.0
        with:
          header: "> 🚀 This message is automated and the run number is: **${{ github.run_number }}**"
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### SHA-pinned (recommended for org policies)

```yaml
- uses: janniks/pull-request-fixed-header@<full-commit-sha> # v1.2.0
```

### Triggering outside `pull_request` events

When running from `workflow_dispatch`, `repository_dispatch`, `push`, etc., pass `pr-number` explicitly so the action knows which PR to update:

```yaml
on:
  workflow_dispatch:
    inputs:
      pr-number:
        type: string
        required: true

jobs:
  sticky:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: janniks/pull-request-fixed-header@v1.2.0
        with:
          header: "> Snapshot published"
          pr-number: ${{ inputs.pr-number }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

| Name                 | Required | Default  | Description                                                                                           |
| -------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------------- |
| `header`             | yes      | —        | Markdown to stick at the top of the PR body.                                                          |
| `pr-number`        | no       | —        | PR number to update. Defaults to `github.event.pull_request.number` on `pull_request` events.         |
| `destination_branch` | no       | `master` | Base branch of the PR.                                                                                |
| `GITHUB_TOKEN`       | yes      | —        | Token used to read & update the PR body.                                                              |
