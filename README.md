# Eureka Search MCP

A Model Context Protocol (MCP) server implementation for integrating with the Eureka search API. This project provides a seamless interface for web search capabilities through MCP.

## Features

- MCP-compliant server implementation
- Integration with Eureka search API
- TypeScript/Node.js based implementation
- Docker container support

## Prerequisites

- Node.js (v18 or higher recommended)
- Docker (optional, for containerized deployment)
- TypeScript

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eureka-search-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Usage

### Local Development

1. Build the project:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

## Project Structure

```
eureka-search-mcp/
├── src/              # Source code
├── build/            # Compiled JavaScript output
├── .devcontainer/    # Development container configuration
├── .github/          # GitHub workflows and configuration
└── tsconfig.json     # TypeScript configuration
```

## Development

The project is built with TypeScript and uses the following key dependencies:
- `@modelcontextprotocol/sdk`: MCP SDK for server implementation
- `axios`: HTTP client for API requests
- `zod`: Schema validation

## License

MIT License - see the LICENSE file for details.

## Author

BASEVEC Limited
