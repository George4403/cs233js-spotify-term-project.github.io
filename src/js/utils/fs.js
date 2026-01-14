


function iterateDirectorySync(directoryPath) {

    let files = [];

    try
    {
        const filesAndFolders = fs.readdirSync(directoryPath);

        filesAndFolders.forEach(item => {
            const itemPath = path.join(directoryPath, item);
            const stats = fs.statSync(itemPath);

            if (stats.isFile())
            {
                console.log(`File: ${itemPath}`);
                files.push(path.basename(itemPath));
            } else if (stats.isDirectory())
            {
                console.log(`Directory: ${itemPath}`);
                // Recursively call for subdirectories
                files = files.concat(iterateDirectorySync(itemPath));
            }
        });
    } catch (err)
    {
        console.error(`Error iterating directory: ${err.message}`);
    }

    return files;
}

// Example usage:

