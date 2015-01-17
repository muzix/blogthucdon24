var errors  = require('../errors'),
    storage = {},
    config;

function getConfigModule() {
    if (!config) {
        config = require('../config');
    }
    return config;
}


function getStorage(storageChoice) {
    // TODO: this is where the check for storage apps should go
    // Local file system is the default.  Fow now that is all we support.
    // storageChoice = 'local-file-store';
    storageChoice = 'ghost-s3-storage';

    if (storage[storageChoice]) {
        return storage[storageChoice];
    }

    try {
        // TODO: determine if storage has all the necessary methods.
        //storage[storageChoice] = require('./' + storageChoice);
        storage[storageChoice] = require(storageChoice)({
            errors: errors,
            config: getConfigModule().aws
        });
    } catch (e) {
        errors.logError(e);
    }

    // Instantiate and cache the storage module instance.
    storage[storageChoice] = new storage[storageChoice]();

    return storage[storageChoice];
}

module.exports.getStorage = getStorage;
