const { CID } = require ('multiformats/cid');
const getCloudflareURL = (url) => `https://cloudflare-ipfs.com/ipfs/${url.replace ("ipfs://", "")}`;

const getDwebURL = (url) => {
	let [randomAssString, filename] = url.replace ("ipfs://", "").split("/")
	return `https://${randomAssString}.ipfs.dweb.link/${filename}`
}

// const getInfuraURL = (url) => {
// 	let [randomAssString, filename] = url.replace ("ipfs://", "").split("/")
// 	return `https://ipfs.infura.io/ipfs/${randomAssString}/${filename}`
// }
// const getCIDv1 = url =>
// 	CID.parse(url.replace("ipfs://", "")).toV1().toString();

const getCIDv1 = url => url.replace("ipfs://", "");

const getInfuraURL = url => `https://sqwid.infura-ipfs.io/ipfs/${getCIDv1(url)}`;

module.exports = {
	getCloudflareURL,
	getDwebURL,
	getInfuraURL
}