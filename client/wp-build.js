const { exec } = require("child_process");
const { env, argv } = require("process");

const staging = argv.includes("--staging");

if (staging) {
  console.info("==== Starting WordPress service ====");

  exec("wp server --path=wp-build", (execException, stdout, stderr) => {
    console.info(stdout);
    console.error(stderr);
    if (execException) {
      throw execException;
    }
  })
    .on("spawn", () => {
      console.info("==== WordPress server successfully spawned ====");
    })
    .on("message", (code) => {
      console.info("==== WordPress message ====", code);
    })
    .on("error", (err) => {
      console.error("==== WordPress error ====", err);
    })
    .on("disconnect", () => {
      console.error("==== WordPress disconnected ====");
    })
    .on("close", (code, signals) => {
      console.error("==== WordPress closed ====", code, signals);
    })
    .on("exit", (code, signals) => {
      console.info("==== WordPress exited ====", code, signals);
    });
}

console.info("==== Starting Craco build ====");
exec("craco build --config craco.wordpress-config.ts", {
  env: {
    ...env,
    BUILD_MODE: staging ? "watch" : "simple",
    BUILD_PATH: staging
      ? "wp-build/wp-content/plugins/wcjcal"
      : "build"
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
