#!/usr/bin/env node

import { Command } from "commander";
import { init } from "../src/init/index.js";

const program = new Command();

program
  .name("mycli")
  .description("CLI to manage paths and sessions")
  .version("1.0.0");

program
  .command("push")
  .description("Push a path and session ID onto the stack")
  .option("--path <path>", "Specify the path")
  .option("--session-id <session-id>", "Specify the session ID")
  .action((options) => {
    console.log(
      `Pushing path: ${options.path} and session ID: ${options["session-id"]} onto the stack`,
    );
    // Add logic to handle push operation
  });

program
  .command("pop <session-id>")
  .description("Pop a path and session ID from the stack")
  .action((sessionId) => {
    console.log(sessionId);
  });

program
  .command("end <session-id>")
  .description("End the current session")
  .action((sessionId) => {
    console.log("Ending the current session");
    // Add logic to handle end operation
  });

program
  .command("init <shell>")
  .description("Init the cli tool")
  .action((shell) => {
    init(shell);
  });

program.parse(process.argv);
