#!/usr/bin/env node
import process from 'node:process';

import { runBingoCLI } from '../index.ts';

process.exitCode = await runBingoCLI();
