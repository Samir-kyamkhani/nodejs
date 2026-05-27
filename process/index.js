// Node.js Process Object Reference

// Process Info
console.log(process.pid); // Current process ID
console.log(process.ppid); // Parent process ID
console.log(process.platform); // OS platform
console.log(process.arch); // CPU architecture
console.log(process.version); // Node.js version
console.log(process.versions); // Dependency versions
console.log(process.title); // Process title
console.log(process.cwd()); // Current working directory
console.log(process.argv); // Command-line arguments
console.log(process.execPath); // Node executable path
console.log(process.execArgv); // Node CLI flags
console.log(process.uptime()); // Process uptime in seconds

// Change current directory
// process.chdir('/path');

// Environment Variables
console.log(process.env); // All environment variables
console.log(process.env.PORT); // Specific environment variable

// Exit & Process Control
// process.exit(0); // Exit process with success code
process.exitCode = 0; // Set exit code

// process.kill(process.pid); // Send signal to process
// process.abort(); // Abort immediately
// process.disconnect(); // Disconnect IPC

// Memory & CPU Usage
console.log(process.memoryUsage()); // Memory details
console.log(process.cpuUsage()); // CPU usage
console.log(process.resourceUsage()); // Resource usage

console.log(process.hrtime()); // High-resolution timer
console.log(process.hrtime.bigint()); // Nanosecond timer

// Process Events
process.on("exit", (code) => {
  console.log("Process exiting with code:", code);
});

process.on("beforeExit", (code) => {
  console.log("Before exit:", code);
});

process.on("uncaughtException", (err) => {
  console.log("Unhandled Error:", err.message);
});

process.on("unhandledRejection", (reason) => {
  console.log("Unhandled Promise Rejection:", reason);
});

process.on("SIGINT", () => {
  console.log("Ctrl + C detected");
  process.exit(0);
});

// Streams
process.stdout.write("Hello stdout\n"); // Standard output
process.stderr.write("Hello stderr\n"); // Error output

// Read from stdin
// process.stdin.on('data', (data) => {
//   console.log(`Input: ${data}`);
// });

// User & Group Methods (Linux/macOS)

if (process.getuid) {
  console.log(process.getuid()); // User ID
}

if (process.getgid) {
  console.log(process.getgid()); // Group ID
}

// process.setuid(1000); // Change user ID
// process.setgid(1000); // Change group ID

// Warnings & Debugging

process.emitWarning("Custom warning message");

console.log(process.debugPort); // Debugger port
console.log(process.traceDeprecation); // Deprecation tracing

// Timing & Event Loop

process.nextTick(() => {
  console.log("Runs before setTimeout");
});

queueMicrotask(() => {
  console.log("Microtask executed");
});

setTimeout(() => {
  console.log("Timeout executed");
}, 0);

// IPC (Child Processes)

console.log(process.connected); // IPC connected or not
console.log(process.channel); // IPC channel

// process.send({ hello: 'world' }); // Send message to parent process

// Useful Examples

// Example: CLI Arguments
console.log("CLI Args:", process.argv.slice(2));

// Example: Current Folder
console.log("Current Folder:", process.cwd());

// Example: Heap Memory
console.log("Heap Used:", process.memoryUsage().heapUsed);

// Example: Environment Variable
console.log("PORT:", process.env.PORT || 3000);
