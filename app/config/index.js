import nconf from "nconf";
import path from "path";

nconf.argv()
    .env();

nconf.add("app", { type: "file", file: path.join(__dirname, "default.json") });
nconf.add("db", { type: "file", file: path.join(__dirname, "db.json") });

export default nconf;
