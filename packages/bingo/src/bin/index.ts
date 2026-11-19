#!/usr/bin/env node
import process from 'node:process';

import { runBingoCli } from '../index.ts';

process.exitCode = await runBingoCli();
