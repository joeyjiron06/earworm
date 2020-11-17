const azure = require('azure-storage');

function getProps(entry,propNames) {
    const props = {};
    propNames.forEach((propName) => {
        props[propName] = entry[propName]._;
    });
    return props;
}

function parseLoopEntities(result) {
    return result.entries.map(entry => {
        const loop = getProps(entry, ['name','instrument', 'scale', 'genre', 'files']);
        loop.files = loop.files.split(',');
        return loop;
    });
}


function fetchLoops() {
    return new Promise((resolve, reject) => {
        const tableService = azure.createTableService();
        const query = new azure.TableQuery().top(50);
        tableService.queryEntities('loops', query, null, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(parseLoopEntities(result));
            }
        })
    })
}

module.exports = async function (context) {
    context.log('getloops triggered');
    
    const loops = await fetchLoops();

    context.res = {
        body: loops
    };
}