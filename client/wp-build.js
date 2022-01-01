const { exec } = require("child_process");
const { env, argv } = require("process");

const staging = argv.includes("--staging");

console.info("==== Starting Craco build ====");
exec("craco build --config craco.wordpress-config.ts", {
  env: {
    ...env,
    BUILD_MODE: staging ? "watch" : "simple",
    BUILD_PATH: "build",
    API_URL: staging ? "http://localhost:8081/calendar-api" : "https://wcj.hemsida.eu/calendar-api"
  },
}, (execException, stdout, stderr) => {
  console.info(stdout);
  console.error(stderr);
  if (execException) {
    throw execException;
  }
})
  .on("spawn", () => {
    console.info("==== Craco build successfully spawned ====");
  })
  .on("message", (code) => {
    console.info("==== Craco build message ====", code);
  })
  .on("error", (err) => {
    console.error("==== Craco build error ====", err);
  })
  .on("exit", (code, signals) => {
    console.info("==== Craco exited ====", code, signals);
  });;
