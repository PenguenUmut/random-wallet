const axios = require("axios");

const addressInfo1 = (address) => {
  return axios
    .get("https://blockchain.info/rawaddr/" + address)
    .then((response) => {
      const data = response.data;
      return { balance: data.final_balance, total_received: data.total_received, total_send: data.total_sent, tx_count: data.n_tx };
    })
    .catch((er) => {
      console.error(er.response.statusText);
      throw er.response.statusText;
    });
};

const addressInfo = (address) => {
  return axios
    .get("https://explorer.viawallet.com/res/btc/addresses/" + address)
    .then((response) => {
      const data = response.data.data;
      return { balance: data.balance, total_received: data.total_receive, total_send: data.total_send, tx_count: data.tx_count };
    })
    .catch((er) => {
      console.error(er.response.statusText);
      throw er.response.statusText;
    });
};

exports.addressInfo = addressInfo;
