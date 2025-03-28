#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";  // Import directly from zod
import axios from "axios";
import process from 'node:process';

// Get API key from environment variable or command line arguments
let apiKey = process.env.EUREKA_API_KEY || "";

// Check for API key in command line arguments
for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i] === "--api-key" && i + 1 < process.argv.length) {
        apiKey = process.argv[i + 1];
        break;
    }
}

// Create server instance
const server = new McpServer({
    name: "eureka-search-mcp",
    version: "1.0.0",
    capabilities: {
        tools: {},
    },
});

// Register the search tool
server.tool(
    "web_search",
    "Search the web using Eureka Search API",
    {
        query: z.string().describe("The search query"),
    },
    async ({ query }) => {
        // Log for debugging
        console.error(`[debug-server] web_search(query=${query})`);

        try {
            const response = await axios.get("https://eureka.athenaport.com/v1/search", {
                headers: {
                    "X-API-KEY": apiKey
                },
                params: {
                    query
                }
            });

            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(response.data, null, 2)
                    }
                ]
            };
        } catch (error) {
            console.error(`[debug-server] Error: ${error}`);

            // Format error message
            const errorMessage = error instanceof Error
                ? error.message
                : String(error);

            return {
                isError: true,
                content: [
                    {
                        type: "text",
                        text: `Search API error: ${errorMessage}`
                    }
                ]
            };
        }
    }
);

// Handle server startup
async function main() {
    if (!apiKey) {
        console.error("[ERROR] No API key provided. Please set the EUREKA_API_KEY environment variable or use --api-key argument.");
        process.exit(1);
    }

    try {
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.error("[INFO] Search API MCP Server running...");
    } catch (error) {
        console.error("[ERROR] Failed to start server:", error);
        process.exit(1);
    }
}

main().catch(error => {
    console.error("[FATAL] Uncaught error:", error);
    process.exit(1);
});