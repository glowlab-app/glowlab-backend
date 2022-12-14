const { Router } = require ('express');

const getAuthRoutes = require ('./auth');
const getNonceRoutes = require ('./nonce');
const getCreateCollectibleRoutes = require ('./create/collectible');
const getCreateCollectionRoutes = require ('./create/collection');
const getCollectionsRoutes = require ('./get/collections').router;
// const getCollectiblesRoutes = require ('./get/collectibles');
// const getCollectibleRoutes = require ('./get/collectible');
const getUserRoutes = require ('./get/user').router;
const getEditUserRoutes = require ('./edit/user');
// const getVerifyJWTRoutes = require ('./verifyjwt');
// const getEditEVMAddressRoutes = require ('./edit/evmAddress');
// const getSyncCollectiblesRoutes = require ('./sync/collectibles');
const getMarketplaceRoutes = require ('./get/marketplace').router;
// const getMarketplaceOldRoutes = require ('./get/r/marketplace_old').router;

const rateLimit = require ('express-rate-limit');

const createLimiter = rateLimit ({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 6, // limit each IP to 6 requests per windowMs
	standardHeaders: true,
	legacyHeaders: false,
});

module.exports = () => {
    const router = Router ();

    router.use ('/auth', createLimiter, getAuthRoutes ());
    router.use ('/nonce', createLimiter, getNonceRoutes ());
    router.use ('/create/collectible', createLimiter, getCreateCollectibleRoutes ());
    router.use ('/create/collection', createLimiter, getCreateCollectionRoutes ());
    router.use ('/get/collections', getCollectionsRoutes ());
    router.use ('/get/marketplace', getMarketplaceRoutes ());
    router.use ('/get/user', getUserRoutes ());
    router.use ('/edit/user', getEditUserRoutes ());
    
    // router.use ('/sync/collectibles', getSyncCollectiblesRoutes ());
    // router.use ('/get/collectibles', getCollectiblesRoutes ());
    // router.use ('/get/collectible', getCollectibleRoutes ());
    // router.use ('/get/r/marketplace', getMarketplaceOldRoutes ());
    // router.use ('/edit/evmaddress', getEditEVMAddressRoutes ());
    // router.use ('/verifyjwt', getVerifyJWTRoutes ());

    router.get ('/', (req, res) => {
        res.send ('Glowlab API');
    });

    return router;
}