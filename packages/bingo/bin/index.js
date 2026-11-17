#!/usr/bin/env node
import { runBingoCLI } from '../dist/index.mjs';

process.exitCode = await runBingoCLI(process.argv.slice(2));
