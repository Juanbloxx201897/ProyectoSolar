## GitHub Copilot Chat

- Extension Version: 0.22.4 (prod)
- VS Code: vscode/1.95.3
- OS: Mac

## Network

User Settings:
```json
  "github.copilot.advanced": {
    "debug.useElectronFetcher": true,
    "debug.useNodeFetcher": false
  }
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: 140.82.114.5 (109 ms)
- DNS ipv6 Lookup: ::ffff:140.82.114.5 (90 ms)
- Electron Fetcher (configured): HTTP 200 (437 ms)
- Node Fetcher: HTTP 200 (358 ms)
- Helix Fetcher: HTTP 200 (466 ms)

Connecting to https://api.individual.githubcopilot.com/_ping:
- DNS ipv4 Lookup: 140.82.112.22 (103 ms)
- DNS ipv6 Lookup: ::ffff:140.82.112.22 (3 ms)
- Electron Fetcher (configured): HTTP 200 (360 ms)
- Node Fetcher: HTTP 200 (367 ms)
- Helix Fetcher: HTTP 200 (367 ms)

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).