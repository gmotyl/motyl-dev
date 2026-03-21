import * as readline from "node:readline";
import * as path from "node:path";
import * as fs from "node:fs";
import { execSync } from "node:child_process";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string, defaultValue: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(`${question} [${defaultValue}]: `, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

function askYesNo(question: string, defaultYes = true): Promise<boolean> {
  const hint = defaultYes ? "yes" : "no";
  return new Promise((resolve) => {
    rl.question(`${question} [${hint}]: `, (answer) => {
      const val = answer.trim().toLowerCase();
      if (!val) return resolve(defaultYes);
      resolve(val === "y" || val === "yes");
    });
  });
}

async function main() {
  console.log("\n--- motyl-dev MCP Configuration ---\n");

  const motylDevPath = path.resolve(
    await ask("Path to motyl-dev", process.cwd())
  );

  const defaultNewsletterPath = path.resolve(motylDevPath, "..", "newsletter-ai");
  let newsletterAiPath = path.resolve(
    await ask("Path to newsletter-ai", defaultNewsletterPath)
  );

  const newsletterPkgJson = path.join(newsletterAiPath, "package.json");
  if (!fs.existsSync(newsletterPkgJson)) {
    console.log(`\nnewsletter-ai not found at ${newsletterAiPath}`);
    const shouldClone = await askYesNo("Clone from GitHub?");
    if (shouldClone) {
      console.log(`\nCloning newsletter-ai into ${newsletterAiPath}...`);
      execSync(`git clone https://github.com/gmotyl/newsletter-ai.git "${newsletterAiPath}"`, {
        stdio: "inherit",
      });
      console.log("Installing dependencies...");
      execSync("pnpm install", { cwd: newsletterAiPath, stdio: "inherit" });
    } else {
      console.log(
        "\nWarning: newsletter-ai is not set up. MCP server won't work until you install it."
      );
    }
  }

  const persona = await ask("Narrator persona", "Scott Hanselman");

  const currentYear = new Date().getFullYear();
  const outputPath = path.join(motylDevPath, "news", String(currentYear));

  const config = {
    mcpServers: {
      "newsletter-ai": {
        command: path.join(newsletterAiPath, "node_modules", ".bin", "tsx"),
        args: [path.join(newsletterAiPath, "src", "mcp", "index.ts")],
        cwd: newsletterAiPath,
        env: {
          PROJECT_DIR: newsletterAiPath,
          OUTPUT_PATH: outputPath,
          NARRATOR_PERSONA: persona,
        },
      },
    },
  };

  const mcpJsonPath = path.join(motylDevPath, ".mcp.json");
  fs.writeFileSync(mcpJsonPath, JSON.stringify(config, null, 2) + "\n");

  console.log(`\n--- Done! ---`);
  console.log(`  .mcp.json written to: ${mcpJsonPath}`);
  console.log(`  newsletter-ai path:   ${newsletterAiPath}`);
  console.log(`  output path:          ${outputPath}`);
  console.log(`  narrator persona:     ${persona}\n`);

  rl.close();
}

main().catch((err) => {
  console.error("Error:", err);
  rl.close();
  process.exit(1);
});
