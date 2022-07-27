const { Router } = require ('express');
const firebase = require ('../lib/firebase');
const generateNonce = require ('../lib/nonce');
const { getWallet } = require ('../lib/getWallet');
const ethers = require ('ethers');
const { AddressTranslator } = require ("nervos-godwoken-integration");
const addressTranslator = new AddressTranslator ();

let nonce = (req, res) => {
    firebase
    .collection ('users')
    .doc (req.query.address)
    .get ()
    .then (async (doc) => {
        if (doc.exists) {
            res.json ({
                nonce: doc.data ().nonce,
            });
        } else {
            let nonce = generateNonce ();

            firebase.collection ('users').doc (req.query.address).set ({
                address: req.query.address,
                nonce,
                evmAddress: req.query.address,
                polyjuiceAddress: addressTranslator.ethAddressToGodwokenShortAddress (req.query.address),
                displayName: req.query.address,
                bio: ''
            }).then (() => {
                res.json ({
                    nonce
                });
            }).catch ((err) => {
                console.log (err);
            });
        }
    })
    .catch ((error) => {
      res.json ({ error });
    });
}

module.exports = () => {
    const router = Router ();

    router.get ('/', nonce);

    return router;
}