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
  "function cummulatedPenaltiesAllTime() view returns (uint)",
  "function totalStaked() view returns (uint)",
  "function totalSupply() view returns (uint)",
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
    baseDexURL = "https://traderjoexyz.com/#/trade?outputCurrency=";
    contractAddress = "0xd1371A07950eDb8e38E37bA842eA771DBA8D8A77"; // Polygon test net address
  } else if (NETWORK_ID == 43114) {
    networkName = "AVAX";
    RPC_URL = "https://api.avax.network/ext/bc/C/rpc";
    baseDexURL = "https://traderjoexyz.com/#/trade?outputCurrency=";
    contractAddress = "0x5106f787E8778a86D1928ed5ad0B0215dBFA00b8"; // Polygon test net address
  } else {
    networkName = "WRONG Network";
    NETWORK_ID = -1;
    RPC_URL = "";
  }
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
  initialize();
}

initializeNetwork();

// **************************************************************
// **************************************************************
// ****************     GAXE TOKEN by Michel A.******************
// **************************************************************
// **************************************************************

// web3.eth.getBalance('0xc691644B8095F9C4bb8a002Acec957F4FFe368c1').then(console.log)
// alert("timmay 3")

async function connectWallet() {
  // walletProvider = window.web3.currentProvider;
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const network = await provider.getNetwork().then((value) => {
    connectWalletFollow(value.chainId);
  });
  // chainId = network.chainId;
  // netVersion = -1;
  // ethereum.request({ method: "net_version" }).then((value) => {
  //   console.log("Current network = ", value);
  //   connectWalletFollow(value);
  // });
}

async function connectWalletFollow(netVersion) {
  console.log("netVersion ", netVersion);
  console.log("NETWORK_ID ", NETWORK_ID);
  if (parseInt(netVersion) != NETWORK_ID) {
    showBalance("Wrong Network !");
    document.getElementById("connectButtonID").innerHTML = "Wrong Network !";
    document.getElementById("stakingErrorMessage").innerHTML =
      "Wrong Network !";

    return -1;
  }
  document.getElementById("connectButtonID").innerHTML = "Connecting...";
  document.getElementById("connectButtonID").style.background = "#ffa85c";

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
  // console.log(
  //   " after connect txProvider + signer" + txProvider.getSigner(0).getAddress()
  // );
}

async function updateInfo() {
  // $("connectButtonID")

  document.getElementById("connectButtonID").innerHTML =
    "Connected ..." + ownerAddress.substring(ownerAddress.length - 5);

  // document.getElementById("connectButtonID").style.background = "#F934F0";
  document.getElementById("connectButtonID").style.background = "#17D186";
}

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
  // document.getElementById("buyURLID2").href = baseDexURL + contractAddress;
  // document.getElementById("buyURLID").href = "sacrifice.html";
  // document.getElementById("buyURLID2").href = "sacrifice.html";
  document.getElementById("networkNameID").innerHTML = networkName;
  document.getElementById("networkNameID2").innerHTML = networkName;

  // updateInfo();
}

async function updateDashboard() {
  activeStakeCount2 = await readDAXContract.activeStakeCount();
  // activeStakeCount = parseInt(ethers.utils.formatEther(activeStakeCount));
  console.log("activeStakeCount = ", activeStakeCount2.toNumber());
  document.getElementById("stakeCountID").innerHTML =
    "" + activeStakeCount2.toNumber();

  activeStakeCount2 = await readDAXContract.activeStakeCount();
  // activeStakeCount = parseInt(ethers.utils.formatEther(activeStakeCount));
  console.log("activeStakeCount = ", activeStakeCount2.toNumber());
  document.getElementById("stakeCountID").innerHTML =
    "" + activeStakeCount2.toNumber();

  totalStaked = await readDAXContract.totalStaked();
  // activeStakeCount = parseInt(ethers.utils.formatEther(activeStakeCount));
  totalStaked = parseInt(ethers.utils.formatEther(totalStaked));
  console.log("TotalStaked = ", totalStaked.toLocaleString());
  document.getElementById("totalStakedID").innerHTML =
    "" + totalStaked.toLocaleString();

  penalties = await readDAXContract.cummulatedPenaltiesAllTime();
  // activeStakeCount = parseInt(ethers.utils.formatEther(activeStakeCount));
  penalties = parseInt(ethers.utils.formatEther(penalties));
  console.log("penalties = ", penalties.toLocaleString());
  document.getElementById("penaltiesID").innerHTML =
    "" + penalties.toLocaleString();
}
