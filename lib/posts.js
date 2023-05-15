import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'

console.log('process.cwd()', process.cwd())
const postDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData () {
    const fileNames = fs.readdirSync(postDirectory)
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '');

        const fullPath = path.join(postDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents)

        console.log('matterResult', matterResult)

        return {
            id, 
            ...matterResult.data
        }
    })

    return allPostsData.sort((a,b) => {
        return a.date < b.date ? 1: -1
    })
}