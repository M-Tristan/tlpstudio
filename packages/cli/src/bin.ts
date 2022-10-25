import { Command } from "commander";
import { createNode } from "./action";

// import {prompt} from 'inquirer'

const program = new Command();

program
    .command("create:node")
    .description("Create a component")
    .action(createNode);

program.on("command:*", () => {
    program.outputHelp();
    process.exitCode = 1;
});

program.parse();
