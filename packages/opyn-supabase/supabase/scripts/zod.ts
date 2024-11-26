// scripts/removeSupabaseUrl.js

const fs = require('node:fs')
const path = require('node:path')

const inputFilePath = path.join(__dirname, '../../src/supa.types.ts')
const outputFilePath = path.join(__dirname, '../../src/supa.modified.types.ts')

function removeSupabaseUrl(content) {
  // Use a regular expression to remove the supabase_url function definition
  const supabaseUrlRegex = /supabase_url: \{[^}]*\},?\n/g
  return content.replace(supabaseUrlRegex, '')
}

function main() {
  try {
    // Read the original types file
    const content = fs.readFileSync(inputFilePath, 'utf-8')

    // Remove the supabase_url function
    const modifiedContent = removeSupabaseUrl(content)

    // Write the modified content to a new file
    fs.writeFileSync(outputFilePath, modifiedContent, 'utf-8')

    console.log(`Modified types written to ${outputFilePath}`)
  } catch (error) {
    console.error('Error processing the types file:', error)
  }
}

main()
