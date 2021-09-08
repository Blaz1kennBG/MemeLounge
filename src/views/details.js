import {html} from '../../node_modules/lit-html/lit-html.js'
import { deleteMeme } from '../api/data.js'


const detailsTemplate = (meme, isOwner, delAction) => html` 
 <section id="meme-details">
<h1>Meme Title: ${meme.title}

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${meme.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
            ${meme.description}
        </p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        ${isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
        <button @click=${delAction} class="button danger">Delete</button>` : ''}
    </div>
</div>
</section>`

export async function  detailsPage(ctx){
    const userId = sessionStorage.getItem('userId')
    const id = ctx.params.id
    
    const meme = await api.getMemeById(id)
    ctx.render(detailsTemplate(meme, userId == meme._ownerId, delAction))

    async function delAction() {
        console.log(id)
await api.deleteMeme(id)
ctx.page.redirect('/browse')
    }
}