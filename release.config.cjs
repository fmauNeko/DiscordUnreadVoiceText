/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ["main", { name: "develop", prerelease: true }],
  plugins: [
    ["@semantic-release/commit-analyzer", { preset: "conventionalcommits" }],
    [
      "@semantic-release/release-notes-generator",
      { preset: "conventionalcommits" },
    ],
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        npmPublish: false,
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: [
          {
            path: "dist/UnreadVoiceText.plugin.js",
            label: "UnreadVoiceText.plugin.js",
          },
        ],
      },
    ],
    [
      "@semantic-release/git",
      { assets: ["CHANGELOG.md", "package.json", "pnpm-lock.yaml"] },
    ],
  ],
};
