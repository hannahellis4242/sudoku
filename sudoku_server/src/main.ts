import { Server, Socket } from "net";
import { createProblem, run, Solution, createID, InputData } from "./utils/run";
import { Validator } from "jsonschema";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const schema = {
  $schema: "https://json-schema.org/draft/2019-09/schema",
  type: "array",
  minItems: 1,
  items: {
    type: "array",
    minItems: 2,
    maxItems: 2,
    items: [
      {
        type: "number",
      },
      {
        type: "number",
      },
    ],
  },
};

const isValidJSON = (raw: object) => {
  return new Validator().validate(raw, schema);
};

const parseJSON = (str: string): object | Error => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return new Error(err.mesage);
  }
};

const processInput = (dataStr: string, sock: Socket, date: Date) => {
  const raw = parseJSON(dataStr);
  if (raw instanceof Error) {
    sock.write(
      JSON.stringify({
        error: "parse",
        input: dataStr,
        mesage: "could not parse json",
        result: raw.message.toString(),
      })
    );
    sock.destroy();
  } else {
    console.log(date, " > parsed : ", JSON.stringify(raw));
    const result = isValidJSON(raw);
    if (result.valid) {
      const p = createProblem(raw as InputData);
      console.log(date, " > ", createID(p));
      run(p)
        .then((s: Solution) => {
          console.log(s);
          return s;
        })
        .then((s: Solution) => sock.write(JSON.stringify(s)))
        .finally(() => sock.destroy());
      console.log(date, " > solution sent.");
    } else {
      sock.write(
        JSON.stringify({
          error: "json",
          input: dataStr,
          mesage: "could not convert input to json",
          result: result.toString(),
        })
      );
      sock.destroy();
    }
  }
};

const handleConnection = (sock: Socket) => {
  const date = new Date();
  const remoteAddress = sock.remoteAddress + ":" + sock.remotePort;
  console.log(date, " > new client connection from ", remoteAddress);
  let dataStr = "";
  sock.on("data", (data: Buffer) => {
    console.log(date, " > data :", data.toString());
    dataStr += data.toString();
    if (dataStr.includes("\n")) {
      processInput(dataStr, sock, date);
      dataStr = "";
    }
  });

  sock.once("close", () =>
    console.log("connection from %s closed", remoteAddress)
  );
  sock.on("error", (err: Error) => {
    console.log("Connection %s error: %s", remoteAddress, err.message);
    sock.destroy();
  });
};

const parser = yargs(hideBin(process.argv))
  .option("port", {
    describe: "port to run the server on",
    alias: "p",
    type: "number",
    demandOption: "number",
  })
  .parseAsync()
  .then(({ port: port }) => {
    const server = new Server();
    server.on("connection", handleConnection);
    server.listen(port, function () {
      console.log("server listening on ", server.address());
    });
  });
