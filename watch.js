import { execa } from 'execa';

// "Warmup" to make sure app is built before we start watching wordpress
await execa('npm', ['run', 'build', '-w', 'packages/shared']).pipeStdout(
	process.stdout,
);
await execa('npm', ['run', 'build', '-w', 'packages/app']).pipeStdout(
	process.stdout,
);

// Now we watch for changes in app and wordpress concurrently
execa('npm', ['run', 'watch', '-w', 'packages/app']).pipeStdout(process.stdout);
execa('npm', ['run', 'watch', '-w', 'packages/wordpress']).pipeStdout(
	process.stdout,
);
