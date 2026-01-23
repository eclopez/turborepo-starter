export default {
  '*.{js,ts,tsx,jsx}': (files) => {
    const commands = []

    const filesByPackage = files.reduce((acc, file) => {
      const match = file.match(/^((?:apps|packages|config)\/[^/]+)\//)
      const pkg = match ? match[1] : 'root'
      if (!acc[pkg]) acc[pkg] = []
      acc[pkg].push(file)
      return acc
    }, {})

    for (const [pkg, pkgFiles] of Object.entries(filesByPackage)) {
      if (pkg !== 'root') {
        commands.push(`cd ${pkg} && eslint --cache --fix ${pkgFiles.map((f) => f.replace(`${pkg}/`, '')).join(' ')}`)
      }
    }

    commands.push(`prettier --write ${files.join(' ')}`)
    return commands
  },
  '*.{json,md,yaml,yml,css}': ['prettier --write'],
}
