const { Router } = require ('express');
const firebase = require ('../lib/firebase');
const { isValidSignature } = require ('../lib/verify');
const generateNonce = require ('../lib/nonce');
const generateToken = require ('../lib/jwt');
// const { getEVMAddress } = require('../lib/getEVMAddress');

let auth = (req, res) => {
    firebase
    .collection ('users')
    .doc (req.body.address)
    .get ()
    .then (async doc => {
        if (doc.exists) {
            const user = doc.data ();
            const { nonce } = user;
            const { address, signature } = req.body;

            if (isValidSignature (nonce, signature, address)) {
                // const _evmAddress = await getEVMAddress (address);
                let jwt = generateToken (address, user.polyjuiceAddress);
                doc.ref.set ({
                    nonce: generateNonce (),
                    // evmAddress: _evmAddress
                }, { merge: true }).then (() => {
                    res.status (200).send ({
                        status: 'success',
                        token: jwt,
                        message: 'Valid signature'
                    });
                });

            } else {
                doc.ref.set ({
                    nonce: generateNonce (),
                    // evmAddress: _evmAddress
                }, { merge: true }).then (() => {
                    res.status (400).send ({
                        status: 'error',
                        message: 'Invalid signature'
                    });
                });
            }
        } else {
            res.status (401).send ({
                status: 'error',
                message: 'User not found'
            });
        }
    })
    .catch (err => {
        res.status (402).send ({
            status: 'error',
            message: err.message
        });
    });
}

module.exports = () => {
    const router = Router ();

    router.post ('/', auth);

    return router;
}