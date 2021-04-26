const bitcoin = require("bitcoinjs-lib");
const dhttp = require("./dhttp");
const logger = require("./log");

const f1 = () => {
  const keyPair = bitcoin.ECPair.makeRandom();
  const privateKeyCompressedWIF = keyPair.toWIF();
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });

  const keys = { privateKey: privateKeyCompressedWIF, publicKey: address };
  // console.log(keys);

  return keys;

  // console.log("address", payment.address);
  // console.log("hash", payment.hash.toJSON());
  // console.log("data", payment.data);
  // console.log("input", payment.input);
  // console.log("output", payment.output.toJSON());
  // console.log("network", payment.network);
  // console.log("redeem", payment.redeem);
  // console.log("signature", payment.signature);
  // console.log("signatures", payment.signatures);
  // console.log("witness", payment.witness);
};

const r1 = async (address) => {
  try {
    const data = await dhttp.addressInfo(address);
    if (data) {
      const flag = 1 * data.balance + 1 * data.total_received + 1 * data.total_send + 1 * data.tx_count;
      if (flag === 0) {
        console.warn(address + " is empty");
        return false;
      } else {
        console.log("BINGO !!!");
        console.log(address, data);
        console.log(data.balance);
        return true;
      }
    }
    console.log("data is undefined", data);
    console.error("data is undefined", data);
  } catch (error) {
    console.log(error);
    console.error(error);
  }

  return false;
};

const f2 = () => {
  // private:
  // KxKUvegJjKdi3BfvGDmRBiXpgmjz4CDDhfg7qXzv3SHB8FGaGQCs
  // public:
  // 17PyydCeABK3A1rydYPN6DyAzA7WcMPtEe

  const keyPair = bitcoin.ECPair.fromWIF("KxKUvegJjKdi3BfvGDmRBiXpgmjz4CDDhfg7qXzv3SHB8FGaGQCs");
  console.log(keyPair.toWIF());

  const p2pkh = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  console.log(p2pkh.pubkey.toWIF());
};

const f3 = () => {
  const private_key = "000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f";
  const decoded_private_key = bitcoin.decode_privkey(private_key, "hex");
  const wif = bitcoin.encode_privkey(decoded_private_key, "wif");
  console.log(private_key, decoded_private_key, wif);
};

const run = async () => {
  // console.log("started");
  const keys = f1();
  const result = await r1(keys.publicKey);
  if (result) {
    console.log(keys);
  }
  setTimeout(run, 500);
};

run();
