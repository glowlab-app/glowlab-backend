const { Router } = require ('express');
const firebase = require ('../../lib/firebase');
const { verify } = require ('../../middleware/auth');
const ethers = require ('ethers');
const multer = require ('multer');
const sharp = require ('sharp');
// const { NFTStorage, File } = require ('nft.storage');
const getNetwork = require('../../lib/getNetwork');
// const { FieldValue } = require ('firebase-admin').firestore;

const collectibleContractABI = require ('../../contracts/GlowlabERC1155').ABI;
const marketplaceContractABI = require ('../../contracts/GlowlabMarketplace').ABI;
const utilityContractABI = require ('../../contracts/GlowlabUtility').ABI;

const { getEVMAddress } = require ('../../lib/getEVMAddress');
const cors = require ('cors');
const { getWallet } = require('../../lib/getWallet');
const { getCloudflareURL, getInfuraURL } = require('../../lib/getIPFSURL');
const axios = require ('axios');
const { getDbCollections, getDbCollectibles } = require('../get/marketplace');

const collectibleContract = (signerOrProvider, address = null) => new ethers.Contract (address || getNetwork ().contracts ['erc1155'], collectibleContractABI, signerOrProvider);
const marketplaceContract = (signerOrProvider) => new ethers.Contract (getNetwork ().contracts ['marketplace'], marketplaceContractABI, signerOrProvider);
const utilityContract = (signerOrProvider) => new ethers.Contract (getNetwork ().contracts ['utility'], utilityContractABI, signerOrProvider);

const ipfsClient = require ('ipfs-http-client');

const infuraAuth =
    'Basic ' + Buffer.from(process.env.INFURA_IPFS_PROJECT_ID + ':' + process.env.INFURA_IPFS_PROJECT_SECRET).toString('base64');


/*
const mediaUpload = multer ({
    storage: multer.memoryStorage (),
    limits: {
        fileSize: 30000000
    },
});

let upload = async (req, res, next) => {
    res.setHeader ('Access-Control-Allow-Origin', '*');
    const client = new NFTStorage ({ token: process.env.NFT_STORAGE_API_KEY });
    const cover = req.files.coverData ? req.files.coverData [0] : req.files.fileData [0];
    const file = (req.files.coverData && (req.files.coverData [0] === req.files.fileData [0])) ? null : req.files.fileData [0];

    let col = req.body.collection || "ASwOXeRM5DfghnURP4g2";
    const collection = await firebase.collection ('collections').doc (col).get ();
    let creator = await getEVMAddress (req.user.address);

    if (collection.exists) {
        if (collection.data ().owner === req.user.address || col === "ASwOXeRM5DfghnURP4g2") {
            try {
                const metadata = await client.store ({
                    name: req.body.name || "Empty Glowlab",
                    description: req.body.description || "",
                    properties: {
                        custom: JSON.parse (req.body.properties) || {},
                        mimetype: file ? file.mimetype : null,
                        creator: creator,
                        media: file ? (new File ([file.buffer], file.originalname, { type: file.mimetype })) : null,
                        collection: col,
                    },
                    image: new File (
                        [cover.buffer],
                        cover.originalname,
                        { type: cover.mimetype }
                    ),
                })
                res.status (200).send (metadata.url);
            } catch (err) {
                next (err);
            }
        } else {
            return res.status (403).json ({
                error: 'You are not the owner of this collection.'
            });
        }
    } else {
        return res.status (404).json ({
            error: 'Collection not found.'
        });
    }
}

let sync = async (req, res, next) => {
    // const { provider } = await getWallet ();
    // const contract = new ethers.Contract (process.env.COLLECTIBLE_CONTRACT_ADDRESS, ABI, provider);

    // const currentId = Number (await contract.currentId ());

    // const dbCollection = firebase.collection ('collectibles');

    // for (let i = currentId; i > Math.max (currentId - 5, 0); i--) {
    //     const uri = await contract.uri (i);
    //     let url = getCloudflareURL (uri);
    //     const doc = await dbCollection.where ('id', '==', i).get ();
    //     if (doc.empty) {
    //         try {
    //             const response = await axios (url);
    //             const json = await response.data;
    //             const { name, properties } = json;
    //             const { collection, creator } = properties;
    
    //             const data = {
    //                 id: i,
    //                 uri,
    //                 collection: collection || "Glowlab",
    //                 createdAt: new Date (),
    //                 creator,
    //                 name
    //             };
    //             await dbCollection.doc (i.toString ()).set (data);
    //         } catch (err) {
    //             console.log (err);
    //         }
    //     }
    // }
    res.status (200).json ({
        message: 'Sync complete.'
    });
}
*/

const verifyItem = async (req, res, next) => {
    const { provider } = await getWallet ();
    // console.log (provider);
    const marketContract = utilityContract (provider);
    const tokenContract = collectibleContract (provider);
    // console.log (marketContract);
    const { id, collection } = req.body;
    const collectionId = collection || 'ASwOXeRM5DfghnURP4g2';
    
    // const creatorPromise = getEVMAddress (req.user.address);
    const collectionDocPromise = getDbCollections ([collectionId]);
    const collectiblePromise = getDbCollectibles ([id]);
    const [collectionDoc, collectible] = await Promise.all ([collectionDocPromise, collectiblePromise]);
    if (collectible.length) return res.status (400).json ({
        error: 'Collectible already verified.'
    });
    const creator = req.user.address;
    // verify user owns collection
    if (collectionDoc.length && (collectionDoc [0].data.owner === req.user.address || collectionId === "ASwOXeRM5DfghnURP4g2")) {
        try {
            const item = await marketContract.fetchItem (id);
            let ipfsURI;
            if (item.creator.toLowerCase () === creator.toLowerCase ()) {
                let meta = {};
                try {
                    ipfsURI = await tokenContract.uri (item.tokenId);
                    const response = await axios (getInfuraURL (ipfsURI));
                    meta = response.data;
                } catch (err) {
                    console.log (err);
                }

                if (!meta.name) return res.status (400).json ({
                    error: 'Blockchain item not found'
                });

                await firebase.collection ('collectibles').add ({
                    id,
                    uri: ipfsURI,
                    collectionId,
                    createdAt: new Date (),
                    creator,
                    meta,
                    approved: null
                });

                res.status (200).json ({
                    message: 'Item verified.'
                });
            } else {
                res.status (403).json ({
                    error: 'You are not the owner of this item.'
                });
            }
        } catch (err) {
            console.log (err);
            next (err);
        }
    } else {
        return res.status (403).json ({
            error: 'You are not the owner of this collection.'
        });
    }
}


const uploadToIPFS = async file => {
    const ipfs = ipfsClient.create ({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
            authorization: infuraAuth,
        }
    });
    const buffer = file.arrayBuffer ? await file.arrayBuffer() : file;
    const addedFile = await ipfs.add(buffer);
    await ipfs.pin.add (addedFile.path);
    return addedFile.path;
}

const generateThumbnail = async file => {
    const data = await sharp (file)
        .resize ({
            width: 512,
            height: 512,
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .webp ()
        .toBuffer ();
    return data;
}

const generateSmallSize = async file => {
    const data = await sharp (file)
        .resize ({
            width: 1280,
            height: 1280,
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .webp ()
        .toBuffer ();
    return data;
}

const mediaUpload = multer ({
    storage: multer.memoryStorage (),
    limits: {
        fileSize: 30000000
    },
});

let upload = async (req, res, next) => {
    res.setHeader ('Access-Control-Allow-Origin', '*');
    const cover = req.files.coverData ? req.files.coverData [0] : req.files.fileData [0];
    const file = (req.files.coverData && (req.files.coverData [0] === req.files.fileData [0])) ? null : req.files.fileData [0];

    let collectionId = req.body.collection || "ASwOXeRM5DfghnURP4g2";

    const creatorPromise = getEVMAddress (req.user.address);
    const collectionDocPromise = getDbCollections ([collectionId]);

    const [creator, collectionDoc] = await Promise.all ([creatorPromise, collectionDocPromise]);

    if (collectionDoc.length) {
        if (collectionDoc [0].data.owner === creator || collectionId === "ASwOXeRM5DfghnURP4g2") {
            try {
                let uploadsArray = [];

                if (cover.mimetype.startsWith ('video')) uploadsArray = [uploadToIPFS (cover.buffer)]
                else {
                    const thumbnailPromise = generateThumbnail (cover.buffer);
                    const smallSizePromise = generateSmallSize (cover.buffer);
    
                    const [thumbnail, small] = await Promise.all ([thumbnailPromise, smallSizePromise]);
    
                    uploadsArray = [uploadToIPFS (thumbnail), uploadToIPFS (small), uploadToIPFS (cover.buffer)];
                    if (req.files.coverData) uploadsArray.push (uploadToIPFS (file.buffer));
                }

                let uploads = await Promise.all (uploadsArray);

                for (let i = 1; i < 3; i++) {
                    if (!uploads [i]) uploads [i] = uploads [i - 1];
                }

                const metadata = {
                    name: req.body.name || 'Empty Glowlab',
                    description: req.body.description || "",
                    image: `ipfs://${uploads [1]}`,
                    media: `ipfs://${uploads [3] || uploads [2]}`,
                    thumbnail: `ipfs://${uploads [0]}`,
                    attributes: JSON.parse (req.body.properties),
                    mimetype: file.mimetype
                }

                const meta = await uploadToIPFS (JSON.stringify (metadata));

                res.status (200).json ({
                    metadata: 'ipfs://' + meta
                });
            } catch (err) {
                next (err);
            }
        } else {
            return res.status (403).json ({
                error: 'You are not the owner of this collection.'
            });
        }
    } else {
        return res.status (404).json ({
            error: 'Collection not found.'
        });
    }
}

module.exports = () => {
    const router = Router ();
    router.use (cors ());

    router.post ('/verify', verify, verifyItem);
    router.post ('/upload', verify, mediaUpload.fields ([{ name: 'coverData', maxCount: 1 }, { name: 'fileData', maxCount: 1 }]), upload);

    return router;
}
