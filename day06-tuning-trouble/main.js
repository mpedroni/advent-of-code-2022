const fs = require("fs");

const input = fs.readFileSync("./input-prod.txt");

const datastream = input.toString();

function getFirstStartOfPacketMarker(datastream, packetSize) {
  const packets = datastream.length - packetSize - 1;

  for (let n = 0; n < packets; n++) {
    const packet = datastream.substring(n, n + packetSize);
    const characters = new Set(packet.split(""));
    const hasRepeatedCharacters = characters.size < packetSize;

    if (!hasRepeatedCharacters) return n + packetSize;
  }
}

console.log(
  "part one -> necessary characters (packet size 4)",
  getFirstStartOfPacketMarker(datastream, 4)
);

console.log(
  "part two -> necessary characters (packet size 14)",
  getFirstStartOfPacketMarker(datastream, 14)
);
