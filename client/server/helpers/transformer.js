
const transform = (url, type, data) => {
    console.log('transform', url);
    if (url?.indexOf('zedcontrol') > -1) {
        if (type === 'projects') {
            return transformProjects('zed', data);
        }
    }

    console.log('premji ********8', url, type, data);

    return data;
}

const transformProjects = (url, data) => {
    const formattedResponse = {};
    if (url === "zed") {
        if (data?.list) {
            formattedResponse['data'] = data?.list || [];
            formattedResponse['summary_state'] = data?.summaryByState || {};
            formattedResponse['summary_tag'] = data?.summaryByType || {};
            formattedResponse['pagination'] = {
                next: data?.next || null,
                prev: data?.prev || null
            };
        }
    }

    return formattedResponse;
}

module.exports = {
    transform
}