# How to Setup MCP Servers in Cursor

## Overview

Model Context Protocol (MCP) servers allow Cursor's AI to connect to external data sources, tools, and services. This extends the AI's capabilities beyond the codebase.

## Setup Methods

### Method 1: Using Cursor Settings UI (Recommended)

1. **Open Cursor Settings**:

   - Press `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux)
   - Or go to `Cursor` > `Settings` > `Features` > `MCP`

2. **Add a New MCP Server**:

   - Click `+ Add New MCP Server`
   - Fill in the configuration:
     - **Name**: A nickname for your server
     - **Type**: Choose `stdio` (local command) or `sse` (HTTP endpoint)
     - **Command/URL**:
       - For `stdio`: Shell command to run (e.g., `npx -y @modelcontextprotocol/server-filesystem`)
       - For `sse`: URL of the SSE endpoint

3. **Configure Environment Variables**:

   - Add any required API keys or tokens in the `env` section
   - Example: `API_KEY: "your-key-here"`

4. **Save and Refresh**:
   - Save the configuration
   - Click refresh to populate available tools

### Method 2: Manual Configuration File

Cursor may also support configuration via a settings file. The exact location depends on your OS:

**macOS**: `~/Library/Application Support/Cursor/User/settings.json`  
**Windows**: `%APPDATA%\Cursor\User\settings.json`  
**Linux**: `~/.config/Cursor/User/settings.json`

Add MCP servers to your settings:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token-here"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:pass@localhost:5432/dbname"
      }
    }
  }
}
```

## Popular MCP Servers

### 1. Filesystem Server

Access local files and directories:

```json
{
  "filesystem": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/directory"]
  }
}
```

### 2. GitHub Server

Interact with GitHub repositories:

```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..."
    }
  }
}
```

### 3. PostgreSQL Server

Query databases:

```json
{
  "postgres": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-postgres"],
    "env": {
      "POSTGRES_CONNECTION_STRING": "postgresql://..."
    }
  }
}
```

### 4. Brave Search Server

Web search capabilities:

```json
{
  "brave-search": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-brave-search"],
    "env": {
      "BRAVE_API_KEY": "your-api-key"
    }
  }
}
```

### 5. SQLite Server

Query SQLite databases:

```json
{
  "sqlite": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-sqlite", "/path/to/database.db"]
  }
}
```

## Using MCP Tools in Cursor

Once configured:

1. **In Composer**: MCP tools are automatically available when relevant
2. **Explicit Usage**: Reference tools by name in your prompts
3. **Available Tools**: Check `Cursor Settings` > `Features` > `MCP` to see all available tools

## Security Considerations

⚠️ **Important Security Notes** (based on your news articles):

1. **Tool Poisoning**: MCP servers can include hidden instructions in tool descriptions that manipulate AI behavior
2. **Trust Model**: Only use MCP servers from trusted sources
3. **Access Control**: Limit filesystem access to specific directories
4. **API Keys**: Never commit API keys to version control
5. **Audit Logs**: Monitor MCP server activity, especially for production systems

## Troubleshooting

- **Server not appearing**: Restart Cursor after configuration
- **Tools not available**: Check that the server command is correct and executable
- **Authentication errors**: Verify environment variables are set correctly
- **Permission errors**: Ensure the server has access to required resources

## Resources

- [Cursor MCP Documentation](https://docs.cursor.com/advanced/model-context-protocol)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers) - Collection of MCP server implementations
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)

## Migrating from Claude Desktop to Cursor

If you have MCP servers configured in Claude Desktop (`.claude.json`), here's how to migrate them to Cursor.

### Example: Newsletter AI MCP Server Migration

**Claude Desktop Configuration** (from `.claude.json`):

```json
{
  "/Volumes/GIT/prv/newsletter-ai": {
    "mcpServers": {
      "newsletter-ai": {
        "type": "stdio",
        "command": "pnpm",
        "args": ["run:mcp"],
        "env": {}
      }
    }
  }
}
```

**Cursor Configuration** (via Settings UI or settings.json):

**Option 1: Using pnpm script** (simpler, requires working directory):

```json
{
  "mcpServers": {
    "newsletter-ai": {
      "command": "pnpm",
      "args": ["run:mcp"],
      "env": {
        "PROJECT_DIR": "/Volumes/GIT/prv/newsletter-ai"
      }
    }
  }
}
```

**Option 2: Direct tsx execution** (more explicit, matches your global Claude config):

```json
{
  "mcpServers": {
    "newsletter-ai": {
      "command": "/Volumes/GIT/prv/newsletter-ai/node_modules/.bin/tsx",
      "args": ["/Volumes/GIT/prv/newsletter-ai/src/mcp/index.ts"],
      "env": {
        "PROJECT_DIR": "/Volumes/GIT/prv/newsletter-ai"
      }
    }
  }
}
```

**Option 3: Using npx tsx** (portable, doesn't require local node_modules):

```json
{
  "mcpServers": {
    "newsletter-ai": {
      "command": "npx",
      "args": ["-y", "tsx", "/Volumes/GIT/prv/newsletter-ai/src/mcp/index.ts"],
      "env": {
        "PROJECT_DIR": "/Volumes/GIT/prv/newsletter-ai"
      }
    }
  }
}
```

### Migration Steps:

1. **Open Cursor Settings**: `Cmd+,` → `Features` → `MCP`
2. **Add New MCP Server**: Click `+ Add New MCP Server`
3. **Configure**:
   - **Name**: `newsletter-ai`
   - **Type**: `stdio`
   - **Command**: Choose one of the options above
   - **Environment Variables**: Add `PROJECT_DIR=/Volumes/GIT/prv/newsletter-ai`
4. **Save and Test**: The server should appear in your available tools

### Key Differences from Claude Desktop:

- **No project-specific config**: Cursor uses global/user-level MCP configuration (not per-project)
- **Working directory**: May need to set `cwd` or ensure commands run from correct directory
- **Environment variables**: Set in the `env` object within the server config
- **Type field**: Not always required in Cursor (defaults to `stdio`)

## Example: Setting up Filesystem Access for Your Project

For your `motyl-dev` project, you might want to allow MCP access to specific directories:

```json
{
  "mcpServers": {
    "project-files": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Volumes/GIT/prv/motyl-dev"],
      "env": {}
    }
  }
}
```

This would allow the AI to read files in your project directory when needed.
