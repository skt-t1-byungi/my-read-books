const https = require('https')
const fs = require('fs')
const { Buffer } = require('buffer')
const { argv } = require('process')
const { URL } = require('url')
const slugify = require('cjk-slug').default
const { pipeline } = require('stream/promises')

const url = new URL(argv[2])
if (!url.hostname.endsWith('aladin.co.kr') || !url.searchParams.has('ItemId')) {
    console.error(`invalid aladin item url : ${url}`)
    process.exit(1)
}

httpGet(url)
    .then(pullStream)
    .then(async buf => {
        const html = buf.toString()
        const coverUrl = html.match(
            /<meta property="og:image" content="(.*?)"\s*\/>/
        )?.[1]
        const title = html.match(
            /<meta property="og:title" content="(.*?)"\s*\/>/
        )?.[1]

        const dir = `${__dirname}/../books/${slugify(title)}`
        fs.mkdirSync(dir, { recursive: true })
        await pipeline(
            await httpGet(coverUrl),
            fs.createWriteStream(`${dir}/cover.jpg`)
        )

        const now = new Date()
        const dateStr = `${now.getFullYear()}-${String(
            now.getMonth() + 1
        ).padStart(2, 0)}-${String(now.getDate()).padStart(2, 0)}`
        const md = `
---
title: ${title}
cover: ./cover.jpg
date: ${dateStr}
description: ''
content: none
slug: false
---
`.trim()
        console.log(md)
        fs.writeFileSync(`${dir}/index.mdx`, md)
    })

function httpGet(url) {
    return new Promise(resolve => https.get(url, resolve))
}

function pullStream(stream) {
    return new Promise(resolve => {
        const buffers = []
        stream
            .on('data', b => buffers.push(b))
            .on('end', () => resolve(Buffer.concat(buffers)))
    })
}
