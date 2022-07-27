const { AddressTranslator } = require ("nervos-godwoken-integration");
const addressTranslator = new AddressTranslator ();

const getPolyjuiceAddress = ethAddr => addressTranslator.ethAddressToGodwokenShortAddress (ethAddr);

const getCkbAddress = ethAddr => addressTranslator.ethAddressToCkbAddress (ethAddr);

module.exports = {
    getPolyjuiceAddress,
    getCkbAddress,
};