// const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

// NETWORK_ID = 97; //97 = BSTTest, 5 = ETH GOERLI
NETWORK_ID = 56; //97 = BSTTest, 5 = ETH GOERLI, 43113 = testnet
// const contractAddress = "0xaDF174f0f2498bf391577A3B18CE47cd03c92a66"; // AVAX test net address
networkName = "PulseChain TestNet ";
contractAddress = "SET ME BELOW"; // Polygon test net address
RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";
baseDexURL = "https://app.pangolin.exchange/#/swap?outputCurrency=";
buyURL =
  "https://pancake.kiemtienonline360.com/#/swap?outputCurrency=0x5435F764717dc82198EdA554B31394fF4b7D2b47";

const minABI = [
  "function balanceOf(address) view returns (uint)",
  "function stakedBalanceOf(address) view returns (uint)",
  "function activeStakeCount() view returns (uint)",
  "function getAllStakesOf(address) view returns (uint[8][])",
  "function name() view returns(string)",
  "function stake(uint, uint, uint) returns(bool)",
  "function endStake(uint) returns(bool)",
  "function transfer(address,uint)"
];

async function setNetwork() {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const network = await provider.getNetwork();
  chainId = network.chainId;
  NETWORK_ID = chainId;
  console.log("setting chainId = ", NETWORK_ID);
  initializeNetwork();
}

function initializeNetwork() {
  console.log("initializing network with ID ", NETWORK_ID);
  // NETWORK_ID = 97; //97 = BSTTest, 5 = ETH GOERLI
  // const contractAddress = "0xaDF174f0f2498bf391577A3B18CE47cd03c92a66"; // AVAX test net address
  // const contractAddress = "0x9213B82ad6586977df68ae1579673AC23C28594f"; // BSC test net address

  if (NETWORK_ID == 5) {
    networkName = "ETH TEST GOERLI";
    RPC_URL = "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
  } else if (NETWORK_ID == 940) {
    networkName = "PulseChain TESTNET";
    RPC_URL = "https://rpc.testnet.pulsechain.com";
    baseDexURL = "https://app.sushi.com/swap?outputCurrency=";
    contractAddress = "0xc999682Cb67D8CE8ACa75b37D37AE214fdd10B2C";
  } else if (NETWORK_ID == 56) {
    networkName = "BSC";
    RPC_URL = "https://bsc-dataseed1.binance.org";
    baseDexURL = "https://pancakeswap.finance/swap?outputCurrency=";
    contractAddress = "0x5106f787E8778a86D1928ed5ad0B0215dBFA00b8";
  } else if (NETWORK_ID == 97) {
    networkName = "BSC TESTNET";
    RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545";
    baseDexURL = "https://pancake.kiemtienonline360.com/#/swap?outputCurrency=";
    contractAddress = "0xF7379af8ebfe5524375c639Ee57DF841FEa62bEc";
  } else if (NETWORK_ID == 111) {
    networkName = "VLX TestNet";
    RPC_URL = "https://evmexplorer.testnet.velas.com/rpc";
    baseDexURL = "https://pancake.kiemtienonline360.com/#/swap?outputCurrency=";
  } else if (NETWORK_ID == 80001) {
    networkName = "Polygon TestNet";
    RPC_URL = "https://rpc-mumbai.matic.today";
    baseDexURL = "https://app.sushi.com/swap?outputCurrency=";
  } else if (NETWORK_ID == 137) {
    networkName = "Polygon TestNet";
    RPC_URL = "https://polygon-rpc.com/";
    baseDexURL = "https://quickswap.exchange/#/swap?outputCurrency=";
    contractAddress = "0xB441473B4d0280797B6390edE531A1d0679F15c9"; // Polygon test net address
  } else if (NETWORK_ID == 43113) {
    networkName = "AVAX TESTNET";
    RPC_URL = "https://api.avax-test.network/ext/bc/C/rpc";
    baseDexURL = "https://app.pangolin.exchange/#/swap?outputCurrency=";
  } else if (NETWORK_ID == 43114) {
    networkName = "AVAX";
    RPC_URL = "https://api.avax.network/ext/bc/C/rpc";
    baseDexURL = "https://app.pangolin.exchange/#/swap?outputCurrency=";
  } else RPC_URL = "https://data-seed-prebsc-1-s1.binance.org:8545";

  // **************************************************************
  // **************************************************************
  // ****************     GAXE TOKEN by Michel A.******************
  // **************************************************************
  // **************************************************************

  const provider2 = new ethers.providers.JsonRpcProvider(RPC_URL);
  const signer2 = provider2.getSigner();
  buyURL =
    "https://pancake.kiemtienonline360.com/#/swap?outputCurrency=0x5435F764717dc82198EdA554B31394fF4b7D2b47";

  readDAXContract = new ethers.Contract(contractAddress, minABI, provider2);
  signedDAXContract = new ethers.Contract(contractAddress, minABI, signer2);
  ownerAddress = "";
  txContract = null;
  daxBalance = 0;
}

initializeNetwork();

// **************************************************************
// **************************************************************
// ****************     GAXE TOKEN by Michel A.******************
// **************************************************************
// **************************************************************

// web3.eth.getBalance('0xc691644B8095F9C4bb8a002Acec957F4FFe368c1').then(console.log)
// alert("timmay 3")

window.ethereum.on("accountChanged", () => {
  window.location.reload();
});

window.ethereum.on("chainChanged", () => {
  window.location.reload();
});

window.ethereum.on("disconnect", () => {
  window.location.reload();
});

function initialize() {
  document.getElementById("buyURLID").href = baseDexURL + contractAddress;
  document.getElementById("buyURLID2").href = baseDexURL + contractAddress;
  // document.getElementById("buyURLID").href = "sacrifice.html";
  // document.getElementById("buyURLID2").href = "sacrifice.html";
  document.getElementById("networkNameID").innerHTML = networkName;

  // var todayDate = new Date();
  // var maxDate = new Date(todayDate + 1000 * 60 * 60 * 24 * 365.25 * 15.2);
  // console.log("Start date on initialize ", todayDate.prototype.toISOString());
  // document.getElementById(
  //   "releaseDateID"
  // ).min = todayDate.prototype.toISOString();
  // document.getElementById(
  //   "releaseDateID"
  // ).max = maxDate.prototype.toISOString();

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time = "T" + today.getHours() + ":" + today.getMinutes();
  var dateTime = date + "" + time;

  $("#releaseDateID").val(dateTime);

  // updateInfo();
}

function calculateDays() {
  $("numDaysStakeID").innerHTML = $("#releaseDateID").val();
  pickedDate = new Date($("#releaseDateID").val());
  numDays = pickedDate - new Date();
  numDays = numDays / (1000 * 60 * 60 * 24);
  // console.log(
  //   "amount to stake " + $("#amountToStakeID").val() + " days " + numDays
  // );
  displayProjectedPayout(
    parseFloat($("#amountToStakeID").val()),
    parseInt(numDays)
  );
  $("#numDaysStakeID").html(Math.floor(numDays));
}

function computeTotalInterest(amountToStake, numDays) {
  numDays = Math.floor(numDays) + 0;
  cumulativeInterest = 0;
  let baseInterest = 0.0;
  let longStayInterest = 0.0;
  let startingAmount = 0.0 + amountToStake;
  for (i = 0; i < numDays; i++) {
    baseInterest = (0.2 * startingAmount) / 365;
    longStayInterest = getLongStayInterestAtDayN(startingAmount, i);
    amountToStake = amountToStake + baseInterest + longStayInterest;
  }
  return amountToStake;
}

function displayProjectedPayout(amountToStake, numDays) {
  cumulativeInterest = 0;
  let baseInterest = 0.0;
  let longStayInterest = 0.0;
  let startingAmount = 0.0 + amountToStake;
  for (i = 0; i < numDays; i++) {
    baseInterest = (0.2 * startingAmount) / 365;
    longStayInterest = getLongStayInterestAtDayN(startingAmount, i);
    amountToStake = amountToStake + baseInterest + longStayInterest;

    // console.log(
    //   "amountToStake = ",
    //   amountToStake,
    //   " daily Interest = ",
    //   baseInterest,
    //   "longStayInterest = ",
    //   longStayInterest
    // );
  }
  $("#projectedPayoutID").html(Math.floor(amountToStake));
  // return amountToStake;
}

function getLongStayInterestAtDayN(amountToStake, daysStaked) {
  daysStaked = Math.min(daysStaked, 5555);
  interestAtDayN = daysStaked / 5555;
  interestAtDayN = interestAtDayN ** 2;

  interestAtDayN = 2 * interestAtDayN;
  interestAtDayN = interestAtDayN / 365;

  // console.log("long interest at day N ", interestAtDayN);

  return amountToStake * interestAtDayN;
}

async function transfer() {
  txProvider = new ethers.providers.Web3Provider(window.ethereum);
  txSinger = txProvider.getSigner();
  txContract = new ethers.Contract(contractAddress, minABI, txSinger);

  console.log("add ", txContract.address);
  tokenName = await txContract.name();
  console.log("name ", tokenName);

  // await txContract.transfer(
  //   "0x91DDCA3860BC5aDa1725230754aB1D2954105954",
  //   ethers.utils.parseUnits("10000.0", 18)
  // );
}

async function stakeToken() {
  document.getElementById("stakingErrorMessage").innerHTML = "";
  txProvider = new ethers.providers.Web3Provider(window.ethereum);
  txSinger = txProvider.getSigner();
  txContract = new ethers.Contract(contractAddress, minABI, txSinger);

  amountToStake = document.getElementById("amountToStakeID").value;

  $("#numDaysStakeID").innerHTML = $("#releaseDateID").val();
  pickedDate = new Date($("#releaseDateID").val());

  todayDate = new Date();

  duration = Math.floor((pickedDate - todayDate) / (1000 * 60 * 60 * 24));

  if (duration < 2) {
    document.getElementById("stakingErrorMessage").innerHTML =
      "Staking duration too small ...";
    return -1;
  }
  // numDays = pickedDate - new Date();
  // $("#numDaysStakeID").html(Math.floor(numDays / (1000 * 60 * 60 * 24)));

  console.log(" start " + new Date().getTime());
  console.log(" end " + pickedDate.getTime());

  await txContract
    .stake(
      ethers.utils.parseUnits("" + amountToStake, 18),
      new Date().getTime(),
      pickedDate.getTime()
    )
    .then(updateInfo());
  timmay = 0.1;

  await setTimeout(updateInfo, 3000);
  // await updateInfo();
}

async function unstakeToken() {
  txProvider = new ethers.providers.Web3Provider(window.ethereum);
  txSinger = txProvider.getSigner();
  txContract = new ethers.Contract(contractAddress, minABI, txSinger);

  amountToStake = document.getElementById("stakeID").value;
  await txContract.endStake(amountToStake).then(updateInfo());
  timmay = 0.1;

  await setTimeout(updateInfo, 3000);
  // await updateInfo();
}

async function connectWallet() {
  // walletProvider = window.web3.currentProvider;
  netVersion = -1;
  ethereum.request({ method: "net_version" }).then((value) => {
    console.log("Current network = ", value);
    connectWalletFollow(value);
  });
}

async function connectWalletFollow(netVersion) {
  if (parseInt(netVersion) != NETWORK_ID) {
    console.log("Network before balance ", netVersion);
    showBalance("Wrong Network !");
    document.getElementById("connectButtonID").innerHTML = "Wrong Network !";
    document.getElementById("stakingErrorMessage").innerHTML =
      "Wrong Network !";

    return -1;
  }
  document.getElementById("connectButtonID").innerHTML = "Connecting...";
  document.getElementById("connectButtonID").style.background = "#ffa85c";
  document.getElementById("refreshButtonID").style.background = "#ffa85c";

  try {
    ownerAddress = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    ownerAddress = ownerAddress[0];
    // console.log("timmay 22 ... " + ownerAddress);

    await setTimeout(updateInfo, 3000);

    // await updateInfo();
  } catch (err) {
    console.log(err);
  }
  console.log(
    " after connect txProvider + signer" + txProvider.getSigner(0).getAddress()
  );
}

async function updateInfo() {
  // $("connectButtonID")
  showBalance("...");
  showStakedBalance("stakes");

  document.getElementById("connectButtonID").innerHTML =
    "Connected ..." + ownerAddress.substring(ownerAddress.length - 5);

  // document.getElementById("connectButtonID").style.background = "#F934F0";
  document.getElementById("connectButtonID").style.background = "#17D186";
  document.getElementById("refreshButtonID").style.background = "#17D186";

  // console.log("Ppdating the page info...");
  showWalletAddress();

  // var options = { gasPrice: 1000000000, gasLimit: 85000, nonce: 45, value: 0 };
  // var fooPromise = contract.foo(address, options);

  // daxBalance = await readDAXContract.balanceOf(ownerAddress, {
  //   gasPrice: 25000000000000,
  //   gasLimit: 85000
  // });
  // if (NETWORK_ID == 97) {
  //   console.log("address ", ownerAddress);

  // daxBalance = await readDAXContract.balanceOf(ownerAddress, {
  //   gasPrice: 10000,
  //   gasLimit: 90000000000
  // });
  // } else daxBalance = await readDAXContract.balanceOf(ownerAddress);
  daxBalance = await readDAXContract.balanceOf(ownerAddress);

  daxBalance = parseInt(ethers.utils.formatEther(daxBalance));
  // daxBalance = daxBalance * 10 ** 9;
  showBalance(daxBalance);
  stakedBalances = await readDAXContract.getAllStakesOf(ownerAddress);
  for (let i = 0; i < stakedBalances[0].length; i++) {
    stakedBalances[0][i] = ethers.utils.formatEther(stakedBalances[0][i]);
  }
  showStakedBalances(stakedBalances);
  // showStakedBalance(stakedBalance);
}

async function updateDashboard() {
  activeStakeCount = await readDAXContract.activeStakeCount();
  activeStakeCount = parseInt(ethers.utils.formatEther(daxBalance));
}

async function selectMaxDax() {
  document.getElementById("amountToStakeID").value = daxBalance;
}

async function getStakedBalance(ABI, tokenAddress, walletAddress) {
  const contract = new web3.eth.Contract(ABI, tokenAddress);
  const result = await contract.methods.stakedBalanceOf(walletAddress).call(); // 29803630997051883414242659
  const decimals = await contract.methods.decimals().call();
  const symbol = await contract.methods.symbol().call();

  const format = praseInt(web3.utils.fromWei(result)); // 29803630.997051883414242659

  // console.log(format + " " +symbol);
  showStakedBalance(format + " " + symbol);
}

async function stakeDAX() {}

async function getTokenBalance(ABI, tokenAddress, walletAddress) {
  const contract = new web3.eth.Contract(ABI, tokenAddress);
  const result = await contract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659
  const decimals = await contract.methods.decimals().call();
  const symbol = await contract.methods.symbol().call();

  const format = Math.floor(web3.utils.fromWei(result)); // 29803630.997051883414242659

  // console.log(format + " " +symbol);
  showBalance(format + " " + symbol);
}

function showBalance(message) {
  document.getElementById("DAXBalanceID").innerHTML = "Balance: " + message;
}

function showStakedBalance(message) {
  document.getElementById("stakedDAXID").innerHTML = "Balance: " + message;
  document.getElementById("DAXBalanceID").innerHTML = `Balance: ${message}`;
}

function showStakedBalances(stakedBalances) {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  // $("#DAXBalanceID2 > tbody").html("");
  // document.getElementById("tbodyID").innerHTML = "";

  for (let a = 0; a < 1; a++) {
    console.log(
      " Item 0 ",

      " --> ",
      stakedBalances[0][0]
    );
    console.log(
      " Item 1 ",
      a,
      " --> ",
      ethers.utils.formatEther(stakedBalances[0][1])
    );
    // console.log(" Item i ", a, " --> ", ethers.utils.formatEther(stakedBalances[0][2]);
    // console.log(" Item i ", a, " --> ", ethers.utils.formatEther(stakedBalances[0][3]);
    console.log(
      " Item 4 ",

      " --> ",
      ethers.utils.formatEther(stakedBalances[0][4])
    );
    console.log(
      " Item 5 ",

      " --> ",
      ethers.utils.formatEther(stakedBalances[0][5])
    );
    console.log(
      " Item 6",
      " --> ",
      ethers.utils.formatEther(stakedBalances[0][6])
    );
    console.log(
      " Item 7 ",

      " --> ",
      ethers.utils.formatEther(stakedBalances[0][7])
    );
  }

  // tbl = document.getElementById("DAXBalanceID2");
  tbl = document.getElementById("DAXBalanceID2");
  $("#DAXBalanceID2").find("tr:gt(0)").remove();
  // $("#DAXBalanceID2 tbody").empty();
  // row = tbl.insertRow(1);
  // cell1 = row.insertCell(0);
  // cell1.innerHTML = "ID";
  // cell2 = row.insertCell(1);
  // cell2.innerHTML = "Balance";
  // cell3 = row.insertCell(2);
  // cell3.innerHTML = "Start Date";
  // cell4 = row.insertCell(3);
  // cell4.innerHTML = "Release Date";
  // cell5 = row.insertCell(4);
  // cell5.innerHTML = "Initial Principle";
  // cell6 = row.insertCell(5);
  // cell6.innerHTML = "Current Value";

  printMe = "";
  for (let i = 0; i < stakedBalances.length; i++) {
    startDate = new Date(+stakedBalances[i][2]);
    releaseDate = new Date(+stakedBalances[i][3]);
    todayDate = new Date();
    daysStaked = (todayDate - startDate) / (1000 * 60 * 60 * 24);
    console.log(
      "*** release Date ",
      releaseDate,
      " balance ",
      Math.floor(ethers.utils.formatEther(stakedBalances[i][1])),
      "days staked ",
      daysStaked,
      "today ",
      todayDate
    );
    row = tbl.insertRow(1);
    cell1 = row.insertCell(0);
    cell1.innerHTML = "" + stakedBalances[i][0];
    cell2 = row.insertCell(1);
    cell2.innerHTML =
      "" + Math.floor(ethers.utils.formatEther(stakedBalances[i][1]));
    cell3 = row.insertCell(2);
    cell3.innerHTML = "" + formatDate(startDate);
    cell4 = row.insertCell(3);
    cell4.innerHTML = "" + formatDate(releaseDate);

    // cell5 = row.insertCell(4);
    // cell5.innerHTML =
    //   "" + Math.floor(ethers.utils.formatEther(stakedBalances[i][4]));

    cell6 = row.insertCell(4);
    cell6.innerHTML =
      "<b>" +
      Math.floor(
        Math.floor(ethers.utils.formatEther(stakedBalances[i][4])) +
          computeTotalInterest(
            Math.floor(ethers.utils.formatEther(stakedBalances[i][1])),
            daysStaked
          )
      ) +
      "</b>";
    cell7 = row.insertCell(5);
    cell7.innerHTML =
      "" +
      getStakeStatus(parseInt(stakedBalances[i][7]), todayDate, releaseDate);

    cell8 = row.insertCell(6);
    cell8.innerHTML =
      "" + Math.floor(ethers.utils.formatEther(stakedBalances[i][5]));

    cell9 = row.insertCell(7);
    cell9.innerHTML =
      "" + Math.floor(ethers.utils.formatEther(stakedBalances[i][6])); // printMe =
    //   printMe +
    //   "[ ID " +
    //   stakedBalances[i][0] +
    //   " -  Bal " +
    //   Math.floor(parseFloat(ethers.utils.formatEther(stakedBalances[i][1])) ) +
    //   "- Start " +
    //   new Date(+stakedBalances[i][2]).toDateString() +
    //   "- release " +
    //   new Date(+stakedBalances[i][3]).toDateString() +
    //   "- Initial Principal " +
    //   Math.floor(parseFloat(ethers.utils.formatEther(stakedBalances[i][4])) +
    //   "- Current Value " +
    //   Math.floor(parseFloat(ethers.utils.formatEther(stakedBalances[i][5])) +
    //   " ]";
  }
  // document.getElementById("stakedDAXID").innerHTML = "Balance: " + printMe;
}

function getStakeStatus(statusID, todayDate, releaseDate) {
  // releaseDate2 = new Date(releaseDate + 1000 * 60 * 60 * 24 * 1);

  releaseDate.setDate(releaseDate.getDate());
  console.log("releaseDate -> ", releaseDate, " today -> ", todayDate);
  if (statusID == 1) return "Ended";
  else if (todayDate > releaseDate) return "Matured";
  else return "Active";
}

function formatDate(formatMe) {
  rem = new Date();
  rem = formatMe;
  retval = "" + rem.getFullYear();
  retval += "/" + (rem.getMonth() + 1);
  retval += "/" + rem.getDate();
  return retval;
}
function formatDateLong(formatMe) {
  rem = new Date();
  rem = formatMe;
  retval = "" + rem.getFullYear();
  retval += "-" + rem.getMonth();
  retval += "-" + rem.getDate();
  retval += "T" + rem.getMinutes();
  retval += ":" + rem.getSeconds();

  return retval;
}

function showWalletAddress() {
  document.getElementById("addressID").innerHTML =
    "0x.." + ownerAddress.substring(ownerAddress.length - 5);
}

function copySacAddress() {
  navigator.clipboard.writeText("0x85eda953f3f4140220ee2e02dc79aa5d9a3e8fe3");
}

function copyDAXEAddress() {
  navigator.clipboard.writeText("" + contractAddress);
}
