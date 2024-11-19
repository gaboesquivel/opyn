import { readFileSync, readdirSync } from 'node:fs'
import { basename, extname, join } from 'node:path'
import type { Abi } from 'viem'

function loadJsonFiles(directory: string): Record<string, Abi> {
  try {
    const files = readdirSync(directory)
    const jsonFiles = files.filter((file) => extname(file) === '.json')

    return jsonFiles.reduce(
      (acc, file) => {
        const filePath = join(directory, file)
        const fileContent = readFileSync(filePath, 'utf8')
        const fileName = basename(file, '.json')
        acc[fileName] = JSON.parse(fileContent) as Abi
        return acc
      },
      {} as Record<string, Abi>,
    )
  } catch (error) {
    console.error('Error loading Opyn ABI JSON files:', error)
    return {}
  }
}

export const OpynAbis = loadJsonFiles(join(__dirname))
