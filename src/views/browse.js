import { html } from '../../node_modules/lit-html/lit-html.js'
import { getMemes } from '../api/data.js'

const browseTemplate = (Memes, hasMemes) => html`<section id="meme-feed">
    ${hasMemes ? html`<h1>All Memes</h1>
    <div id="memes">
        <!-- Display : All memes in database ( If any ) -->
        ${Memes.map(m => html`
        <div class="meme">
            <div class="card">
                <div class="info">
                    <p class="meme-title">${m.title}</p>
                    <img class="meme-image" alt="meme-img" src="${m.imageUrl}">
                </div>
                <div id="data-buttons">
                    <a class="button" href="/details/${m._id}">Details</a>
                </div>
            </div>
        </div>
        `)}` :
         html`<p class="no-memes">No memes in database.</p>`}



    </div>
</section>`

export async function browsePage(ctx) {
    const memes = await getMemes()
    console.log(memes)
    ctx.render(browseTemplate(memes, memes.length > 0))
}