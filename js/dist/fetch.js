const CONTAINER_URL = 'https://movereadcdn.blob.core.windows.net/scoresheet-models';
function parseBlobsList(xml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'application/xml');
    const blobs = xmlDoc.getElementsByTagName('Blob');
    const modelIds = [];
    for (const blob of blobs) {
        const nameElement = blob.getElementsByTagName('Name')[0];
        if (nameElement === null || nameElement === void 0 ? void 0 : nameElement.textContent) {
            const id = nameElement.textContent.split('.')[0];
            modelIds.push(id);
        }
    }
    return modelIds;
}
export async function fetchModels() {
    const response = await fetch(`${CONTAINER_URL}?comp=list`);
    const xml = await response.text();
    return parseBlobsList(xml);
}
export async function fetchModel(id) {
    const response = await fetch(`${CONTAINER_URL}/${id}.json`);
    return response.json();
}
