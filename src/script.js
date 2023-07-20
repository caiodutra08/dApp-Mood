const MoodContractAddress = "0x2cCCb4964d864aB74Bf23574e98E4328cd860838";
const MoodContractABI = [
	{
		inputs: [],
		name: "getMood",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_mood",
				type: "string",
			},
		],
		name: "setMood",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];

let MoodContract = "";
let signer = "";

const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

provider.send("eth_requestAccounts", []).then(() => {
	provider.listAccounts().then((accounts) => {
		signer = provider.getSigner(accounts[0]);
		MoodContract = new ethers.Contract(MoodContractAddress, MoodContractABI, signer);
	});
});

async function getMood() {
	const mood = await MoodContract.getMood();
	document.getElementById("showMood").innerText = `Your Mood: ${mood}`;
	console.log(mood);
}

async function setMood() {
	const mood = document.getElementById("mood").value;
	await MoodContract.setMood(mood);
}
