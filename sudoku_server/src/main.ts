import { Server, Socket } from "net";
import { createProblem, run, Solution, createID, InputData } from "./utils/run";
import { Validator } from "jsonschema";

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

const handleConnection = (sock: Socket) => {
  const date = new Date();
  const remoteAddress = sock.remoteAddress + ":" + sock.remotePort;
  console.log(date, " > new client connection from ", remoteAddress);
  sock.on("data", (data: Buffer) => {
    console.log(date, " > data :", data.toString());
    const raw = parseJSON(data.toString());
    if (raw instanceof Error) {
      sock.write(
        JSON.stringify({
          error: "parse",
          input: data.toString(),
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
        run(p).then((s: Solution) => {
          sock.write(JSON.stringify(s));
          sock.destroy();
        });
      } else {
        sock.write(
          JSON.stringify({
            error: "json",
            input: data.toString(),
            mesage: "could not convert input to json",
            result: result.toString(),
          })
        );
        sock.destroy();
      }
    }

    sock.once("close", () => {
      console.log("connection from %s closed", remoteAddress);
    });
    sock.on("error", (err: Error) => {
      console.log("Connection %s error: %s", remoteAddress, err.message);
      sock.destroy();
    });
  });
};

const server = new Server();
server.on("connection", handleConnection);
server.listen(3000, function () {
  console.log("server listening to %j", server.address());
});
