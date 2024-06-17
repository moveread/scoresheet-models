import { Model } from "./defs.js";

const CONTAINER_URL = 'https://movereadcdn.blob.core.windows.net/scoresheet-models'

function parseBlobsList(xml: string) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, 'application/xml')
  const blobs = xmlDoc.getElementsByTagName('Blob')
  const modelIds: string[] = []
  for (const blob of blobs) {
      const nameElement = blob.getElementsByTagName('Name')[0];
      if (nameElement?.textContent) {
        const id = nameElement.textContent.split('.')[0];
        modelIds.push(id);
      }
  }
  return modelIds
}

export async function fetchModels() {
  const response = await fetch(`${CONTAINER_URL}?comp=list`)
  const xml = await response.text()
  return parseBlobsList(xml)
}

export async function fetchModel(id: string): Promise<Model> {
  const response = await fetch(`${CONTAINER_URL}/${id}.json`)
  return response.json()
}
