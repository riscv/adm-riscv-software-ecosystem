import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ROOT = process.cwd();
const dataPath = path.join(ROOT, "public", "data.yaml");
const schemaPath = path.join(ROOT, "schema", "data.schema.json");

// Load files
const rawYaml = fs.readFileSync(dataPath, "utf8");
const rawSchema = fs.readFileSync(schemaPath, "utf8");

const data = yaml.load(rawYaml);
const schema = JSON.parse(rawSchema);

// Set up AJV
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const validate = ajv.compile(schema);
const valid = validate(data);

if (!valid) {
  console.error("❌ data.yaml failed schema validation.\n");
  console.error(JSON.stringify(validate.errors, null, 2));
  process.exit(1);
}

console.log("✅ data.yaml passed schema validation.");